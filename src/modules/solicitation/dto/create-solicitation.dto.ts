import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class InflationsDto {
  @IsNumber()
  simpleAmount: number;

  @IsNumber()
  especialAmount: number;

  @IsNumber()
  inflationAmount: number;

  @IsNumber()
  paymentAmount: number;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  vehiclePlate: string;

  @IsString()
  chassis: string;

  @IsDateString()
  date: Date;

  @IsString()
  hour: string;

  @IsString()
  dateInclude: Date;

  @IsString()
  defenseDate: Date;

  @IsString()
  situation: string;

  @IsString()
  code: string;

  @IsOptional()
  vehicleOwner?: string;

  @IsOptional()
  recurseType: string;

  @IsOptional()
  ait: string;

  @IsOptional()
  orgao: string;

  @IsOptional()
  processamento: string;

  @IsOptional()
  location: string;
}

export class CreateSolicitationDto {
  @IsString()
  customerId: string;

  indicator?: string;

  infractions: InflationsDto[];
}
