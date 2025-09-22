import { GetAllLawsuitsUseCase } from "../../../domain";
import { LawsuitDatasourceImpl, LawsuitRepositoryImpl } from "../../../infraestructure";
import { GetAllLawsuitsController } from "../../controllers/lawsuit";

export const makeGetAllLawsuitsController = (): GetAllLawsuitsController => {
  const lawsuitDatasource = new LawsuitDatasourceImpl();
  const lawsuitRepository = new LawsuitRepositoryImpl(lawsuitDatasource);

  const useCase = new GetAllLawsuitsUseCase(lawsuitRepository);

  return new GetAllLawsuitsController(useCase);
};
