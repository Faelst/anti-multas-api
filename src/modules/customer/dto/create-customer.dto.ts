import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Nome do cliente deve ser uma string' })
  name: string;

  @IsString({ message: 'CPF do cliente deve ser uma string' })
  cpf: string;

  @IsString({ message: 'Telefone do cliente deve ser uma string' })
  phone: string;
}
