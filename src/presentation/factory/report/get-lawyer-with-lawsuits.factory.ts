import { GetLawayerWithLawsuitsUseCase } from "../../../domain";
import { ReportDatasourceImpl, ReportRepositoryImpl } from "../../../infraestructure";
import { GetLawyerwithLawsuitsController } from "../../controllers/report";

export const makeGetLawyerWithLawsuitsController = (): GetLawyerwithLawsuitsController => {
  const reportDatasource = new ReportDatasourceImpl();
  const reportRepository = new ReportRepositoryImpl(reportDatasource);

  const useCase = new GetLawayerWithLawsuitsUseCase(reportRepository);

  return new GetLawyerwithLawsuitsController(useCase);
};
