import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { PagarmeService } from './pagarme.service';

@Module({
  imports: [HttpModule],
  providers: [PagarmeService],
  exports: [PagarmeService],
})
export class PagarmeModule {}
