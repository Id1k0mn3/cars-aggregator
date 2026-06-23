import { apiRequestWithMeta } from "@/src/shared/api";

export type HomeDictionaryItemDto = {
  id: number;
  slug: string;
  title: string;
  total: number | null;
};

export type HomeVehicleTypeDto = {
  id: number;
  slug: string;
  title: string;
};

export type HomeVehicleDto = {
  adId: string;
  createdAt: number | null;
  general: {
    bodyType: HomeVehicleTypeDto | null;
    brandType: HomeVehicleTypeDto | null;
    engineCapacity: number | null;
    enginePowerHp: number | null;
    enginePowerKw: number | null;
    firstRegistration: string | null;
    fuelType: HomeVehicleTypeDto | null;
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

export type HomePageDto = {
  brands: HomeDictionaryItemDto[];
  bodies: HomeDictionaryItemDto[];
  vehicles: HomeVehicleDto[];
};

const HOME_PAGE_PATH = "/vehicles/home/";

const HOME_PAGE_REQUEST_OPTIONS = {
  cache: "no-store" as const,
};

export const getHomePage = async (): Promise<HomePageDto> => {
  const response = await apiRequestWithMeta<HomePageDto>(HOME_PAGE_PATH, HOME_PAGE_REQUEST_OPTIONS);

  return response.data;
};
