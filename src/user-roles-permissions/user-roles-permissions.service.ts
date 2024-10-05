import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserRolesPermissionsDto } from './dto/create-user-roles-permissions.dto';
import { UserRolesPermissionsDto } from './dto/user-roles-permissions.dto';
import { UserRolesPermissions } from './entities/user-roles-permissions.entity';

const tableName = 'sitrek_user_roles_permissions';

@Injectable()
export class UserRolesPermissionsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<UserRolesPermissionsDto[]> {
    const result = await this.dataSource.query(
      `SELECT 
        u.id AS userId,
        u.username AS user,
        (SELECT r.name 
         FROM sitrek_roles AS r 
         JOIN ${tableName} AS urp2 ON r.id = urp2.roleId 
         WHERE urp2.userId = urp.userId 
         ORDER BY urp2.id LIMIT 1) AS role,
        GROUP_CONCAT(DISTINCT p.name) AS permissions
      FROM josyd_users AS u
      LEFT JOIN ${tableName} AS urp ON u.id = urp.userId
      LEFT JOIN sitrek_permissions AS p ON p.id = urp.permissionId
      GROUP BY u.username`,
    );
    return result.map((user) => ({
      ...user,
      permissions: user.permissions ? user.permissions.split(',') : [],
    }));
  }

  async deleteAllByUser(userId: number) {
    await this.dataSource.query(`DELETE FROM ${tableName} WHERE userId = ?`, [
      userId,
    ]);
  }
  async create(
    userId: number,
    { roleId, permissionId }: CreateUserRolesPermissionsDto,
  ): Promise<UserRolesPermissions> {
    const result = await this.dataSource.query(
      `INSERT INTO ${tableName} (userId, roleId, permissionId)
        VALUES (?, ?, ?)`,
      [userId, roleId, permissionId],
    );

    return await this.findOne(result.insertId);
  }

  async findOne(id: number): Promise<UserRolesPermissions> {
    const result = await this.dataSource.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
    );
    return result;
  }

  async getByUserId(id: number): Promise<UserRolesPermissions[]> {
    const result = await this.dataSource.query(
      `SELECT 
    urp.userId AS userId,
    u.username AS userName,
    urp.roleId AS roleId,
    r.name AS roleName,
    CONCAT('[', GROUP_CONCAT(
        CONCAT('{"id": ', p.id, ', "name": "', p.name, '"}')
    ), ']') AS permissions
FROM 
    ${tableName} AS urp
JOIN 
    josyd_users AS u ON u.id = urp.userId
JOIN 
    sitrek_roles AS r ON r.id = urp.roleId
JOIN 
    sitrek_permissions AS p ON p.id = urp.permissionId
WHERE 
    urp.userId = ?
GROUP BY 
    urp.userId, u.username, urp.roleId, r.name;

`,
      [id],
    );

    return result.map((role) => ({
      ...role,
      permissions: JSON.parse(role.permissions),
    })) as UserRolesPermissions[];
  }
}
