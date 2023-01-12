import createAxios, { isAxiosError, AxiosError } from "axios";

export interface IDefaultApiResponse {
  message: string;
}

export interface IApiException {
  message: string;
  code: number;
}

export const api = createAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function apiException(error: Error): IApiException {
  if (!isAxiosError(error)) {
    const message = error?.message ?? "Unknown error";

    return {
      message: `Client error: ${message}`,
      code: 0,
    };
  }

  const axiosError = error as AxiosError<IDefaultApiResponse>;

  const message = axiosError.response?.data?.message ?? "Unknown error";
  const code = axiosError.response?.status ?? 0;

  return {
    message,
    code,
  };
}
