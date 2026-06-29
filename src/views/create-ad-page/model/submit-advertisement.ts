import {
  createAdvertisement,
  uploadAdvertisementImage,
  type Vehicle,
} from "@/src/entities/vehicle";
import { getAuthToken } from "@/src/features/auth";
import { isApiClientError, isApiValidationError } from "@/src/shared/api";

import type {
  AdvertisementForm,
  AdvertisementFormErrors,
  AdvertisementImageStatus,
} from "./advertisement-form";
import { mapAdvertisementFormToCreateDto } from "./advertisement-form-mapper";
import { validateAdvertisementForm, validateAdvertisementImages } from "./advertisement-validation";

export type AdvertisementSubmitStage = "creating" | "idle" | "success" | "uploading";

export type SubmitAdvertisementOptions = {
  existingVehicle?: Vehicle;
  onImageStatusChange?: (
    imageId: string,
    status: AdvertisementImageStatus,
    errorMessage: string | null,
  ) => void;
  onStageChange?: (stage: AdvertisementSubmitStage) => void;
};

export type SubmitAdvertisementResult =
  | {
      fieldErrors: AdvertisementFormErrors;
      generalError: string | null;
      status: "validation-error";
    }
  | {
      fieldErrors: AdvertisementFormErrors;
      generalError: string;
      status: "error";
    }
  | {
      failedImageId: string;
      fieldErrors: AdvertisementFormErrors;
      generalError: string;
      status: "upload-error";
      vehicle: Vehicle;
    }
  | {
      fieldErrors: AdvertisementFormErrors;
      generalError: null;
      status: "success";
      vehicle: Vehicle;
    };

const getUploadErrorMessage = (error: unknown) => {
  if (!isApiClientError(error)) {
    return "Image upload failed. Check your connection and try again.";
  }

  if (error.status === 403) {
    return "This vehicle belongs to another user.";
  }

  if (error.status === 404) {
    return "Created vehicle was not found.";
  }

  if (error.status === 409) {
    return "Image limit exceeded. A vehicle can have up to 20 images.";
  }

  if (error.status === 422) {
    return error.message || "Selected image does not match upload requirements.";
  }

  return error.message;
};

const getCreateErrorMessage = (error: unknown) => {
  if (!isApiClientError(error)) {
    return "Advertisement could not be created. Check your connection and try again.";
  }

  if (error.status === 401) {
    return "Please sign in to create an advertisement.";
  }

  if (error.status === 422) {
    return error.message || "Advertisement validation failed.";
  }

  return error.message;
};

const mapBackendValidationErrors = (error: unknown): AdvertisementFormErrors => {
  const fieldMap: Record<string, string> = {
    bodyType: "technical.bodyType",
    body_type: "technical.bodyType",
    body_type_id: "technical.bodyType",
    brand_type: "brand",
    brand_type_id: "brand",
    fuelType: "general.fuelType",
    fuel_type: "general.fuelType",
    fuel_type_id: "general.fuelType",
  };

  if (isApiValidationError(error)) {
    const errors: AdvertisementFormErrors = {};

    Object.entries(error.payload.errors).forEach(([field, messages]) => {
      const mappedField = fieldMap[field] ?? field;
      errors[mappedField] = [...(errors[mappedField] ?? []), ...messages];
    });

    return errors;
  }

  if (!isApiClientError(error) || error.payload === undefined) {
    return {};
  }

  if (error.payload.error === "vehicle_brand_type_notFound") {
    return {
      brand: [error.payload.message],
    };
  }

  if (error.payload.error === "vehicle_fuel_type_notFound") {
    return {
      "general.fuelType": [error.payload.message],
    };
  }

  if (error.payload.error === "vehicle_body_type_notFound") {
    return {
      "technical.bodyType": [error.payload.message],
    };
  }

  return {};
};

const uploadImagesSequentially = async (
  vehicle: Vehicle,
  form: AdvertisementForm,
  authToken: string,
  options: SubmitAdvertisementOptions,
): Promise<SubmitAdvertisementResult> => {
  let currentVehicle = vehicle;

  for (const image of form.images) {
    if (image.status === "uploaded") {
      continue;
    }

    options.onImageStatusChange?.(image.id, "uploading", null);

    try {
      currentVehicle = await uploadAdvertisementImage(currentVehicle.id, image.file, authToken);
      options.onImageStatusChange?.(image.id, "uploaded", null);
    } catch (error) {
      const message = getUploadErrorMessage(error);
      options.onImageStatusChange?.(image.id, "failed", message);

      return {
        failedImageId: image.id,
        fieldErrors: mapBackendValidationErrors(error),
        generalError: message,
        status: "upload-error",
        vehicle: currentVehicle,
      };
    }
  }

  return {
    fieldErrors: {},
    generalError: null,
    status: "success",
    vehicle: currentVehicle,
  };
};

export const submitAdvertisement = async (
  form: AdvertisementForm,
  options: SubmitAdvertisementOptions = {},
): Promise<SubmitAdvertisementResult> => {
  const authToken = getAuthToken();

  if (!authToken) {
    return {
      fieldErrors: {},
      generalError: "Please sign in to create an advertisement.",
      status: "error",
    };
  }

  const validation = options.existingVehicle
    ? validateAdvertisementImages(form.images)
    : validateAdvertisementForm(form);

  if (!validation.isValid) {
    return {
      fieldErrors: validation.errors,
      generalError: null,
      status: "validation-error",
    };
  }

  let vehicle = options.existingVehicle;

  if (!vehicle) {
    options.onStageChange?.("creating");

    try {
      vehicle = await createAdvertisement(mapAdvertisementFormToCreateDto(form), authToken);
    } catch (error) {
      return {
        fieldErrors: mapBackendValidationErrors(error),
        generalError: getCreateErrorMessage(error),
        status: "error",
      };
    }
  }

  options.onStageChange?.("uploading");
  const uploadResult = await uploadImagesSequentially(vehicle, form, authToken, options);

  options.onStageChange?.(uploadResult.status === "success" ? "success" : "idle");

  return uploadResult;
};
