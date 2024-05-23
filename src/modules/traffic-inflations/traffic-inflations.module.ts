import { Module } from '@nestjs/common';
import { TrafficInflationsController } from './traffic-inflations.controller';
import { CacheRedisModule } from '../../common/redis-cache/redis-cache.module';
import { InfoSimplesModule } from '../../common/services/info-simples-api/info-simples.module';
import { TrafficInflationsService } from './traffic-inflations.service';
import { FindTrafficInflationUseCase } from './use-cases/find-traffic-inflation.usecase';

@Module({
  imports: [InfoSimplesModule, CacheRedisModule],
  controllers: [TrafficInflationsController],
  providers: [TrafficInflationsService, FindTrafficInflationUseCase],
})
export class TrafficInflationsModule {}
