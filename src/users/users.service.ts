import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<User[]> {
    const result = await this.dataSource.query(
      `SELECT 
      r.id as id,
      r.privacy as privacy,
      r.firstname as firstname,
      r.secondname as secondname,
      r.lastname as lastname,
      r.avatar as avatar,
      r.params as params,
      r.facebook_id as facebookId,
      r.twitter_id as twitterId,
      r.google_id as googleId,
      r.linkedin_id as linkedinId,
      r.instagram_id as instagramId,
      r.address as address,
      r.phone_number as phoneNumber,
      r.nic as nic,
      r.type as type,
      u.name as name,
      u.username as username,
      u.email as email
    FROM josyd_jsn_users as r
    INNER JOIN josyd_users as u ON r.id = u.id`,
    );
    return result;
  }

  async findById(id: number): Promise<User> {
    const result = await this.dataSource.query(
      `SELECT 
      r.id as id,
      r.privacy as privacy,
      r.firstname as firstname,
      r.secondname as secondname,
      r.lastname as lastname,
      r.avatar as avatar,
      r.params as params,
      r.facebook_id as facebookId,
      r.twitter_id as twitterId,
      r.google_id as googleId,
      r.linkedin_id as linkedinId,
      r.instagram_id as instagramId,
      r.address as address,
      r.phone_number as phoneNumber,
      r.nic as nic,
      r.type as type,
      u.name as name,
      u.username as username,
      u.email as email
    FROM josyd_jsn_users as r
    INNER JOIN josyd_users as u ON r.id = u.id
    WHERE r.id = ?`,
      [id],
    );

    if (result.length === 0) {
      throw new Error('User not found');
    }
    return result[0];
  }
}
