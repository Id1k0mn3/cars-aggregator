import type { User, UserDto } from "./types";

const mapTimestampToDate = (timestamp: number | null) => {
  return timestamp === null ? null : new Date(timestamp * 1000);
};

export const mapUserDtoToUser = (dto: UserDto): User => {
  return {
    createdAt: mapTimestampToDate(dto.createdAt),
    email: dto.email,
    id: dto.id,
    name: dto.name,
    status: {
      label: dto.status.label,
      value: dto.status.value,
    },
    updatedAt: mapTimestampToDate(dto.updatedAt),
  };
};
