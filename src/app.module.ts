import { Module } from '@nestjs/common';
import { TrafficInflationsModule } from './modules/traffic-inflations/traffic-inflations.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TrafficInflationsModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
