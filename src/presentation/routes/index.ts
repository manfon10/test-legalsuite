import { Router } from "express";

import { AuthRoutes } from "./auth.routes";
import { LawsuitRoutes } from "./lawsuit.routes";
import { LawyerRoutes } from "./lawyer.routes";
import { ReportRoutes } from "./report.routes";
import { authAdapter } from "../../infraestructure";

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);

    router.use(authAdapter.verifyToken);

    router.use("/lawsuits", LawsuitRoutes.routes);
    router.use("/lawyers", LawyerRoutes.routes);
    router.use("/reports", ReportRoutes.routes);

    return router;
  }
}
