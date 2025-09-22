import { CreateLawyerDto } from "../../dtos";
import { LawyerEntity } from "../../entities";
import { LawyerRepository } from "../../repositories";

export class CreateLawyerUseCase {
  constructor(private readonly lawyerRepository: LawyerRepository) {}

  async execute(data: CreateLawyerDto): Promise<LawyerEntity> {
    return this.lawyerRepository.create(data);
  }
}
