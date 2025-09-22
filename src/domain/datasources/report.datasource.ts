import { LawyerEntity } from "../entities";

export abstract class ReportDatasource {
  abstract getLawyerWithLawsuits(lawyer_id: string): Promise<LawyerEntity>;
}
