import { GetAllLawyersUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class GetAllLawyersController implements Controller {
  constructor(private readonly getAllLawyersUseCase: GetAllLawyersUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { page, limit } = httpRequest.query;

      const lawyers = await this.getAllLawyersUseCase.execute({
        limit,
        page,
      });

      return { statusCode: 200, body: lawyers };
    } catch (error) {
      httpNext(error);
    }
  }
}
