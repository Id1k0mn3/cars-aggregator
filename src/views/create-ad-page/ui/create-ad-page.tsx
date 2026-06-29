"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";

import {
  getBodyTypes,
  getBrandTypes,
  getFuelTypes,
  type VehicleType,
} from "@/src/entities/dictionary";
import type { Vehicle } from "@/src/entities/vehicle";
import { useAuthSession } from "@/src/features/auth";
import { isApiClientError } from "@/src/shared/api";
import { SiteHeader } from "@/src/widgets/site-header";

import {
  type AdvertisementForm,
  type AdvertisementFormErrors,
  type AdvertisementImage,
  createInitialAdvertisementForm,
  MAX_ADVERTISEMENT_IMAGES,
} from "../model/advertisement-form";
import {
  type AdvertisementSubmitStage,
  submitAdvertisement,
} from "../model/submit-advertisement";

const fieldClassName =
  "rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70";

const selectClassName = fieldClassName;

const gearboxOptions = [
  { label: "Not specified", value: "" },
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
  { label: "Semi-automatic", value: "semi-automatic" },
];

type AdvertisementDictionaries = {
  bodyTypes: VehicleType[];
  brandTypes: VehicleType[];
  fuelTypes: VehicleType[];
};

const emptyDictionaries: AdvertisementDictionaries = {
  bodyTypes: [],
  brandTypes: [],
  fuelTypes: [],
};

const mapVehicleTypesToSelectOptions = (items: VehicleType[], placeholder: string) => {
  return [
    { label: placeholder, value: "" },
    ...items.map((item) => ({
      label: item.title,
      value: item.slug,
    })),
  ];
};

const getDictionaryErrorMessage = (error: unknown) => {
  if (isApiClientError(error)) {
    return error.payload?.message ?? error.message;
  }

  return "Failed to load vehicle options.";
};

const createImageId = () => {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
};

const getStatusMessage = (
  stage: AdvertisementSubmitStage,
  createdVehicle: Vehicle | null,
  generalError: string | null,
) => {
  if (generalError) {
    return generalError;
  }

  if (stage === "creating") {
    return "Creating advertisement...";
  }

  if (stage === "uploading") {
    return "Uploading images...";
  }

  if (stage === "success" && createdVehicle) {
    return "Advertisement created successfully.";
  }

  return null;
};

