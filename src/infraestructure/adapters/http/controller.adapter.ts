import { NextFunction, Request } from "express";
import { UserEntity } from "../../../domain/entities";

export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export interface HttpRequest {
  body: any;
  params: any;
  query: any;
  user?: UserEntity;
  file?: any;
  files?: any;
}
export interface HttpNext {
  next: NextFunction;
}

export interface CustomRequest extends Request {
  user?: UserEntity;
}

export interface Controller {
  handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void>;
}
