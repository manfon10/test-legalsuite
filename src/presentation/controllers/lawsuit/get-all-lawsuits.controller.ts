import { GetAllLawsuitsUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class GetAllLawsuitsController implements Controller {
  constructor(private readonly getAllLawsuitsUseCase: GetAllLawsuitsUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { page, limit, lawyer_id, status } = httpRequest.query;

      console.log(page, limit, lawyer_id, status);

      const lawsuits = await this.getAllLawsuitsUseCase.execute({
        limit,
        page,
        lawyer_id,
        status,
      });

      return { statusCode: 200, body: lawsuits };
    } catch (error) {
      httpNext(error);
    }
  }
}
