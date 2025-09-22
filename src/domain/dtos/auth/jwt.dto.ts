export interface SignTokenDto {
  id: string;
}

export interface ExpirationTokenOutput {
  renew: boolean;
  timeRemaining: number;
}
