import { Controller, Get, Query } from '@nestjs/common';
import { TrafficInflationsService } from './traffic-inflations.service';
import { FindTrafficInflationsDto } from './dto/find-traffic-inflations.dto';

@Controller('traffic-inflations')
export class TrafficInflationsController {
  constructor(
    private readonly trafficInflationsService: TrafficInflationsService,
  ) {}

  @Get('')
  findTrafficInflation(
    @Query() { chassi, vehiclePlate }: FindTrafficInflationsDto,
  ) {
    return this.trafficInflationsService.findTrafficInflation({
      chassi,
      vehiclePlate,
    });
  }
}
