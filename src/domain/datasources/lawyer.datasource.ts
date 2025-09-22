import { CreateLawyerDto, IGetLawyersParamsDto } from "../dtos";
import { LawyerEntity } from "../entities";
import { PaginatedResponse } from "../interfaces";

export abstract class LawyerDatasource {
  abstract create(data: CreateLawyerDto): Promise<LawyerEntity>;
  abstract findAll(params: IGetLawyersParamsDto): Promise<PaginatedResponse<LawyerEntity>>;
  abstract findOne(id: string): Promise<LawyerEntity>;
}
