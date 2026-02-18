import { ZodError } from "zod";
import { AppError } from "./AppError";

export function mapZodErrorToAppError(err: ZodError): AppError {
  const firstIssue = err.issues[0];

  return new AppError({
    message: firstIssue?.message || "اطلاعات وارد شده نامعتبر است",
    code: "VALIDATION_ERROR",
    status: 400,
  });
}
