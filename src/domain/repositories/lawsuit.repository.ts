import { CreateLawsuitDto, IGetLawsuitsParamsDto, UpdateLawsuitDto } from "../dtos";
import { LawsuitEntity } from "../entities";
import { PaginatedResponse } from "../interfaces";

export abstract class LawsuitRepository {
  abstract create(data: CreateLawsuitDto): Promise<LawsuitEntity>;
  abstract findAll(params: IGetLawsuitsParamsDto): Promise<PaginatedResponse<LawsuitEntity>>;
  abstract findOne(id: string): Promise<LawsuitEntity>;
  abstract update(id: string, data: UpdateLawsuitDto): Promise<LawsuitEntity>;
}
