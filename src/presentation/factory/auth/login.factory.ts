import { LoginUseCase } from "../../../domain";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../../infraestructure";
import { JwtService, PassowrdService } from "../../../infraestructure/services";
import { LoginController } from "../../controllers";

export const makeLoginController = (): LoginController => {
  const userDatasource = new UserDatasourceImpl();
  const userRepository = new UserRepositoryImpl(userDatasource);

  const passwordService = new PassowrdService();

  const jwtService = new JwtService();

  const useCase = new LoginUseCase(userRepository, passwordService, jwtService);

  return new LoginController(useCase);
};
