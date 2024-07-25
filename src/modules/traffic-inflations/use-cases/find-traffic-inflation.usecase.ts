import { Injectable } from '@nestjs/common';
import { InfoSimplesService } from '../../../common/services/info-simples-api/info-simples.service';

@Injectable()
export class FindTrafficInflationUseCase {
  constructor(private readonly infoSimplesService: InfoSimplesService) {}

  async execute({ chassi, vehiclePlate }) {
    const { data } = await this.infoSimplesService.getTrafficInflations({
      chassi,
      vehiclePlate,
    });

    return data;
  }
}
