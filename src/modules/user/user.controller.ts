import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('')
  createUser(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }
}
