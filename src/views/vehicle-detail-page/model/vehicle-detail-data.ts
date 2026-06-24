import {
  formatVehicleEngine,
  formatVehicleNumber,
  formatVehicleYear,
  getVehicles,
  type Vehicle,
  type VehicleCardViewModel,
  type VehicleFilterParams,
} from "@/src/entities/vehicle";
import { isApiClientError } from "@/src/shared/api";

import { mapVehicleToDetailSimilarCard } from "./vehicle-detail-mappers";
import type { VehicleDetailSpec } from "./vehicle-detail-types";

export type VehicleDetailErrorViewModel = {
  message: string;
  title: string;
};

export const createVehicleDetailError = (error: unknown): VehicleDetailErrorViewModel => {
  const message = isApiClientError(error)
    ? (error.payload?.message ?? error.message)
    : "Failed to load vehicle details.";

  return {
    message,
    title:
      isApiClientError(error) && error.status === 404 ? "Vehicle not found" : "Vehicle unavailable",
  };
};

const createSimilarVehicleParams = (vehicle: Vehicle): VehicleFilterParams => {
  const params: VehicleFilterParams = {
    per_page: 6,
  };

  if (vehicle.general.brandType?.id !== undefined) {
    params.brand_type_id = vehicle.general.brandType.id;
    return params;
  }

  if (vehicle.general.bodyType?.id !== undefined) {
    params.body_type_id = vehicle.general.bodyType.id;
    return params;
  }

  if (vehicle.general.fuelType?.id !== undefined) {
    params.fuel_type_id = vehicle.general.fuelType.id;
  }

  return params;
};

export const getSimilarVehicles = async (vehicle: Vehicle): Promise<VehicleCardViewModel[]> => {
  try {
    const vehicleList = await getVehicles(createSimilarVehicleParams(vehicle));

    return vehicleList.items
      .filter((similarVehicle) => similarVehicle.id !== vehicle.id)
      .slice(0, 3)
      .map(mapVehicleToDetailSimilarCard);
  } catch {
    return [];
  }
};

export const createVehicleSpecs = (vehicle: Vehicle): VehicleDetailSpec[] => {
  return [
    {
      isAvailable: vehicle.general.bodyType !== null,
      label: "Body type",
      value: vehicle.general.bodyType?.title ?? "Body N/A",
    },
    {
      isAvailable: vehicle.general.firstRegistration !== null,
      label: "Year",
      value: formatVehicleYear(vehicle.general.firstRegistration),
    },
    {
      isAvailable: vehicle.technical.color !== null,
      label: "Color",
      value: vehicle.technical.color ?? "Color N/A",
    },
    {
      isAvailable: vehicle.general.engineCapacity !== null,
      label: "Engine",
      value: formatVehicleEngine(vehicle.general.engineCapacity),
    },
    {
      isAvailable: vehicle.technical.driveType !== null,
      label: "Drive",
      value: vehicle.technical.driveType ?? "Drive N/A",
    },
    {
      isAvailable: vehicle.technical.doors !== null,
      label: "Doors",
      value: vehicle.technical.doors ?? "Doors N/A",
    },
    {
      isAvailable: vehicle.technical.seats !== null,
      label: "Seats",
      value: vehicle.technical.seats?.toString() ?? "Seats N/A",
    },
    {
      isAvailable: vehicle.technical.co2Emission !== null,
      label: "CO2 emission",
      value:
        vehicle.technical.co2Emission === null
          ? "CO2 N/A"
          : `${vehicle.technical.co2Emission} g/km`,
    },
    {
      isAvailable: vehicle.technical.registrationFee !== null,
      label: "Registration fee",
      value:
        vehicle.technical.registrationFee === null
          ? "Fee N/A"
          : `${formatVehicleNumber(vehicle.technical.registrationFee)} EUR`,
    },
    {
      isAvailable: vehicle.technical.ownerDeclarationCode !== null,
      label: "Owner declaration",
      value: vehicle.technical.ownerDeclarationCode ?? "Declaration code N/A",
    },
    {
      isAvailable: vehicle.technical.technicalInspectionUntil !== null,
      label: "Inspection until",
      value: vehicle.technical.technicalInspectionUntil ?? "Inspection N/A",
    },
  ];
};
