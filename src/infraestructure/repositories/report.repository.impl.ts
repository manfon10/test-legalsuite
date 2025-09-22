import { LawyerEntity, ReportDatasource, ReportRepository } from "../../domain";

export class ReportRepositoryImpl implements ReportRepository {
  constructor(private readonly datasource: ReportDatasource) {}

  async getLawyerWithLawsuits(lawyer_id: string): Promise<LawyerEntity> {
    return this.datasource.getLawyerWithLawsuits(lawyer_id);
  }
}
