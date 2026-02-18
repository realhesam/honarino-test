import { AxiosError } from 'axios';
import { ApiError } from './ApiError';
import { AppError } from './AppError';

export function mapToAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  // Axios error
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<any>;

    return new ApiError(
      axiosError.response?.data?.message || 'خطای ارتباط با سرور',
      axiosError.response?.status,
      error
    );
  }

  // fallback
  return new AppError({
    message: 'خطای ناشناخته‌ای رخ داد',
    code: 'UNKNOWN_ERROR',
    originalError: error,
  });
}