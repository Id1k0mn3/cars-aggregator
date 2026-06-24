import {
  formatVehicleDate,
  formatVehicleEngine,
  formatVehicleMileage,
  formatVehicleNumber,
  formatVehiclePower,
  formatVehiclePrice,
  formatVehicleYear,
  type Vehicle,
  type VehicleCardViewModel,
} from "@/src/entities/vehicle";
import { resolveImageUrl } from "@/src/shared/lib/resolve-image-url";

export type VehicleDetailViewModel = {
  adId: string;
  bodyType: string;
  brand: string;
  co2Emission: string;
  color: string;
  description: string;
  doors: string;
  drive: string;
  engine: string;
  fuel: string;
  id: string;
  imageUrls: string[];
  location: string;
  mileage: string;
  ownerDeclarationCode: string;
  postedAt: string;
  power: string;
  price: string;
  priceNote: string;
  registrationFee: string;
  seats: string;
  sourceUrl: string;
  technicalInspection: string;
  title: string;
  transmission: string;
  year: string;
};

const formatTechnicalInspection = (value: string | null) => {
  return value ?? "Inspection N/A";
};

const mapImageUrls = (imageUrls: string[]) => {
  return imageUrls
    .map(resolveImageUrl)
    .filter((imageUrl): imageUrl is string => typeof imageUrl === "string");
};

export const mapVehicleToDetailViewModel = (vehicle: Vehicle): VehicleDetailViewModel => {
  const brand = vehicle.general.brandType?.title ?? "Vehicle";
  const bodyType = vehicle.general.bodyType?.title ?? "Body N/A";
  const firstRegistration = vehicle.general.firstRegistration;

  return {
    adId: vehicle.adId,
    bodyType,
    brand,
    co2Emission:
      vehicle.technical.co2Emission === null ? "CO2 N/A" : `${vehicle.technical.co2Emission} g/km`,
    color: vehicle.technical.color ?? "Color N/A",
    description:
      "This listing is loaded from the vehicle API. Detailed seller notes are not available in the current frontend contract.",
    doors: vehicle.technical.doors ?? "Doors N/A",
    drive: vehicle.technical.driveType ?? "Drive N/A",
    engine: formatVehicleEngine(vehicle.general.engineCapacity),
    fuel: vehicle.general.fuelType?.title ?? "Fuel N/A",
    id: vehicle.id.toString(),
    imageUrls: mapImageUrls(vehicle.images),
    location: "Location N/A",
    mileage: formatVehicleMileage(vehicle.general.mileage),
    ownerDeclarationCode: vehicle.technical.ownerDeclarationCode ?? "Declaration code N/A",
    postedAt: formatVehicleDate(vehicle.createdAt, "en-US"),
    power: formatVehiclePower(vehicle.general.enginePowerHp, vehicle.general.enginePowerKw),
    price: formatVehiclePrice(vehicle.general.price),
    priceNote:
      firstRegistration === null
        ? "Registration date N/A"
        : `First registered ${firstRegistration}`,
    registrationFee:
      vehicle.technical.registrationFee === null
        ? "Fee N/A"
        : `${formatVehicleNumber(vehicle.technical.registrationFee)} EUR`,
    seats: vehicle.technical.seats === null ? "Seats N/A" : vehicle.technical.seats.toString(),
    sourceUrl: vehicle.sourceUrl,
    technicalInspection: formatTechnicalInspection(vehicle.technical.technicalInspectionUntil),
    title: vehicle.title,
    transmission: vehicle.general.gearboxType ?? "Gearbox N/A",
    year: formatVehicleYear(firstRegistration),
  };
};

export const mapVehicleToDetailSimilarCard = (vehicle: Vehicle): VehicleCardViewModel => {
  return {
    brand: vehicle.general.brandType?.title ?? "Vehicle",
    fuel: vehicle.general.fuelType?.title ?? "Fuel N/A",
    href: `/vehicles/${vehicle.id}`,
    id: vehicle.id.toString(),
    imageUrl: resolveImageUrl(vehicle.images[0]),
    location: "Location N/A",
    mileage: formatVehicleMileage(vehicle.general.mileage),
    price: formatVehiclePrice(vehicle.general.price),
    title: vehicle.title,
    year: formatVehicleYear(vehicle.general.firstRegistration),
  };
};
