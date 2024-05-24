import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveData<T>(data: T, key: string): Promise<void> {
    await this.cacheManager.set(key, JSON.stringify(data));
  }

  async getData<T>(key: string): Promise<T> {
    return JSON.parse(await this.cacheManager.get(key)) as T;
  }
}
