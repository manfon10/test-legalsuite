import { RefreshTokenUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class RefreshTokenController implements Controller {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { token } = httpRequest.body;

      const refreshToken = await this.refreshTokenUseCase.execute(token);

      return { statusCode: 200, body: refreshToken };
    } catch (error) {
      httpNext(error);
    }
  }
}
