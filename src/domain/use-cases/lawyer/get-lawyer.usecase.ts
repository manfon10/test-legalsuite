import { LawyerEntity } from "../../entities";
import { LawyerRepository } from "../../repositories";

export class GetLawyerUseCase {
  constructor(private readonly lawyerRepository: LawyerRepository) {}

  async execute(id: string): Promise<LawyerEntity> {
    return this.lawyerRepository.findOne(id);
  }
}
