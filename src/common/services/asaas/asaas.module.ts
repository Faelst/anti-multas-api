import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { AsaasService } from './asaas.service';

@Module({
  imports: [HttpModule],
  providers: [AsaasService],
  exports: [AsaasService],
})
export class AsaasModule {}
