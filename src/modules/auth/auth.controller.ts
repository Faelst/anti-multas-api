import { Controller, Post, Body } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { ValidateUserUseCase } from './use-cases/validate-user.usecase';

@Controller('auth')
export class CustomerController {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {}

  @Post('session')
  startSession(@Body() { email, password }: CreateSessionDto) {
    return this.validateUserUseCase.execute({ email, password });
  }
}
