import { GetAllLawyersUseCase } from "../../../domain";
import { LawyerDatasourceImpl, lawyerRepositoryImpl } from "../../../infraestructure";
import { GetAllLawyersController } from "../../controllers/lawyer";

export const makeGetAllLawyersController = (): GetAllLawyersController => {
  const lawyerDatasource = new LawyerDatasourceImpl();
  const lawyerRepository = new lawyerRepositoryImpl(lawyerDatasource);

  const useCase = new GetAllLawyersUseCase(lawyerRepository);

  return new GetAllLawyersController(useCase);
};
