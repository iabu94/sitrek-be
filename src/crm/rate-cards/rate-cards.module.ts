import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RateCardsController } from './rate-cards.controller';
import { RateCardService } from './rate-cards.service';

@Module({
  controllers: [RateCardsController],
  providers: [RateCardService, PrismaService],
})
export class RateCardsModule {}
