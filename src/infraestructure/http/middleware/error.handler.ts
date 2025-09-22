import { Response, Request, NextFunction } from "express";

import { AppError } from "../../../domain/errors";

import { envs, logger } from "../../config";

export class ErrorHandler {
  static handle(error: Error, req: Request, res: Response, _next: NextFunction) {
    const logContext = {
      url: req.url,
      method: req.method,
    };

    if (error instanceof AppError) {
      logger.warn("App error occurred", {
        ...logContext,
        error: error.message,
        code: error.code,
      });

      return res.status(error.statusCode).json({
        success: false,
        code: error.code,
        message: error.message,
        trace_id: error.trace_id,
        ...(process.env.NODE_ENV === "development" && {
          context: error.context,
          details: error.details,
          stack: error.stack,
        }),
      });
    }

    // Errores de validación (joi, zod, etc.)
    // if (error instanceof ValidationError) {
    //   logger.warn('Validation error', { ...logContext, error: error.message });
    //   return res.status(400).json({
    //     success: false,
    //     code: 'VALIDATION_ERROR',
    //     message: 'Invalid input data',
    //     errors: error.details,
    //     errorId
    //   });
    // }

    logger.error("Unhandled error", { ...logContext, error: error.stack });

    return res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      ...(envs.NODE_ENV === "development" && {
        details: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      }),
    });
  }
}
