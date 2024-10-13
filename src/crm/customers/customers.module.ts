import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersModule, PrismaService, CustomersService],
})
export class CustomersModule {}
