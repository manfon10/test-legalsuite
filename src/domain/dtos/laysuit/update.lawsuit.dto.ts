import { CreateLawsuitDto } from "./create-lawsuit.dto";

export type UpdateLawsuitDto = Partial<CreateLawsuitDto> & {
  lawyer_id: string;
};
