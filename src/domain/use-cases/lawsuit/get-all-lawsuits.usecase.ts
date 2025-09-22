import { IGetLawsuitsRequestDto } from "../../dtos";
import { LawsuitEntity } from "../../entities";
import { PaginatedResponse } from "../../interfaces";
import { LawsuitRepository } from "../../repositories";

export class GetAllLawsuitsUseCase {
  constructor(private readonly lawsuitRepository: LawsuitRepository) {}

  async execute({
    limit = 10,
    page = 1,
    ...filters
  }: IGetLawsuitsRequestDto): Promise<PaginatedResponse<LawsuitEntity>> {
    const where: Record<string, any> = {};

    if (filters) {
      if (filters.lawyer_id) {
        Object.assign(where, {
          lawyer_id: filters.lawyer_id,
        });
      }

      if (filters.status) {
        Object.assign(where, {
          status: filters.status,
        });
      }
    }

    console.log(where);

    return this.lawsuitRepository.findAll({ limit, page, where });
  }
}
