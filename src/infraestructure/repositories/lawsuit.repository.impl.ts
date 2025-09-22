import {
  CreateLawsuitDto,
  IGetLawsuitsParamsDto,
  PaginatedResponse,
  LawsuitDatasource,
  LawsuitRepository,
  LawsuitEntity,
  UpdateLawsuitDto,
} from "../../domain";

export class LawsuitRepositoryImpl implements LawsuitRepository {
  constructor(private readonly datasource: LawsuitDatasource) {}

  async create(data: CreateLawsuitDto): Promise<LawsuitEntity> {
    return this.datasource.create(data);
  }

  async findAll(params: IGetLawsuitsParamsDto): Promise<PaginatedResponse<LawsuitEntity>> {
    return this.datasource.findAll(params);
  }

  async findOne(id: string): Promise<LawsuitEntity> {
    return this.datasource.findOne(id);
  }

  async update(id: string, data: UpdateLawsuitDto): Promise<LawsuitEntity> {
    return this.datasource.update(id, data);
  }
}
