import { Injectable } from '@nestjs/common';
import * as b from 'bcrypt';
import { DataSource } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(private dataSource: DataSource) {}

  async getPassword() {
    const password = await this.dataSource.query(
      'SELECT password FROM josyd_users WHERE username = ?',
      ['test'],
    );
    const result = await b.compare('sitrek@123', password[0].password);
    return result;
  }

  async create({ name, email }: CreateTestDto): Promise<Test> {
    const result = await this.dataSource.query(
      'INSERT INTO test (name, email) VALUES (?, ?)',
      [name, email],
    );

    const insertId = result.insertId;

    const user = await this.dataSource.query(
      'SELECT id, name, email FROM test WHERE id = ?',
      [insertId],
    );

    return user;
  }

  async findAll(): Promise<Test[]> {
    const result = await this.dataSource.query('SELECT * FROM test');
    const password = await this.dataSource.query(
      'SELECT password FROM josyd_users WHERE username = ? limit 1',
      ['test'],
    );
    const result1 = await b.compare(
      'sitrek@123',
      password.replace('$2y$', '$2b$'),
    );
    const encrypted = await b.hash('sitrek@123', 10);

    return result;
  }

  async findOne(id: number): Promise<Test> {
    const result = await this.dataSource.query(
      'SELECT * FROM test WHERE id = ?',
      [id],
    );
    return result;
  }

  async update(id: number, { name, email }: UpdateTestDto): Promise<Test> {
    const result = await this.dataSource.query(
      'UPDATE test SET name = ?, email = ? WHERE id = ?',
      [name, email, id],
    );

    const updated = await this.dataSource.query(
      'SELECT * FROM test WHERE id = ?',
      [id],
    );
    return updated;
  }

  remove(id: number): boolean {
    return true;
  }
}
