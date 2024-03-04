import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';
import { Config, RedisConfig } from '../../configs/config.type';

const redisProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: (configService: ConfigService<Config>) => {
    const redisConfig = configService.get<RedisConfig>('redis');
    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
};
@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
