import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveData<T>(data: T, key: string): Promise<void> {
    const ttlHours = 60 * 60 * 48;
    await this.redis.set(key, JSON.stringify(data), 'EX', ttlHours);
  }

  async getData<T>(key: string): Promise<T> {
    return JSON.parse(await this.redis.get(key)) as T;
  }
}
