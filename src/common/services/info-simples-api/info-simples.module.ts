import { Module } from '@nestjs/common';
import { InfoSimplesService } from './info-simples.service';

@Module({
  imports: [],
  providers: [InfoSimplesService],
  exports: [InfoSimplesService],
})
export class InfoSimplesModule {}
