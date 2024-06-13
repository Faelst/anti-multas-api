import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Nome do cliente deve ser uma string' })
  name: string;

  @IsString({ message: 'CPF do cliente deve ser uma string' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cpf: string;

  @IsString({ message: 'Telefone do cliente deve ser uma string' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  phone: string;

  @IsOptional()
  @IsString({ message: 'RG do cliente deve ser uma string' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  rg?: string;

  @IsOptional()
  @IsString({ message: 'Email do cliente deve ser uma string' })
  email?: string;

  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  expeditorRg?: string;

  @IsOptional()
  occupation?: string;

  @IsOptional()
  cnhNumber?: string;

  @IsOptional()
  cnhUf?: string;

  @IsOptional()
  civilState?: string;
}
