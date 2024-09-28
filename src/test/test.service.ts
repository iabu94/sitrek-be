import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(private dataSource: DataSource) {}

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
