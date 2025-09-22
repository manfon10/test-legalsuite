import { LoginUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class LoginController implements Controller {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { username, password } = httpRequest.body;

      const loginData = await this.loginUseCase.execute(username, password);

      return { statusCode: 200, body: loginData };
    } catch (error) {
      httpNext(error);
    }
  }
}
