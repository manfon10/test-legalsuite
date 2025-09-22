import { AssignLawyerToLawsuitUseCase, CreateLawsuitUseCase } from "../../../domain";
import { Controller, HttpNext, HttpRequest, HttpResponse } from "../../../infraestructure";

export class AssignLawyerToLawsuitController implements Controller {
  constructor(private readonly assignLawyerToLawsuitUseCase: AssignLawyerToLawsuitUseCase) {}

  async handle(httpRequest: HttpRequest, httpNext: HttpNext["next"]): Promise<HttpResponse | void> {
    try {
      const { id } = httpRequest.params;

      const body = httpRequest.body;

      const lawsuit = await this.assignLawyerToLawsuitUseCase.execute(id, body);

      return { statusCode: 201, body: lawsuit };
    } catch (error) {
      httpNext(error);
    }
  }
}
