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
    u.name AS user,
    r.name AS role,
    r.description AS description,
    IF(r.id IS NOT NULL, 
       CONCAT(
           '[', 
           GROUP_CONCAT(DISTINCT CONCAT('{"name": "', REPLACE(IFNULL(p.name, ''), '"', '\"'), '", "description": "', REPLACE(IFNULL(p.description, ''), '"', '\"'), '"}')), 
           ']'
       ),
       '[]'
    ) AS permissions
FROM josyd_users AS u
LEFT JOIN (
    SELECT 
        urp.userId,
        MIN(urp.roleId) AS min_role_id
    FROM ${tableName} AS urp
    GROUP BY urp.userId
) AS FirstRole ON u.id = FirstRole.userId
LEFT JOIN ${tableName} AS urp ON u.id = urp.userId AND urp.roleId = FirstRole.min_role_id
LEFT JOIN sitrek_roles AS r ON r.id = urp.roleId
LEFT JOIN sitrek_permissions AS p ON p.id = urp.permissionId
GROUP BY u.id, u.name, r.name, r.description;
;
`,
    );
    return result.map((user) => ({
      ...user,
      permissions: user.permissions ? JSON.parse(user.permissions) : [],
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
      r.description AS description,
      CONCAT('[', GROUP_CONCAT(
        CONCAT('{"id": ', p.id, ', "name": "', p.name, '", "description": "', p.description, '"}')
      ), ']') AS permissions
FROM ${tableName} AS urp
JOIN josyd_users AS u ON u.id = urp.userId
JOIN sitrek_roles AS r ON r.id = urp.roleId
JOIN sitrek_permissions AS p ON p.id = urp.permissionId
WHERE urp.userId = ?
GROUP BY urp.userId, u.username, urp.roleId, r.name, r.description;
`,
      [id],
    );

    return result.map((role: any) => ({
      ...role,
      permissions: JSON.parse(role.permissions),
    })) as UserRolesPermissions[];
  }
}
