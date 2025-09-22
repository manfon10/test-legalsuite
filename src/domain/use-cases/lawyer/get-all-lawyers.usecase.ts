import { IGetLawyersParamsDto } from "../../dtos";
import { LawyerEntity } from "../../entities";
import { PaginatedResponse } from "../../interfaces";
import { LawyerRepository } from "../../repositories";

export class GetAllLawyersUseCase {
  constructor(private readonly lawyerRepository: LawyerRepository) {}

  async execute({
    limit = 10,
    page = 1,
  }: IGetLawyersParamsDto): Promise<PaginatedResponse<LawyerEntity>> {
    return this.lawyerRepository.findAll({ limit, page });
  }
}
