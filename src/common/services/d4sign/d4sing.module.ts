import { Module } from '@nestjs/common';
import { D4SignService } from './d4sing.service';

@Module({
  imports: [],
  providers: [D4SignService],
  exports: [D4SignService],
})
export class D4SignModule {}
