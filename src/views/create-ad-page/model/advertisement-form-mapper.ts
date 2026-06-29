import type { CreateAdvertisementRequestDto } from "@/src/entities/vehicle";

import type { AdvertisementForm } from "./advertisement-form";

const trimToNullable = (value: string) => {
  const trimmed = value.trim();

  return trimmed ? trimmed : null;
};

const parseRequiredInteger = (value: string) => {
  return Number.parseInt(value, 10);
};

const parseOptionalInteger = (value: string) => {
  const trimmed = value.trim();

  return trimmed ? Number.parseInt(trimmed, 10) : null;
};

const parseOptionalNumber = (value: string) => {
  const trimmed = value.trim();

  return trimmed ? Number.parseFloat(trimmed) : null;
};

export const mapAdvertisementFormToCreateDto = (
  form: AdvertisementForm,
): CreateAdvertisementRequestDto => {
  return {
    brand: form.brand.trim(),
    city: trimToNullable(form.city),
    country: trimToNullable(form.country),
    general: {
      engineCapacity: parseOptionalInteger(form.general.engineCapacity),
      enginePowerHp: parseOptionalInteger(form.general.enginePowerHp),
      enginePowerKw: parseOptionalInteger(form.general.enginePowerKw),
      firstRegistration: form.general.firstRegistration.trim(),
      fuelType: form.general.fuelType.trim(),
      gearboxType: trimToNullable(form.general.gearboxType),
      mileage: parseRequiredInteger(form.general.mileage),
    },
    links: {
      historyCheck: trimToNullable(form.links.historyCheck),
    },
    name: form.name.trim(),
    price: parseRequiredInteger(form.price),
    technical: {
      bodyType: form.technical.bodyType.trim(),
      climateControl: trimToNullable(form.technical.climateControl),
      co2Emission: parseOptionalInteger(form.technical.co2Emission),
      color: trimToNullable(form.technical.color),
      doors: trimToNullable(form.technical.doors),
      driveType: trimToNullable(form.technical.driveType),
      euroStandard: trimToNullable(form.technical.euroStandard),
      ownerDeclarationCode: trimToNullable(form.technical.ownerDeclarationCode),
      registrationFee: parseOptionalNumber(form.technical.registrationFee),
      seats: parseOptionalInteger(form.technical.seats),
      technicalInspectionUntil: trimToNullable(form.technical.technicalInspectionUntil),
    },
  };
};
