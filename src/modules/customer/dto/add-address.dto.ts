import { IsString } from 'class-validator';

export class AddAddressDto {
  @IsString({ message: 'Nome do cliente deve ser uma string' })
  street: string;

  @IsString()
  number: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  complement: string;

  @IsString()
  customerId: string;
}
