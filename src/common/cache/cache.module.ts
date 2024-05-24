import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheRepository } from './cache.repository';
import { CacheModule as CacheModuleIntern } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModuleIntern.register({
      ttl: 60 * 60 * 48,
    })
  ],
  providers: [CacheRepository],
  exports: [CacheRepository],
})
export class CacheModule {}
