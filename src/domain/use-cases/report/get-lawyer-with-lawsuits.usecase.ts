import { LawyerWithLawsuitsEntity } from "../../entities";
import { ReportRepository } from "../../repositories";

export class GetLawayerWithLawsuitsUseCase {
  constructor(private readonly reportRepository: ReportRepository) {}

  async execute(lawyer_id: string): Promise<LawyerWithLawsuitsEntity> {
    const data = await this.reportRepository.getLawyerWithLawsuits(lawyer_id);

    return {
      lawyer: {
        id: data.id,
        name: data.name,
      },
      lawsuits: data.lawsuits || [],
    };
  }
}
