import { Injectable } from '@nestjs/common';
import { sitrek_rate_cards } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RateCardService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<sitrek_rate_cards[]> {
    const leads = await this.prisma.sitrek_rate_cards.findMany({
      include: {
        sitrek_customers: true,
        sitrek_leads: true,
      },
    });

    return leads;
  }
}
