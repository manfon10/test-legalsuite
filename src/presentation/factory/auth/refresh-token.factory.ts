import { RefreshTokenUseCase } from "../../../domain";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../../infraestructure";
import { JwtService } from "../../../infraestructure/services";
import { RefreshTokenController } from "../../controllers";

export const makeRefreshTokenController = (): RefreshTokenController => {
  const userDatasource = new UserDatasourceImpl();
  const userRepository = new UserRepositoryImpl(userDatasource);

  const jwtService = new JwtService();

  const useCase = new RefreshTokenUseCase(userRepository, jwtService);

  return new RefreshTokenController(useCase);
};
