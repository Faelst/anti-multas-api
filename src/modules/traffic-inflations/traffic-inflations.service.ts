import { Injectable } from '@nestjs/common';
import { FindTrafficInflationsDto } from './dto/find-traffic-inflations.dto';
import { RedisCacheRepository } from '../../common/redis-cache/redis-cache.repository';
import { FindTrafficInflationUseCase } from './use-cases/find-traffic-inflation.usecase';

@Injectable()
export class TrafficInflationsService {
  constructor(
    private readonly redisCacheRepository: RedisCacheRepository,
    private readonly findTrafficInflationUseCase: FindTrafficInflationUseCase,
  ) {}

  async findTrafficInflation({
    chassi,
    vehiclePlate,
  }: FindTrafficInflationsDto) {
    const trafficInflation = await this.redisCacheRepository.getData(
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

    await this.redisCacheRepository.saveData(
      trafficInflationsRepository,
      `traffic-inflation:${chassi}:${vehiclePlate}`,
    );

    return trafficInflationsRepository;
  }
}
