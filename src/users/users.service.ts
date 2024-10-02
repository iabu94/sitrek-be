import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

const tableName = 'josyd_users';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<User[]> {
    const result = await this.dataSource.query(
      `SELECT 
      r.id as id,
      r.name as name,
      r.username as username,
      r.email as email
      FROM ${tableName} as r`,
    );
    return result;
  }
}
