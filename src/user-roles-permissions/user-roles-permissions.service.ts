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

  async create({
    userId,
    roleId,
    permissionId,
  }: CreateUserRolesPermissionsDto): Promise<UserRolesPermissions> {
    const result = await this.dataSource.query(
      `INSERT INTO ${tableName} (userId, roleId, permissionId) VALUES (?, ?, ?)`,
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
      urp.id as id,
      urp.userId as userId,
      urp.roleId as roleId,
      urp.permissionId as permissionId,
      r.name as roleName,
      p.name as permissionName,
      u.username as userName
      FROM ${tableName} as urp 
      JOIN josyd_users as u ON u.id = urp.userId 
      JOIN sitrek_roles as r ON r.id = urp.roleId 
      JOIN sitrek_permissions p ON p.id = urp.permissionId
      WHERE userId = ?`,
      [id],
    );
    return result;
  }
}
