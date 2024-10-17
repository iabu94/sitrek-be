import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CustomersService } from '../customers/customers.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, PrismaService, CustomersService],
})
export class LeadsModule {}
