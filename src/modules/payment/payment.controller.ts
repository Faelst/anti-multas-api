import { Body, Controller, Post, Put } from '@nestjs/common';

import { CreateCreditCardPaymentUseCase } from './use-cases/create-credit-card-payment.usecase';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createCreditCardPaymentUseCase: CreateCreditCardPaymentUseCase,
  ) {}

  @Post('')
  executePayment(@Body() payment: CreateOrderDto) {
    return this.createCreditCardPaymentUseCase.execute(payment);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    console.log('Webhook received', body);
    return { message: 'Webhook received' };
  }

  @Put('webhook')
  webhookPut(@Body() body: any) {
    console.log('Webhook received', body);
    return { message: 'Webhook received' };
  }
}
