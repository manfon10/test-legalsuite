import { LawsuitEntity } from "./lawsuit.entity";
import { LawyerEntity } from "./lawyer.entity";

export class LawyerWithLawsuitsEntity {
  constructor(public lawyer: LawyerEntity, public lawsuits: LawsuitEntity[]) {}

  static fromObject(object: { [key: string]: any }): LawyerWithLawsuitsEntity {
    const { lawyer, lawsuits } = object;

    return new LawyerWithLawsuitsEntity(lawyer, lawsuits);
  }
}
