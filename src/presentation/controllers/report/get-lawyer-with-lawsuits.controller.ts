import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";
import { GetLawayerWithLawsuitsUseCase } from "../../../domain";

export class GetLawyerwithLawsuitsController implements Controller {
  constructor(private readonly getLawayerWithLawsuitsUseCase: GetLawayerWithLawsuitsUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const lawyer = await this.getLawayerWithLawsuitsUseCase.execute(id);

      return { statusCode: 200, body: lawyer };
    } catch (error) {
      httpNext(error);
    }
  }
}
