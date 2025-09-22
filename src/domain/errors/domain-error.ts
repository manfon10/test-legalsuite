import { v4 as uuid } from "uuid";

export interface AppErrorOptions {
  context?: Record<string, any> | undefined;
  details?: Record<string, any> | undefined;
  cause?: Error;
}

export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  public readonly timestamp?: string;
  public readonly trace_id?: string;
  public readonly context?: Record<string, any> | undefined;
  public readonly details?: Record<string, any> | undefined;

  constructor(message: string, { cause, context, details }: AppErrorOptions) {
    super(message, { cause });

    this.name = this.constructor.name;

    this.timestamp = new Date().toISOString();
    this.trace_id = uuid();
    this.context = context;
    this.details = details;
  }
}
