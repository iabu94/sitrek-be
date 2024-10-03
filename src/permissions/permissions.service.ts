import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Permission } from './entities/permission.entity';

const tableName = 'sitrek_permissions';

@Injectable()
export class PermissionsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<Permission[]> {
    const result = await this.dataSource.query(
      `SELECT 
      r.id as id,
      r.name as name,
      r.roleId as roleId
      FROM ${tableName} as r`,
    );
    return result;
  }
}
