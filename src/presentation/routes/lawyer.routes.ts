import { Router } from "express";

import { createLawyerValidator, routeAdapter, uuidParamValidator } from "../../infraestructure";

import {
  makeCreateLawyerController,
  makeGetAllLawyersController,
  makeGetLawyerController,
} from "../factory";

export class LawyerRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", routeAdapter(makeGetAllLawyersController()));

    router.get("/:id", uuidParamValidator.validate, routeAdapter(makeGetLawyerController()));

    router.post("/", createLawyerValidator.validate, routeAdapter(makeCreateLawyerController()));

    return router;
  }
}
