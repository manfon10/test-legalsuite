import { GetLawyerUseCase } from "../../../domain";
import { LawyerDatasourceImpl, lawyerRepositoryImpl } from "../../../infraestructure";
import { GetLawyerController } from "../../controllers/lawyer";

export const makeGetLawyerController = (): GetLawyerController => {
  const lawyerDatasource = new LawyerDatasourceImpl();
  const lawyerRepository = new lawyerRepositoryImpl(lawyerDatasource);

  const useCase = new GetLawyerUseCase(lawyerRepository);

  return new GetLawyerController(useCase);
};
