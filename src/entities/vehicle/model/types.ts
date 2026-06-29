import type { VehicleType, VehicleTypeDto } from "@/src/entities/dictionary";

export type VehicleDto = {
  adId: string;
  city?: string | null;
  country?: string | null;
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
  status?: string;
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

export type CreateAdvertisementRequestDto = {
  brand: string;
  city: string | null;
  country: string | null;
  general: {
    engineCapacity: number | null;
    enginePowerHp: number | null;
    enginePowerKw: number | null;
    firstRegistration: string;
    fuelType: string;
    gearboxType: string | null;
    mileage: number;
  };
  links?: {
    historyCheck: string | null;
  };
  name: string;
  price: number;
  technical: {
    bodyType: string;
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
};

export type Vehicle = {
  adId: string;
  city: string | null;
  country: string | null;
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
  status: string | null;
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
