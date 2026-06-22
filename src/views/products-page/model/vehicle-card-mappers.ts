import type { Vehicle, VehicleHorizontalCardViewModel } from "@/src/entities/vehicle";
import { getApiBaseUrl } from "@/src/shared/config";

const formatNumber = (value: number | null) => {
  return value === null ? "N/A" : new Intl.NumberFormat("en-US").format(value);
};

const formatPrice = (value: number | null) => {
  return value === null ? "Price on request" : `${new Intl.NumberFormat("en-US").format(value)} EUR`;
};

const resolveVehicleImageUrl = (imageUrl: string | undefined) => {
  if (!imageUrl) {
    return undefined;
  }

  try {
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return new URL(imageUrl).toString();
    }

    if (imageUrl.startsWith("/")) {
      return new URL(imageUrl, getApiBaseUrl()).toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
};

export const mapVehicleToHorizontalCard = (vehicle: Vehicle): VehicleHorizontalCardViewModel => {
  const brand = vehicle.general.brandType?.title ?? "Vehicle";
  const fuel = vehicle.general.fuelType?.title ?? "Fuel N/A";
  const bodyType = vehicle.general.bodyType?.title;
  const mileage = `${formatNumber(vehicle.general.mileage)} km`;
  const power =
    vehicle.general.enginePowerHp === null ? "Power N/A" : `${vehicle.general.enginePowerHp} hp`;

  return {
    brand,
    features: [bodyType, vehicle.technical.color, vehicle.technical.climateControl].filter(
      (feature): feature is string => typeof feature === "string" && feature.length > 0,
    ),
    fuel,
    href: `/products/${vehicle.id}`,
    id: vehicle.id.toString(),
    imageUrl: resolveVehicleImageUrl(vehicle.images[0]),
    location: "Location N/A",
    mileage,
    postedAt: vehicle.createdAt === null ? "Date N/A" : vehicle.createdAt.toLocaleDateString(),
    power,
    price: formatPrice(vehicle.general.price),
    priceNote: vehicle.general.firstRegistration ?? "Registration date N/A",
    title: vehicle.title,
    transmission: vehicle.general.gearboxType ?? "Gearbox N/A",
    views: "N/A",
    year: vehicle.general.firstRegistration?.slice(0, 4) ?? "Year N/A",
  };
};
