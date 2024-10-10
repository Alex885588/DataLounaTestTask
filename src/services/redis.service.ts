import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: 'redis://redis:6379' });
    this.client.connect();
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, expiration: number): Promise<void> {
    await this.client.set(key, value, { EX: expiration });
  }
}
