import { FindOptions } from "sequelize";
import {
  CreateLawsuitDto,
  IGetLawsuitsParamsDto,
  PaginatedResponse,
  LawsuitDatasource,
  BadRequestError,
  LawsuitEntity,
  UpdateLawsuitDto,
} from "../../domain";

import Lawsuit from "../database/models/lawsuit.model";
import Lawyer from "../database/models/lawyer.model";

import { Paginator } from "../adapters";

export class LawsuitDatasourceImpl implements LawsuitDatasource {
  private paginator: Paginator<Lawsuit>;

  constructor() {
    this.paginator = new Paginator(Lawsuit);
  }

  async create(data: CreateLawsuitDto): Promise<LawsuitEntity> {
    const lawsuit = await Lawsuit.create(data);

    return this.findOne(lawsuit.id);
  }

  async findAll({
    limit,
    page,
    where,
  }: IGetLawsuitsParamsDto): Promise<PaginatedResponse<LawsuitEntity>> {
    const optionsQuery: FindOptions = {
      attributes: ["id", "case_number", "plaintiff", "defendant", "case_type", "status"],
      include: [
        {
          as: "lawyer",
          attributes: ["id", "name", "email", "phone", "specialization", "status"],
          model: Lawyer,
        },
      ],
      where,
    };

    const paginatedResult = await this.paginator.paginate({
      options: optionsQuery,
      page,
      limit,
    });

    const data = paginatedResult.data.map(LawsuitEntity.fromObject);

    return {
      ...paginatedResult,
      data,
    };
  }

  async findOne(id: string): Promise<LawsuitEntity> {
    const lawsuit = await Lawsuit.findOne({
      attributes: ["id", "case_number", "plaintiff", "defendant", "case_type", "status"],
      include: [
        {
          as: "lawyer",
          attributes: ["id", "name", "email", "phone", "specialization", "status"],
          model: Lawyer,
        },
      ],
      where: { id },
    });

    if (!lawsuit) {
      throw new BadRequestError("No existe la demanda.", {
        context: { useCase: "lawsuit_find", operation: "execute" },
        details: { lawsuit_id: id },
      });
    }

    return LawsuitEntity.fromObject(lawsuit);
  }

  async update(id: string, data: UpdateLawsuitDto): Promise<LawsuitEntity> {
    const [affectedCount, updatedRows] = await Lawsuit.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0 || !updatedRows || updatedRows.length === 0) {
      throw new BadRequestError("No se encontró la demanda a actualizar.", {
        context: { operation: "lawsuit_update" },
        details: { id, fields: Object.keys(data) },
      });
    }

    const lawsuit = await this.findOne(id);

    return LawsuitEntity.fromObject(lawsuit);
  }
}
