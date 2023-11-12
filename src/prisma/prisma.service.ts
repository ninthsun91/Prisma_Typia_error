import { ConsoleLogger, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new ConsoleLogger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.debug('Prisma connected');
  }
}
