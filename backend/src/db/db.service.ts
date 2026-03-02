import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class DbService extends PrismaClient {
  constructor(cfgService: ConfigService) {
    super({
      adapter: new PrismaPg({
        connectionString: cfgService.get('DATABASE_URL'),
      }),
    });
  }
}
