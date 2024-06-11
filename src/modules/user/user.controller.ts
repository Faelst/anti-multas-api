import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('traffic-inflations')
export class TrafficInflationsController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Get('')
  createUser(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }
}
