import { mapUserDtoToUser, type User, type UserDto } from "@/src/entities/user";
import { apiRequest } from "@/src/shared/api";

export type RegisterRequestDto = {
  device_name?: string;
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

export type LoginRequestDto = {
  device_name?: string;
  email: string;
  password: string;
};

export type AuthResponseDto = {
  token: string;
  tokenType: "Bearer";
  user: UserDto;
};

export type AuthResult = {
  token: string;
  tokenType: "Bearer";
  user: User;
};

const mapAuthResponseDtoToResult = (dto: AuthResponseDto): AuthResult => {
  return {
    token: dto.token,
    tokenType: dto.tokenType,
    user: mapUserDtoToUser(dto.user),
  };
};

export const registerUser = async (requestDto: RegisterRequestDto): Promise<AuthResult> => {
  const response = await apiRequest<AuthResponseDto>("/auth/register", {
    json: requestDto,
    method: "POST",
  });

  return mapAuthResponseDtoToResult(response);
};

export const loginUser = async (requestDto: LoginRequestDto): Promise<AuthResult> => {
  const response = await apiRequest<AuthResponseDto>("/auth/login", {
    json: requestDto,
    method: "POST",
  });

  return mapAuthResponseDtoToResult(response);
};

export const getCurrentUser = async (authToken: string): Promise<User> => {
  const response = await apiRequest<UserDto>("/auth/me", {
    authToken,
    cache: "no-store",
  });

  return mapUserDtoToUser(response);
};

export const logoutUser = async (authToken: string): Promise<void> => {
  await apiRequest<void>("/auth/logout", {
    authToken,
    cache: "no-store",
    method: "POST",
  });
};
