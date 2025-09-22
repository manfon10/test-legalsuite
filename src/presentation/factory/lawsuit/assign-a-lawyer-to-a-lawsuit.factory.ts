import { LawsuitDatasourceImpl, LawsuitRepositoryImpl } from "../../../infraestructure";

import { AssignLawyerToLawsuitUseCase } from "../../../domain";
import { AssignLawyerToLawsuitController } from "../../controllers/lawsuit";

export const makeAssignLawyerToLawsuitController = (): AssignLawyerToLawsuitController => {
  const lawsuitDatasource = new LawsuitDatasourceImpl();
  const lawsuitRepository = new LawsuitRepositoryImpl(lawsuitDatasource);

  const useCase = new AssignLawyerToLawsuitUseCase(lawsuitRepository);

  return new AssignLawyerToLawsuitController(useCase);
};
