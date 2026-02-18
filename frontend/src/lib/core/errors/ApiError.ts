import { AppError } from './AppError';

export class ApiError extends AppError {
  constructor(message: string, status?: number, originalError?: unknown) {
    super({
      message,
      code: 'API_ERROR',
      status,
      originalError,
    });
  }
}