import { AppError, AppErrorOptions } from "./domain-error";

export class BadRequestError extends AppError {
  readonly code = "BAD_REQUEST";
  readonly statusCode = 400;

  constructor(message = "Bad request", options: AppErrorOptions) {
    super(message, options);
  }
}

export class UnauthorizedError extends AppError {
  readonly code = "UNAUTHORIZED";
  readonly statusCode = 401;

  constructor(message = "Unauthorized", options: AppErrorOptions) {
    super(message, options);
  }
}

export class ForbiddenError extends AppError {
  readonly code = "FORBIDDEN";
  readonly statusCode = 403;

  constructor(message = "Forbidden", options: AppErrorOptions) {
    super(message, options);
  }
}

export class NotFoundError extends AppError {
  readonly code = "NOT_FOUND";
  readonly statusCode = 404;

  constructor(message = "Not found", options: AppErrorOptions) {
    super(message, options);
  }
}

export class ConflictError extends AppError {
  readonly code = "CONFLICT";
  readonly statusCode = 409;

  constructor(message = "Conflict", options: AppErrorOptions) {
    super(message, options);
  }
}

export class InternalServerError extends AppError {
  readonly code = "INTERNAL_SERVER_ERROR";
  readonly statusCode = 500;

  constructor(message = "Internal server error", options: AppErrorOptions) {
    super(message, options);
  }
}
