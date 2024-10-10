import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { District } from './entities/cities.entity';

const tableName = 'sitrek_Citys';

@Injectable()
export class CitiesService {
  constructor(private dataSource: DataSource) {}

  // Get provinces
  async getProvinces(): Promise<any> {
    const provinces = await this.dataSource.query(
      'SELECT id, name FROM sitrek_provinces',
    );
    return provinces;
  }

  // Get districts by provinceId
  async getDistricts(provinceId?: number): Promise<District[]> {
    if (provinceId) {
      return await this.dataSource.query(
        'SELECT id, name FROM sitrek_districts WHERE provinceId = ?',
        [provinceId],
      );
    } else {
      return await this.dataSource.query(
        'SELECT id, name FROM sitrek_districts',
      );
    }
  }

  // Get cities by districtId
  async getCities(districtId?: number): Promise<any> {
    if (districtId) {
      return await this.dataSource.query(
        'SELECT id, name, postalCode FROM sitrek_cities WHERE districtId = ?',
        [districtId],
      );
    } else {
      return await this.dataSource.query(
        'SELECT id, name, postalCode FROM sitrek_cities',
      );
    }
  }
}
