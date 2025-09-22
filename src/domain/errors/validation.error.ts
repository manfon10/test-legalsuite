import { AppError } from "./domain-error";

export class ValidationError extends AppError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 400;

  constructor(details: Record<string, any>) {
    super("Errores de validación en la petición.", { details });
  }
}
