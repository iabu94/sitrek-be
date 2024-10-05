import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private dataSource: DataSource,
  ) {}

  async prismaOutput(userId: number) {
    const userInfo = await this.prisma.josyd_users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        sitrek_user_roles_permissions: {
          select: {
            sitrek_permissions: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
      },
      permissions: userInfo.sitrek_user_roles_permissions.map(
        (p) => p.sitrek_permissions.name,
      ),
    };
  }

  async getUserPermissionsQuery(userId: number) {
    const userInfo = await this.dataSource.query(
      `SELECT u.id, u.name, u.email, p.name as permission_name
      FROM josyd_users u
      LEFT JOIN sitrek_user_roles_permissions urp ON urp.userId = u.id
      LEFT JOIN sitrek_permissions p ON urp.permissionId = p.id
      WHERE u.id = ?;
      `,
      [userId],
    );

    return {
      userInfo: {
        id: userInfo[0].id,
        name: userInfo[0].name,
        email: userInfo[0].email,
      },
      permissions: [...userInfo.map((p) => p.permission_name)],
    };
  }
}
