import { isApiClientError, isApiValidationError } from "@/src/shared/api";

export type AuthFieldErrors<TField extends string> = Partial<Record<TField, string[]>>;

type AuthFormErrorResult<TField extends string> = {
  fieldErrors: AuthFieldErrors<TField>;
  generalError: string | null;
};

const DEFAULT_AUTH_ERROR_MESSAGE = "Authentication request failed. Please try again.";

export const getAuthFormErrors = <TField extends string>(
  error: unknown,
  fields: readonly TField[],
): AuthFormErrorResult<TField> => {
  if (isApiValidationError(error)) {
    const fieldSet = new Set<string>(fields);
    const fieldErrors: AuthFieldErrors<TField> = {};

    Object.entries(error.payload.errors).forEach(([field, messages]) => {
      if (fieldSet.has(field)) {
        fieldErrors[field as TField] = messages;
      }
    });

    return {
      fieldErrors,
      generalError: Object.keys(fieldErrors).length > 0 ? null : error.payload.message,
    };
  }

  if (isApiClientError(error)) {
    return {
      fieldErrors: {},
      generalError: error.payload?.message ?? error.message,
    };
  }

  return {
    fieldErrors: {},
    generalError: DEFAULT_AUTH_ERROR_MESSAGE,
  };
};
