import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindTrafficInflationsDto {
  @IsString({ message: 'Chassi deve ser uma string' })
  @IsNotEmpty({ message: 'Chassi não pode ser vazio' })
  chassi: string;

  @IsString({ message: 'Placa do veículo deve ser uma string' })
  @IsNotEmpty({ message: 'Placa do veículo não pode ser vazio' })
  @Transform(({ value }) => value.replace(/[^a-zA-Z0-9]/g, ''), {
    toClassOnly: true,
  })
  vehiclePlate: string;
}
