import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";
import { GetLawyerUseCase } from "../../../domain";

export class GetLawyerController implements Controller {
  constructor(private readonly getLawyerUseCase: GetLawyerUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const lawyer = await this.getLawyerUseCase.execute(id);

      return { statusCode: 200, body: lawyer };
    } catch (error) {
      httpNext(error);
    }
  }
}
