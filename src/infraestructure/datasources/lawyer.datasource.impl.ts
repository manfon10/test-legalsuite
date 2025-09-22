import { FindOptions } from "sequelize";
import {
  BadRequestError,
  CreateLawyerDto,
  IGetLawyersParamsDto,
  LawyerDatasource,
  LawyerEntity,
  PaginatedResponse,
} from "../../domain";

import { Paginator } from "../adapters";

import Lawyer from "../database/models/lawyer.model";
import Lawsuit from "../database/models/lawsuit.model";

export class LawyerDatasourceImpl implements LawyerDatasource {
  private paginator: Paginator<Lawyer>;

  constructor() {
    this.paginator = new Paginator(Lawyer);
  }

  async create(data: CreateLawyerDto): Promise<LawyerEntity> {
    const lawyer = await Lawyer.create(data);

    return this.findOne(lawyer.id);
  }

  async findAll({ limit, page }: IGetLawyersParamsDto): Promise<PaginatedResponse<LawyerEntity>> {
    const optionsQuery: FindOptions = {
      attributes: ["id", "name", "email", "phone", "specialization", "status"],
      include: [
        {
          as: "lawsuits",
          attributes: ["id", "case_number", "plaintiff", "defendant", "case_type", "status"],
          model: Lawsuit,
        },
      ],
    };

    const paginatedResult = await this.paginator.paginate({
      options: optionsQuery,
      page,
      limit,
    });

    const data = paginatedResult.data.map(LawyerEntity.fromObject);

    return {
      ...paginatedResult,
      data,
    };
  }

  async findOne(id: string): Promise<LawyerEntity> {
    const lawyer = await Lawyer.findOne({
      attributes: ["id", "name", "email", "phone", "specialization", "status"],
      include: [
        {
          as: "lawsuits",
          attributes: ["id", "case_number", "plaintiff", "defendant", "case_type", "status"],
          model: Lawsuit,
        },
      ],
    });

    if (!lawyer) {
      throw new BadRequestError("No existe el abogado.", {
        context: { useCase: "FindLawyerUseCase", operation: "execute" },
        details: { lawyer_id: id },
      });
    }

    return LawyerEntity.fromObject(lawyer);
  }
}
