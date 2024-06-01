import { Module } from '@nestjs/common';
import { SolicitationController } from './solicitation.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSolicitationUseCase } from './use-cases/create-solicitation.usecase';

@Module({
  imports: [],
  controllers: [SolicitationController],
  providers: [PrismaService, CreateSolicitationUseCase],
})
export class SolicitationModule {}
