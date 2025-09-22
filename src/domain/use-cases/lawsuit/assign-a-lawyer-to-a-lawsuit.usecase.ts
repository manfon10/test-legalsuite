import { UpdateLawsuitDto } from "../../dtos";
import { LawsuitEntity } from "../../entities";
import { LawsuitRepository } from "../../repositories";

export class AssignLawyerToLawsuitUseCase {
  constructor(private readonly lawsuitRepository: LawsuitRepository) {}

  async execute(id: string, data: UpdateLawsuitDto): Promise<LawsuitEntity> {
    return this.lawsuitRepository.update(id, data);
  }
}
