import { Module } from '@nestjs/common';
import { TrafficInflationsController } from './traffic-inflations.controller';

import { InfoSimplesModule } from '../../common/services/info-simples-api/info-simples.module';
import { TrafficInflationsService } from './traffic-inflations.service';
import { FindTrafficInflationUseCase } from './use-cases/find-traffic-inflation.usecase';
import { CacheModule } from '../../common/cache/cache.module';

@Module({
  imports: [InfoSimplesModule, CacheModule],
  controllers: [TrafficInflationsController],
  providers: [TrafficInflationsService, FindTrafficInflationUseCase],
})
export class TrafficInflationsModule {}
