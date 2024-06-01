import { Injectable } from '@nestjs/common';
import { FindTrafficInflationsDto } from './dto/find-traffic-inflations.dto';
import { CacheRepository } from '../../common/cache/cache.repository';
import { FindTrafficInflationUseCase } from './use-cases/find-traffic-inflation.usecase';

@Injectable()
export class TrafficInflationsService {
  constructor(
    private readonly cacheRepository: CacheRepository,
    private readonly findTrafficInflationUseCase: FindTrafficInflationUseCase,
  ) {}

  async findTrafficInflation({
    chassi,
    vehiclePlate,
  }: FindTrafficInflationsDto) {
    const trafficInflation = await this.cacheRepository.getData(
      `traffic-inflation:${chassi}:${vehiclePlate}`,
    );

    if (trafficInflation) {
      return trafficInflation;
    }

    const trafficInflationsRepository =
      await this.findTrafficInflationUseCase.execute({
        chassi,
        vehiclePlate,
      });

    await this.cacheRepository.saveData(
      trafficInflationsRepository,
      `traffic-inflation:${chassi}:${vehiclePlate}`,
    );

    return trafficInflationsRepository;
  }
}
