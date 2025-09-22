import { LawsuitDatasourceImpl, LawsuitRepositoryImpl } from "../../../infraestructure";

import { CreateLawsuitUseCase } from "../../../domain";
import { CreateLawsuitController } from "../../controllers/lawsuit";

export const makeCreateLawsuitController = (): CreateLawsuitController => {
  const lawsuitDatasource = new LawsuitDatasourceImpl();
  const lawsuitRepository = new LawsuitRepositoryImpl(lawsuitDatasource);

  const useCase = new CreateLawsuitUseCase(lawsuitRepository);

  return new CreateLawsuitController(useCase);
};
