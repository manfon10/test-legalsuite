import { LawyerEntity } from "../entities";

export abstract class ReportRepository {
  abstract getLawyerWithLawsuits(lawyer_id: string): Promise<LawyerEntity>;
}
