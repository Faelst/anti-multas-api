import { PartialType } from '@nestjs/mapped-types';
import { CreateTrafficInflationDto } from './create-traffic-inflation.dto';

export class UpdateTrafficInflationDto extends PartialType(CreateTrafficInflationDto) {}
