import { Module } from '@nestjs/common';
import { TrafficInflationsModule } from './modules/traffic-inflations/traffic-inflations.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [TrafficInflationsModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
