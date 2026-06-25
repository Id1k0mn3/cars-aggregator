export type UserDto = {
  createdAt: number | null;
  email: string;
  id: number;
  name: string;
  status: {
    label: string;
    value: "active" | "inactive" | string;
  };
  updatedAt: number | null;
};

export type User = {
  createdAt: Date | null;
  email: string;
  id: number;
  name: string;
  status: {
    label: string;
    value: string;
  };
  updatedAt: Date | null;
};
