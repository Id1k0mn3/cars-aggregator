export type AdvertisementImageStatus = "failed" | "pending" | "uploaded" | "uploading";

export type AdvertisementImage = {
  errorMessage: string | null;
  file: File;
  id: string;
  previewUrl: string;
  status: AdvertisementImageStatus;
};

export type AdvertisementForm = {
  brand: string;
  city: string;
  country: string;
  general: {
    engineCapacity: string;
    enginePowerHp: string;
    enginePowerKw: string;
    firstRegistration: string;
    fuelType: string;
    gearboxType: string;
    mileage: string;
  };
  images: AdvertisementImage[];
  links: {
    historyCheck: string;
  };
  name: string;
  price: string;
  technical: {
    bodyType: string;
    climateControl: string;
    co2Emission: string;
    color: string;
    doors: string;
    driveType: string;
    euroStandard: string;
    ownerDeclarationCode: string;
    registrationFee: string;
    seats: string;
    technicalInspectionUntil: string;
  };
};

export type AdvertisementFormField = Exclude<keyof AdvertisementForm, "images"> | string;

export type AdvertisementFormErrors = Partial<Record<AdvertisementFormField, string[]>>;

export const MAX_ADVERTISEMENT_IMAGES = 20;
export const MAX_ADVERTISEMENT_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_ADVERTISEMENT_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

export const ACCEPTED_ADVERTISEMENT_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const createInitialAdvertisementForm = (): AdvertisementForm => {
  return {
    brand: "",
    city: "",
    country: "",
    general: {
      engineCapacity: "",
      enginePowerHp: "",
      enginePowerKw: "",
      firstRegistration: "",
      fuelType: "",
      gearboxType: "",
      mileage: "",
    },
    images: [],
    links: {
      historyCheck: "",
    },
    name: "",
    price: "",
    technical: {
      bodyType: "",
      climateControl: "",
      co2Emission: "",
      color: "",
      doors: "",
      driveType: "",
      euroStandard: "",
      ownerDeclarationCode: "",
      registrationFee: "",
      seats: "",
      technicalInspectionUntil: "",
    },
  };
};
