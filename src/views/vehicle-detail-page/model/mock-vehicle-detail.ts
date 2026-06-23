import type { VehicleCardViewModel } from "@/src/entities/vehicle";

export type VehicleDetailViewModel = {
  bodyType: string;
  brand: string;
  color: string;
  description: string;
  drive: string;
  engine: string;
  fuel: string;
  id: string;
  location: string;
  mileage: string;
  ownerCount: string;
  postedAt: string;
  power: string;
  price: string;
  priceNote: string;
  seller: {
    initials: string;
    name: string;
    type: string;
  };
  similarVehicles: VehicleCardViewModel[];
  technicalInspection: string;
  title: string;
  transmission: string;
  vin: string;
  year: string;
};

export const mockVehicleDetail: VehicleDetailViewModel = {
  bodyType: "Sedan",
  brand: "BMW",
  color: "Black metallic",
  description:
    "Well-kept car with a clean service history and strong equipment package. This is placeholder copy for the vehicle foundation and will be replaced by real listing content once the detail API contract is ready.",
  drive: "xDrive 4x4",
  engine: "3.0 l inline 6",
  fuel: "Diesel",
  id: "bmw-530d-xdrive",
  location: "Vilnius",
  mileage: "48,000 km",
  ownerCount: "1 owner",
  postedAt: "2 hours ago",
  power: "265 hp",
  price: "29,900 EUR",
  priceNote: "Updated today",
  seller: {
    initials: "AK",
    name: "Andrej Klimov",
    type: "Private seller",
  },
  similarVehicles: [
    {
      brand: "BMW",
      fuel: "Diesel",
      href: "/vehicles/bmw-520d-xdrive",
      id: "bmw-520d-xdrive",
      location: "Vilnius",
      mileage: "65,000 km",
      price: "24,500 EUR",
      title: "520d xDrive",
      year: "2021",
    },
    {
      brand: "Mercedes-Benz",
      fuel: "Diesel",
      href: "/vehicles/mercedes-e300d",
      id: "mercedes-e300d",
      location: "Kaunas",
      mileage: "42,000 km",
      price: "34,900 EUR",
      title: "E 300 d 4Matic",
      year: "2022",
    },
    {
      brand: "Audi",
      fuel: "Diesel",
      href: "/vehicles/audi-a6-quattro",
      id: "audi-a6-quattro",
      location: "Vilnius",
      mileage: "58,000 km",
      price: "27,800 EUR",
      title: "A6 3.0 TDI Quattro",
      year: "2021",
    },
  ],
  technicalInspection: "March 2026",
  title: "BMW 5 Series 530d xDrive Luxury",
  transmission: "Automatic",
  vin: "WBA53BJ0XN****8471",
  year: "2022",
};

export const mockVehicleDetails: Record<string, VehicleDetailViewModel> = {
  [mockVehicleDetail.id]: mockVehicleDetail,
};
