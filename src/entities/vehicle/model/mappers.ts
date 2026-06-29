import type { Vehicle, VehicleDto } from "./types";

const mapTimestampToDate = (timestamp: number | null) => {
  return timestamp === null ? null : new Date(timestamp * 1000);
};

export const mapVehicleDtoToVehicle = (dto: VehicleDto): Vehicle => {
  return {
    adId: dto.adId,
    city: dto.city ?? null,
    country: dto.country ?? null,
    createdAt: mapTimestampToDate(dto.createdAt),
    general: {
      bodyType: dto.general.bodyType,
      brandType: dto.general.brandType,
      engineCapacity: dto.general.engineCapacity,
      enginePowerHp: dto.general.enginePowerHp,
      enginePowerKw: dto.general.enginePowerKw,
      firstRegistration: dto.general.firstRegistration,
      fuelType: dto.general.fuelType,
      gearboxType: dto.general.gearboxType,
      mileage: dto.general.mileage,
      price: dto.general.price,
    },
    id: dto.id,
    images: dto.images,
    links: {
      historyCheck: dto.links.historyCheck,
    },
    sourceUrl: dto.sourceUrl,
    status: dto.status ?? null,
    technical: {
      climateControl: dto.technical.climateControl,
      co2Emission: dto.technical.co2Emission,
      color: dto.technical.color,
      doors: dto.technical.doors,
      driveType: dto.technical.driveType,
      euroStandard: dto.technical.euroStandard,
      ownerDeclarationCode: dto.technical.ownerDeclarationCode,
      registrationFee: dto.technical.registrationFee,
      seats: dto.technical.seats,
      technicalInspectionUntil: dto.technical.technicalInspectionUntil,
    },
    title: dto.title,
    updatedAt: mapTimestampToDate(dto.updatedAt),
  };
};
