import { Body, Controller, Post } from '@nestjs/common';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';

@Controller('solicitation')
export class SolicitationController {
  constructor(
    private readonly createSolicitationUseCase: CreateSolicitationUseCase,
  ) {}

  @Post('')
  executePayment(@Body() infractions: CreateSolicitationDto) {
    return this.createSolicitationUseCase.execute(infractions);
  }
}
