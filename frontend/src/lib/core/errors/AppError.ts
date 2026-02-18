export class AppError extends Error {
  code: string;
  status?: number;
  originalError?: unknown;

  constructor(params: {
    message: string;
    code: string;
    status?: number;
    originalError?: unknown;
  }) {
    super(params.message);
    this.code = params.code;
    this.status = params.status;
    this.originalError = params.originalError;
  }
}