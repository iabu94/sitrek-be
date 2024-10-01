import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UserRolesPermissionsModule } from './user-roles-permissions/user-roles-permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sitrek',
      entities: [],
      synchronize: false,
      extra: {
        engine: 'InnoDB',
      },
    }),
    TestModule,
    UserRolesPermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
