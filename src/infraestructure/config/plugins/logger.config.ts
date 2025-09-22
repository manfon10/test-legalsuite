import winston from "winston";

const logFormat = winston.format.printf(({ timestamp, level, message, context, details }) => {
  return `${timestamp} ${level}: ${message} context: ${JSON.stringify(
    context
  )} detailts: ${JSON.stringify(details)}`;
});

export class Logger {
  private winston: winston.Logger;

  constructor() {
    this.winston = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "info.log", level: "info" }),
        new winston.transports.File({ filename: "combined.log" }),
        ...(process.env.NODE_ENV !== "production"
          ? [
              new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), logFormat),
              }),
            ]
          : []),
      ],
    });
  }

  info(message: string, context?: Record<string, any>) {
    this.winston.info(message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.winston.error(message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.winston.warn(message, context);
  }
}

export const logger = new Logger();
