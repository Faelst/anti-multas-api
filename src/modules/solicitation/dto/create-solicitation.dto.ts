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
}

export class CreateSolicitationDto {
  @IsString()
  customerId: string;

  infractions: InflationsDto[];
}
