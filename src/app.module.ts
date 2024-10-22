import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { CustomersModule } from './crm/customers/customers.module';
import { LeadsModule } from './crm/leads/leads.module';
import { RateCardsModule } from './crm/rate-cards/rate-cards.module';
import { FileController } from './files/files.controller';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { RolesModule } from './roles/roles.module';
import { TestModule } from './test/test.module';
import { UserRolesPermissionsModule } from './user-roles-permissions/user-roles-permissions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [],
        synchronize: false,
        extra: {
          engine: 'InnoDB',
        },
      }),
    }),
    TestModule,
    UserRolesPermissionsModule,
    RolesModule,
    UsersModule,
    RolePermissionsModule,
    CitiesModule,
    CustomersModule,
    LeadsModule,
    RateCardsModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
