import {
  ACCEPTED_ADVERTISEMENT_IMAGE_EXTENSIONS,
  ACCEPTED_ADVERTISEMENT_IMAGE_TYPES,
  type AdvertisementForm,
  type AdvertisementFormErrors,
  type AdvertisementImage,
  MAX_ADVERTISEMENT_IMAGE_SIZE_BYTES,
  MAX_ADVERTISEMENT_IMAGES,
} from "./advertisement-form";

type ValidationResult = {
  errors: AdvertisementFormErrors;
  isValid: boolean;
};

const yearMonthPattern = /^\d{4}-\d{2}$/;

const addError = (
  errors: AdvertisementFormErrors,
  field: string,
  message: string,
): AdvertisementFormErrors => {
  return {
    ...errors,
    [field]: [...(errors[field] ?? []), message],
  };
};

const isBlank = (value: string) => value.trim().length === 0;

const isNonNegativeInteger = (value: string) => {
  return /^\d+$/.test(value.trim()) && Number.parseInt(value, 10) >= 0;
};

const isPositiveInteger = (value: string) => {
  return /^\d+$/.test(value.trim()) && Number.parseInt(value, 10) >= 1;
};

const isNonNegativeNumber = (value: string) => {
  if (!/^\d+(\.\d+)?$/.test(value.trim())) {
    return false;
  }

  return Number.parseFloat(value) >= 0;
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const hasAcceptedImageExtension = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    extension !== undefined &&
    (ACCEPTED_ADVERTISEMENT_IMAGE_EXTENSIONS as readonly string[]).includes(extension)
  );
};

const hasAcceptedImageType = (file: File) => {
  return (
    (ACCEPTED_ADVERTISEMENT_IMAGE_TYPES as readonly string[]).includes(file.type) ||
    (file.type === "" && hasAcceptedImageExtension(file))
  );
};

const validateRequiredString = (
  errors: AdvertisementFormErrors,
  field: string,
  value: string,
  label: string,
) => {
  return isBlank(value) ? addError(errors, field, `${label} is required.`) : errors;
};

const validateRequiredNonNegativeInteger = (
  errors: AdvertisementFormErrors,
  field: string,
  value: string,
  label: string,
) => {
  if (isBlank(value)) {
    return addError(errors, field, `${label} is required.`);
  }

  return isNonNegativeInteger(value)
    ? errors
    : addError(errors, field, `${label} must be an integer 0 or greater.`);
};

const validateOptionalNonNegativeInteger = (
  errors: AdvertisementFormErrors,
  field: string,
  value: string,
  label: string,
) => {
  if (isBlank(value) || isNonNegativeInteger(value)) {
    return errors;
  }

  return addError(errors, field, `${label} must be an integer 0 or greater.`);
};

export const validateAdvertisementImages = (images: AdvertisementImage[]): ValidationResult => {
  let errors: AdvertisementFormErrors = {};

  if (images.length > MAX_ADVERTISEMENT_IMAGES) {
    errors = addError(errors, "images", `A vehicle can have up to ${MAX_ADVERTISEMENT_IMAGES} images.`);
  }

  images.forEach((image) => {
    if (!hasAcceptedImageType(image.file)) {
      errors = addError(errors, "images", `${image.file.name} must be a JPG, PNG, or WEBP image.`);
    }

    if (image.file.size > MAX_ADVERTISEMENT_IMAGE_SIZE_BYTES) {
      errors = addError(errors, "images", `${image.file.name} must be 10 MB or smaller.`);
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const validateAdvertisementForm = (form: AdvertisementForm): ValidationResult => {
  let errors: AdvertisementFormErrors = {};

  errors = validateRequiredString(errors, "brand", form.brand, "Brand");
  errors = validateRequiredString(errors, "name", form.name, "Name");
  errors = validateRequiredNonNegativeInteger(errors, "price", form.price, "Price");
  errors = validateRequiredString(
    errors,
    "general.firstRegistration",
    form.general.firstRegistration,
    "First registration",
  );
  errors = validateRequiredString(errors, "general.fuelType", form.general.fuelType, "Fuel type");
  errors = validateRequiredNonNegativeInteger(
    errors,
    "general.mileage",
    form.general.mileage,
    "Mileage",
  );
  errors = validateRequiredString(errors, "technical.bodyType", form.technical.bodyType, "Body type");

  if (!isBlank(form.general.firstRegistration) && !yearMonthPattern.test(form.general.firstRegistration)) {
    errors = addError(errors, "general.firstRegistration", "First registration must use YYYY-MM format.");
  }

  errors = validateOptionalNonNegativeInteger(
    errors,
    "general.engineCapacity",
    form.general.engineCapacity,
    "Engine capacity",
  );
  errors = validateOptionalNonNegativeInteger(
    errors,
    "general.enginePowerHp",
    form.general.enginePowerHp,
    "Engine power HP",
  );
  errors = validateOptionalNonNegativeInteger(
    errors,
    "general.enginePowerKw",
    form.general.enginePowerKw,
    "Engine power kW",
  );

  if (!isBlank(form.technical.seats) && !isPositiveInteger(form.technical.seats)) {
    errors = addError(errors, "technical.seats", "Seats must be at least 1.");
  }

  if (
    !isBlank(form.technical.technicalInspectionUntil) &&
    !yearMonthPattern.test(form.technical.technicalInspectionUntil)
  ) {
    errors = addError(
      errors,
      "technical.technicalInspectionUntil",
      "Technical inspection must use YYYY-MM format.",
    );
  }

  errors = validateOptionalNonNegativeInteger(
    errors,
    "technical.co2Emission",
    form.technical.co2Emission,
    "CO2 emission",
  );

  if (
    !isBlank(form.technical.registrationFee) &&
    !isNonNegativeNumber(form.technical.registrationFee)
  ) {
    errors = addError(errors, "technical.registrationFee", "Registration fee must be 0 or greater.");
  }

  if (!isBlank(form.links.historyCheck) && !isValidUrl(form.links.historyCheck)) {
    errors = addError(errors, "links.historyCheck", "History check must be a valid URL.");
  }

  const imageValidation = validateAdvertisementImages(form.images);
  errors = {
    ...errors,
    ...imageValidation.errors,
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
