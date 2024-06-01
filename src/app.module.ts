import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TrafficInflationsModule } from './modules/traffic-inflations/traffic-inflations.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SolicitationModule } from './modules/solicitation/solicitation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrafficInflationsModule,
    CustomerModule,
    PaymentModule,
    SolicitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
