import type { VehicleType, VehicleTypeDto } from "@/src/entities/dictionary";

export type VehicleDto = {
  adId: string;
  createdAt: number | null;
  general: {
    bodyType: VehicleTypeDto | null;
    brandType: VehicleTypeDto | null;
    engineCapacity: number | null;
    enginePowerHp: number | null;
    enginePowerKw: number | null;
    firstRegistration: string | null;
    fuelType: VehicleTypeDto | null;
    gearboxType: string | null;
    mileage: number | null;
    price: number | null;
  };
  id: number;
  images: string[];
  links: {
    historyCheck: string | null;
  };
  sourceUrl: string;
  technical: {
    climateControl: string | null;
    co2Emission: number | null;
    color: string | null;
    doors: string | null;
    driveType: string | null;
    euroStandard: string | null;
    ownerDeclarationCode: string | null;
    registrationFee: number | null;
    seats: number | null;
    technicalInspectionUntil: string | null;
  };
  title: string;
  updatedAt: number | null;
};

export type Vehicle = {
  adId: string;
  createdAt: Date | null;
  general: {
    bodyType: VehicleType | null;
    brandType: VehicleType | null;
    engineCapacity: number | null;
    enginePowerHp: number | null;
    enginePowerKw: number | null;
    firstRegistration: string | null;
    fuelType: VehicleType | null;
    gearboxType: string | null;
    mileage: number | null;
    price: number | null;
  };
  id: number;
  images: string[];
  links: {
    historyCheck: string | null;
  };
  sourceUrl: string;
  technical: {
    climateControl: string | null;
    co2Emission: number | null;
    color: string | null;
    doors: string | null;
    driveType: string | null;
    euroStandard: string | null;
    ownerDeclarationCode: string | null;
    registrationFee: number | null;
    seats: number | null;
    technicalInspectionUntil: string | null;
  };
  title: string;
  updatedAt: Date | null;
};
