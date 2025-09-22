import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";
import { CreateLawyerUseCase } from "../../../domain";

export class CreateLawyerController implements Controller {
  constructor(private readonly createLawyerUseCase: CreateLawyerUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const body = httpRequest.body;

      const lawyer = await this.createLawyerUseCase.execute(body);

      return { statusCode: 201, body: lawyer };
    } catch (error) {
      httpNext(error);
    }
  }
}
