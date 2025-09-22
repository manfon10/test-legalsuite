import { BadRequestError, LawyerEntity, ReportDatasource } from "../../domain";

import Lawsuit from "../database/models/lawsuit.model";
import Lawyer from "../database/models/lawyer.model";

export class ReportDatasourceImpl implements ReportDatasource {
  async getLawyerWithLawsuits(lawyer_id: string): Promise<LawyerEntity> {
    const lawyer = await Lawyer.findOne({
      attributes: ["id", "name", "email", "phone", "specialization", "status"],
      include: [
        {
          as: "lawsuits",
          attributes: ["id", "case_number", "plaintiff", "defendant", "case_type", "status"],
          model: Lawsuit,
        },
      ],
      where: { id: lawyer_id },
    });

    if (!lawyer) {
      throw new BadRequestError("No existe el abogado.", {
        context: { useCase: "GetLawyerWithLawsuits", operation: "execute" },
        details: { lawyer_id },
      });
    }

    return LawyerEntity.fromObject(lawyer);
  }
}
