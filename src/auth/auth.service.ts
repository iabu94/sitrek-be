import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserPermissions(userId: number) {
    return this.prisma.sitrek_user_roles_permissions.findMany({
      where: {
        userId: userId,
      },
      select: {
        sitrek_permissions: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
