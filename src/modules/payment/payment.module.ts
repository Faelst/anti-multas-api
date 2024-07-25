import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller';
import { AsaasModule } from '../../common/services/asaas/asaas.module';
import { CreateCreditCardPaymentUseCase } from './use-cases/create-credit-card-payment.usecase';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  imports: [AsaasModule],
  controllers: [PaymentController],
  providers: [CreateCreditCardPaymentUseCase, PrismaService],
})
export class PaymentModule {}
