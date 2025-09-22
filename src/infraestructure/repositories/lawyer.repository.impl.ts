import {
  CreateLawyerDto,
  IGetLawyersParamsDto,
  LawyerDatasource,
  LawyerEntity,
  LawyerRepository,
  PaginatedResponse,
} from "../../domain";

export class lawyerRepositoryImpl implements LawyerRepository {
  constructor(private readonly datasource: LawyerDatasource) {}

  async create(data: CreateLawyerDto): Promise<LawyerEntity> {
    return this.datasource.create(data);
  }

  async findAll(params: IGetLawyersParamsDto): Promise<PaginatedResponse<LawyerEntity>> {
    return this.datasource.findAll(params);
  }

  async findOne(id: string): Promise<LawyerEntity> {
    return this.datasource.findOne(id);
  }
}
