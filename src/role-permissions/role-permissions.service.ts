import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RolePermission } from './entities/role-permissions.entity';

const tableName = 'sitrek_permissions';

@Injectable()
export class RolePermissionsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<RolePermission[]> {
    const result = await this.dataSource.query(
      `SELECT 
    r.id AS id,
    r.name AS name,
    CONCAT('[', GROUP_CONCAT(
        CONCAT('{"id": ', p.id, ', "name": "', p.name, '"}')
    ), ']') AS permissions
FROM 
    sitrek_roles r
LEFT JOIN 
    ${tableName} p ON r.id = p.roleId
GROUP BY 
    r.id, r.name;`,
    );

    return result.map((role) => ({
      ...role,
      permissions: role.permissions ? JSON.parse(role.permissions) : [],
    })) as RolePermission[];
  }
}