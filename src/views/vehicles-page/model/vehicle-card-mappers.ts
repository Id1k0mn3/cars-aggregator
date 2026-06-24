import {
  formatVehicleDate,
  formatVehicleMileage,
  formatVehiclePower,
  formatVehiclePrice,
  formatVehicleYear,
  type Vehicle,
  type VehicleHorizontalCardViewModel,
} from "@/src/entities/vehicle";
import { resolveImageUrl } from "@/src/shared/lib/resolve-image-url";

export const mapVehicleToHorizontalCard = (vehicle: Vehicle): VehicleHorizontalCardViewModel => {
  const brand = vehicle.general.brandType?.title ?? "Vehicle";
  const fuel = vehicle.general.fuelType?.title ?? "Fuel N/A";
  const bodyType = vehicle.general.bodyType?.title;
  const mileage = formatVehicleMileage(vehicle.general.mileage);
  const power = formatVehiclePower(vehicle.general.enginePowerHp);

  return {
    brand,
    features: [bodyType, vehicle.technical.color, vehicle.technical.climateControl].filter(
      (feature): feature is string => typeof feature === "string" && feature.length > 0,
    ),
    fuel,
    href: `/vehicles/${vehicle.id}`,
    id: vehicle.id.toString(),
    imageUrl: resolveImageUrl(vehicle.images[0]),
    location: "Location N/A",
    mileage,
    postedAt: formatVehicleDate(vehicle.createdAt),
    power,
    price: formatVehiclePrice(vehicle.general.price),
    priceNote: vehicle.general.firstRegistration ?? "Registration date N/A",
    title: vehicle.title,
    transmission: vehicle.general.gearboxType ?? "Gearbox N/A",
    views: "N/A",
    year: formatVehicleYear(vehicle.general.firstRegistration),
  };
};
