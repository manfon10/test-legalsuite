import { CreateLawsuitUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class CreateLawsuitController implements Controller {
  constructor(private readonly createLawsuitUseCase: CreateLawsuitUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const body = httpRequest.body;

      const lawsuit = await this.createLawsuitUseCase.execute(body);

      return { statusCode: 201, body: lawsuit };
    } catch (error) {
      httpNext(error);
    }
  }
}
