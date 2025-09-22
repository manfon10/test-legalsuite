import { NextFunction, Response, Request } from "express";
import { validationResult, ValidationChain } from "express-validator";

import { ValidationError } from "../../../domain";

export class ValidatorMiddleware {
  constructor(public validations: ValidationChain[]) {}

  validate = async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(this.validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    throw new ValidationError({
      errors: errors.array().map((err) => ({
        field: err.type,
        message: err.msg,
      })),
    });
  };
}
