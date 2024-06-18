import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TrafficInflationsModule } from './modules/traffic-inflations/traffic-inflations.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SolicitationModule } from './modules/solicitation/solicitation.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DocumentModule } from './modules/document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventEmitterModule.forRoot(),
    TrafficInflationsModule,
    CustomerModule,
    PaymentModule,
    SolicitationModule,
    AuthModule,
    UserModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
