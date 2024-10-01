import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';

const tableName = 'sitrek_roles';

@Injectable()
export class RolesService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<Role[]> {
    const result = await this.dataSource.query(
      `SELECT 
      r.id as id,
      r.name as name
      FROM ${tableName} as r`,
    );
    return result;
  }
}
