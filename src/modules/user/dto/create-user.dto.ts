import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome não pode ser vazio' })
  firstName: string;

  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome não pode ser vazio' })
  lastName: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazio' })
  password: string;
}
