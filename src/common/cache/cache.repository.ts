import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveData<T>(data: T, key: string): Promise<void> {
    const ttl = 60 * 60 * 42;
    await this.cacheManager.set(key, JSON.stringify(data), ttl);
  }

  async getData<T>(key: string): Promise<T> {
    const data = (await this.cacheManager.get(key)) as string | null;

    if (!data || data === 'undefined') {
      return null;
    }

    return JSON.parse(data) as T;
  }
}
