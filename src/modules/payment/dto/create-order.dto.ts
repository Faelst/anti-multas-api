import { IsNumber, IsString } from 'class-validator';

export class CreditCard {
  @IsNumber()
  installments: number;

  @IsString()
  number: string;

  @IsString()
  holderName: string;

  @IsNumber()
  expMonth: number;

  @IsNumber()
  expYear: number;

  @IsNumber()
  cvv: number;
}

export class CreateOrderDto {
  creditCard: CreditCard;

  @IsString()
  solicitationId: string;
}
