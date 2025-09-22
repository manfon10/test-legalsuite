import { LawyerEntity } from "./lawyer.entity";

export class LawsuitEntity {
  constructor(
    public id: string,
    public case_number: string,
    public plaintiff: string,
    public defendant: string,
    public case_type: string,
    public status: string,
    public lawyer: LawyerEntity | null
  ) {}

  static fromObject(object: { [key: string]: any }): LawsuitEntity {
    const { id, case_number, plaintiff, defendant, case_type, status, lawyer } = object;

    return new LawsuitEntity(id, case_number, plaintiff, defendant, case_type, status, lawyer);
  }
}
