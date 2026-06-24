const numberFormatter = new Intl.NumberFormat("en-US");

export const formatVehicleNumber = (value: number | null) => {
  return value === null ? "N/A" : numberFormatter.format(value);
};

export const formatVehiclePrice = (value: number | null) => {
  return value === null ? "Price on request" : `${numberFormatter.format(value)} EUR`;
};

export const formatVehicleDate = (value: Date | null, locale?: string) => {
  return value === null ? "Date N/A" : value.toLocaleDateString(locale);
};

export const formatVehicleEngine = (engineCapacity: number | null) => {
  if (engineCapacity === null) {
    return "Engine N/A";
  }

  const liters = engineCapacity / 1000;
  const formattedLiters = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: engineCapacity % 1000 === 0 ? 0 : 1,
  }).format(liters);

  return `${formattedLiters} l`;
};

export const formatVehicleMileage = (value: number | null) => {
  return `${formatVehicleNumber(value)} km`;
};

export const formatVehiclePower = (
  enginePowerHp: number | null,
  enginePowerKw: number | null = null,
) => {
  if (enginePowerHp === null && enginePowerKw === null) {
    return "Power N/A";
  }

  const parts = [
    enginePowerHp === null ? null : `${enginePowerHp} hp`,
    enginePowerKw === null ? null : `${enginePowerKw} kW`,
  ].filter((part): part is string => part !== null);

  return parts.join(" / ");
};

export const formatVehicleYear = (firstRegistration: string | null) => {
  return firstRegistration?.slice(0, 4) ?? "Year N/A";
};
