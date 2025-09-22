import { Router } from "express";

import {
  assignLawsuitToLawyerValidator,
  createLawsuitValidator,
  routeAdapter,
  uuidParamValidator,
} from "../../infraestructure";

import {
  makeAssignLawyerToLawsuitController,
  makeCreateLawsuitController,
  makeGetAllLawsuitsController,
} from "../factory";

export class LawsuitRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", routeAdapter(makeGetAllLawsuitsController()));

    router.post("/", createLawsuitValidator.validate, routeAdapter(makeCreateLawsuitController()));

    router.put(
      "/:id/assign",
      uuidParamValidator.validate,
      assignLawsuitToLawyerValidator.validate,
      routeAdapter(makeAssignLawyerToLawsuitController())
    );

    return router;
  }
}