export function CreateAdPage() {
  const { status } = useAuthSession();
  const [form, setForm] = useState<AdvertisementForm>(() => createInitialAdvertisementForm());
  const imagesRef = useRef<AdvertisementImage[]>([]);
  const [dictionaries, setDictionaries] = useState<AdvertisementDictionaries>(emptyDictionaries);
  const [dictionaryError, setDictionaryError] = useState<string | null>(null);
  const [areDictionariesLoading, setAreDictionariesLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<AdvertisementFormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [stage, setStage] = useState<AdvertisementSubmitStage>("idle");
  const [createdVehicle, setCreatedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    imagesRef.current = form.images;
  }, [form.images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadDictionaries = async () => {
      setAreDictionariesLoading(true);
      setDictionaryError(null);

      try {
        const [brandTypes, fuelTypes, bodyTypes] = await Promise.all([
          getBrandTypes(),
          getFuelTypes(),
          getBodyTypes(),
        ]);

        if (!isActive) {
          return;
        }

        setDictionaries({
          bodyTypes,
          brandTypes,
          fuelTypes,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        setDictionaryError(getDictionaryErrorMessage(error));
        setDictionaries(emptyDictionaries);
      } finally {
        if (isActive) {
          setAreDictionariesLoading(false);
        }
      }
    };

    void loadDictionaries();

    return () => {
      isActive = false;
    };
  }, []);

  const isSubmitting = stage === "creating" || stage === "uploading";
  const isAdvertisementCreated = createdVehicle !== null;
  const areControlsDisabled = isSubmitting || isAdvertisementCreated;
  const isDictionarySelectionUnavailable = areDictionariesLoading || dictionaryError !== null;
  const hasImagesToUpload = form.images.some((image) => image.status !== "uploaded");
  const statusMessage = getStatusMessage(stage, createdVehicle, generalError);
  const brandOptions = mapVehicleTypesToSelectOptions(dictionaries.brandTypes, "Select brand");
  const fuelTypeOptions = mapVehicleTypesToSelectOptions(dictionaries.fuelTypes, "Select fuel type");
  const bodyTypeOptions = mapVehicleTypesToSelectOptions(dictionaries.bodyTypes, "Select body type");

  const updateRootField = (field: "brand" | "city" | "country" | "name" | "price", value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const updateGeneralField = (field: keyof AdvertisementForm["general"], value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      general: {
        ...currentForm.general,
        [field]: value,
      },
    }));
  };

  const updateTechnicalField = (field: keyof AdvertisementForm["technical"], value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      technical: {
        ...currentForm.technical,
        [field]: value,
      },
    }));
  };

  const updateLinksField = (field: keyof AdvertisementForm["links"], value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      links: {
        ...currentForm.links,
        [field]: value,
      },
    }));
  };

  const updateImageStatus = (
    imageId: string,
    statusValue: AdvertisementImage["status"],
    errorMessage: string | null,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      images: currentForm.images.map((image) =>
        image.id === imageId ? { ...image, errorMessage, status: statusValue } : image,
      ),
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (files.length === 0) {
      return;
    }

    const remainingSlots = MAX_ADVERTISEMENT_IMAGES - form.images.length;

    if (files.length > remainingSlots) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        images: [`A vehicle can have up to ${MAX_ADVERTISEMENT_IMAGES} images.`],
      }));
    }

    setForm((currentForm) => {
      const remainingSlots = MAX_ADVERTISEMENT_IMAGES - currentForm.images.length;
      const nextImages = files.slice(0, Math.max(remainingSlots, 0)).map<AdvertisementImage>((file) => ({
        errorMessage: null,
        file,
        id: createImageId(),
        previewUrl: URL.createObjectURL(file),
        status: "pending",
      }));

      return {
        ...currentForm,
        images: [...currentForm.images, ...nextImages],
      };
    });
  };

  const removeImage = (imageId: string) => {
    setForm((currentForm) => {
      const imageToRemove = currentForm.images.find((image) => image.id === imageId);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return {
        ...currentForm,
        images: currentForm.images.filter((image) => image.id !== imageId),
      };
    });
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFieldErrors({});
    setGeneralError(null);

    const result = await submitAdvertisement(form, {
      existingVehicle: createdVehicle ?? undefined,
      onImageStatusChange: updateImageStatus,
      onStageChange: setStage,
    });

    setFieldErrors(result.fieldErrors);
    setGeneralError(result.generalError);

    if ("vehicle" in result) {
      setCreatedVehicle(result.vehicle);
    }

    if (result.status === "validation-error" || result.status === "error") {
      setStage("idle");
    }
  };

  if (status === "initializing") {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-950">
        <SiteHeader />
        <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Checking session...</p>
          </div>
        </section>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-950">
        <SiteHeader />
        <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Sign in required</h1>
            <p className="mt-2 text-sm text-slate-600">
              You need to sign in before creating an advertisement.
            </p>
            <Link
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              href="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Sell car</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Create vehicle advertisement</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Add the required vehicle data first. Images are uploaded after the advertisement is
          created.
        </p>
      </section>

      <form className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 lg:px-8" onSubmit={submitForm}>
        {statusMessage ? (
          <div
            className={
              generalError
                ? "mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                : "mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
            }
          >
            {statusMessage}
          </div>
        ) : null}

        {dictionaryError ? (
          <div className="mb-5 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
            {dictionaryError}
          </div>
        ) : null}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold">Main information</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SelectField
              disabled={areControlsDisabled || areDictionariesLoading}
              errors={fieldErrors.brand}
              label="Brand"
              onChange={(value) => updateRootField("brand", value)}
              options={brandOptions}
              required
              value={form.brand}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors.name}
              label="Advertisement name"
              onChange={(value) => updateRootField("name", value)}
              required
              value={form.name}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors.price}
              label="Price"
              min={0}
              onChange={(value) => updateRootField("price", value)}
              required
              type="number"
              value={form.price}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.mileage"]}
              label="Mileage"
              min={0}
              onChange={(value) => updateGeneralField("mileage", value)}
              required
              type="number"
              value={form.general.mileage}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors.city}
              label="City"
              onChange={(value) => updateRootField("city", value)}
              value={form.city}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors.country}
              label="Country"
              onChange={(value) => updateRootField("country", value)}
              value={form.country}
            />
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold">General data</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.firstRegistration"]}
              label="First registration"
              onChange={(value) => updateGeneralField("firstRegistration", value)}
              required
              type="month"
              value={form.general.firstRegistration}
            />
            <SelectField
              disabled={areControlsDisabled || areDictionariesLoading}
              errors={fieldErrors["general.fuelType"]}
              label="Fuel type"
              onChange={(value) => updateGeneralField("fuelType", value)}
              options={fuelTypeOptions}
              required
              value={form.general.fuelType}
            />
            <SelectField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.gearboxType"]}
              label="Gearbox type"
              onChange={(value) => updateGeneralField("gearboxType", value)}
              options={gearboxOptions}
              value={form.general.gearboxType}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.engineCapacity"]}
              label="Engine capacity"
              min={0}
              onChange={(value) => updateGeneralField("engineCapacity", value)}
              type="number"
              value={form.general.engineCapacity}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.enginePowerHp"]}
              label="Engine power HP"
              min={0}
              onChange={(value) => updateGeneralField("enginePowerHp", value)}
              type="number"
              value={form.general.enginePowerHp}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["general.enginePowerKw"]}
              label="Engine power kW"
              min={0}
              onChange={(value) => updateGeneralField("enginePowerKw", value)}
              type="number"
              value={form.general.enginePowerKw}
            />
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold">Technical data</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SelectField
              disabled={areControlsDisabled || areDictionariesLoading}
              errors={fieldErrors["technical.bodyType"]}
              label="Body type"
              onChange={(value) => updateTechnicalField("bodyType", value)}
              options={bodyTypeOptions}
              required
              value={form.technical.bodyType}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.doors"]}
              label="Doors"
              onChange={(value) => updateTechnicalField("doors", value)}
              value={form.technical.doors}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.seats"]}
              label="Seats"
              min={1}
              onChange={(value) => updateTechnicalField("seats", value)}
              type="number"
              value={form.technical.seats}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.driveType"]}
              label="Drive type"
              onChange={(value) => updateTechnicalField("driveType", value)}
              value={form.technical.driveType}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.climateControl"]}
              label="Climate control"
              onChange={(value) => updateTechnicalField("climateControl", value)}
              value={form.technical.climateControl}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.color"]}
              label="Color"
              onChange={(value) => updateTechnicalField("color", value)}
              value={form.technical.color}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.technicalInspectionUntil"]}
              label="Technical inspection until"
              onChange={(value) => updateTechnicalField("technicalInspectionUntil", value)}
              type="month"
              value={form.technical.technicalInspectionUntil}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.euroStandard"]}
              label="Euro standard"
              onChange={(value) => updateTechnicalField("euroStandard", value)}
              value={form.technical.euroStandard}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.co2Emission"]}
              label="CO2 emission"
              min={0}
              onChange={(value) => updateTechnicalField("co2Emission", value)}
              type="number"
              value={form.technical.co2Emission}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.registrationFee"]}
              label="Registration fee"
              min={0}
              onChange={(value) => updateTechnicalField("registrationFee", value)}
              step="0.01"
              type="number"
              value={form.technical.registrationFee}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["technical.ownerDeclarationCode"]}
              label="Owner declaration code"
              onChange={(value) => updateTechnicalField("ownerDeclarationCode", value)}
              value={form.technical.ownerDeclarationCode}
            />
            <TextField
              disabled={areControlsDisabled}
              errors={fieldErrors["links.historyCheck"]}
              label="History check URL"
              onChange={(value) => updateLinksField("historyCheck", value)}
              type="url"
              value={form.links.historyCheck}
            />
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <h2 className="text-base font-bold">Images</h2>
            <span className="text-xs font-semibold text-slate-500">
              {form.images.length}/{MAX_ADVERTISEMENT_IMAGES}
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Upload images
              </span>
              <input
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                className={fieldClassName}
                disabled={isSubmitting || form.images.length >= MAX_ADVERTISEMENT_IMAGES}
                multiple
                onChange={handleImageChange}
                type="file"
              />
              <span className="text-xs text-slate-500">
                JPG, PNG, or WEBP. Uploads run one image per request after creation.
              </span>
              <FieldErrors messages={fieldErrors.images} />
            </label>

            {form.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {form.images.map((image) => (
                  <article
                    className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                    key={image.id}
                  >
                    <img
                      alt=""
                      className="aspect-[4/3] w-full object-cover"
                      src={image.previewUrl}
                    />
                    <div className="grid gap-2 p-3">
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {image.file.name}
                      </p>
                      <p
                        className={
                          image.status === "failed"
                            ? "text-xs font-medium text-red-600"
                            : "text-xs font-medium text-slate-500"
                        }
                      >
                        {image.errorMessage ?? image.status}
                      </p>
                      {image.status === "uploaded" ? null : (
                        <button
                          className="text-left text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:text-slate-400"
                          disabled={isSubmitting}
                          onClick={() => removeImage(image.id)}
                          type="button"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <button
          className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={
            isSubmitting ||
            isDictionarySelectionUnavailable ||
            (isAdvertisementCreated && !hasImagesToUpload)
          }
          type="submit"
        >
          {isSubmitting
            ? "Submitting..."
            : isAdvertisementCreated
              ? hasImagesToUpload
                ? "Upload remaining images"
                : "Advertisement created"
              : "Create advertisement"}
        </button>

        {createdVehicle ? (
          <Link
            className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
            href={`/vehicles/${createdVehicle.id}`}
          >
            Open created advertisement
          </Link>
        ) : null}
      </form>
    </main>
  );
}

type TextFieldProps = {
  disabled?: boolean;
  errors?: string[];
  label: string;
  min?: number;
  onChange: (value: string) => void;
  required?: boolean;
  step?: string;
  type?: "month" | "number" | "text" | "url";
  value: string;
};

function TextField({
  disabled = false,
  errors,
  label,
  min,
  onChange,
  required = false,
  step,
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        className={fieldClassName}
        disabled={disabled}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        step={step}
        type={type}
        value={value}
      />
      <FieldErrors messages={errors} />
    </label>
  );
}

type SelectFieldProps = {
  disabled?: boolean;
  errors?: string[];
  label: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  value: string;
};

function SelectField({
  disabled = false,
  errors,
  label,
  onChange,
  options,
  required = false,
  value,
}: SelectFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        className={selectClassName}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldErrors messages={errors} />
    </label>
  );
}

type FieldErrorsProps = {
  messages?: string[];
};

function FieldErrors({ messages }: FieldErrorsProps) {
  if (messages === undefined || messages.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-1 text-xs text-red-600">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
