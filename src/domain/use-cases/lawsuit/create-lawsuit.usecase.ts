import { CreateLawsuitDto } from "../../dtos";
import { LawsuitEntity } from "../../entities";
import { LawsuitRepository } from "../../repositories";

export class CreateLawsuitUseCase {
  constructor(private readonly lawsuitRepository: LawsuitRepository) {}

  async execute(data: CreateLawsuitDto): Promise<LawsuitEntity> {
    return this.lawsuitRepository.create(data);
  }
}
