import { CreateLawyerUseCase } from "../../../domain";
import { LawyerDatasourceImpl, lawyerRepositoryImpl } from "../../../infraestructure";
import { CreateLawyerController } from "../../controllers/lawyer";

export const makeCreateLawyerController = (): CreateLawyerController => {
  const lawyerDatasource = new LawyerDatasourceImpl();
  const lawyerRepository = new lawyerRepositoryImpl(lawyerDatasource);

  const useCase = new CreateLawyerUseCase(lawyerRepository);

  return new CreateLawyerController(useCase);
};
