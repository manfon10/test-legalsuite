import { LawsuitEntity } from "./lawsuit.entity";

export class LawyerEntity {
  constructor(
    public id: string,
    public name: string,
    public email?: string,
    public phone?: string,
    public specialization?: string,
    public status?: string,
    public lawsuits?: LawsuitEntity[]
  ) {}

  static fromObject(object: { [key: string]: any }): LawyerEntity {
    const { id, name, email, phone, specialization, status, lawsuits } = object;

    return new LawyerEntity(id, name, email, phone, specialization, status, lawsuits);
  }
}
