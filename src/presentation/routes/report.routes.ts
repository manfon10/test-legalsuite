import { Router } from "express";

import { routeAdapter, uuidParamValidator } from "../../infraestructure";

import { makeGetLawyerWithLawsuitsController } from "../factory";
export class ReportRoutes {
  static get routes(): Router {
    const router = Router();

    router.get(
      "/lawyers/:id/lawsuits",
      uuidParamValidator.validate,
      routeAdapter(makeGetLawyerWithLawsuitsController())
    );

    return router;
  }
}
