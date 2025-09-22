export interface IGetLawsuitsParamsDto {
  page: number;
  limit: number;
  where?: Record<string, any>;
}

export interface IGetLawsuitsRequestDto {
  page?: number;
  limit?: number;
  status?: string;
  lawyer_id?: string;
}
