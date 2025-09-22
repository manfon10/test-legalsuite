import { Response, NextFunction } from "express";

import { Controller, CustomRequest, HttpRequest } from "./controller.adapter";

export const routeAdapter = (controller: Controller) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    };

    controller
      .handle(httpRequest, next)
      .then((response) => {
        if (response) {
          res.status(response.statusCode).json({
            statusCode: response.statusCode,
            body: response.body,
          });
        }
      })
      .catch(next);
  };
};
