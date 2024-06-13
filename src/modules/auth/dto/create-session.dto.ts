import { IsEmail, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString({ message: 'Nome do cliente deve ser uma string' })
  @IsEmail({}, { message: 'Email do cliente deve ser um email válido' })
  email: string;

  @IsString({ message: 'Senha do cliente deve ser uma string' })
  password: string;
}
