import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller';
import { PagarmeModule } from '../../common/services/pagarme/pagarme.module';
import { CreateCreditCardPaymentUseCase } from './use-cases/create-credit-card-payment.usecase';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  imports: [PagarmeModule],
  controllers: [PaymentController],
  providers: [CreateCreditCardPaymentUseCase, PrismaService],
})
export class PaymentModule {}
