import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.dataSource.query(
      'INSERT INTO test (name, email) VALUES (?, ?)',
      ['Abdullah', 'a@bc.com'],
    );

    const insertId = result.insertId;

    const user = await this.dataSource.query(
      'SELECT * FROM test WHERE id = ?',
      [insertId],
    );

    return user;
  }

  async findAll() {
    const result = await this.dataSource.query('SELECT * FROM test');
    return result;
  }

  async findOne(id: number) {
    const result = await this.dataSource.query(
      'SELECT * FROM test WHERE id = ?',
      [id],
    );
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.dataSource.query(
      'UPDATE test SET name = ?, email = ? WHERE id = ?',
      ['x1', 'y1', id],
    );
    const updated = await this.dataSource.query(
      'SELECT * FROM test WHERE id = ?',
      [id],
    );
    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
