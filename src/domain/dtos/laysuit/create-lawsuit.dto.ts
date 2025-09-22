export interface CreateLawsuitDto {
  case_number: string;
  plaintiff: string;
  defendant: string;
  case_type: string;
  status: string;
}
