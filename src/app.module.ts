import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UserRolesPermissionsModule } from './user-roles-permissions/user-roles-permissions.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
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
        entities: [], // Add your entities here
        synchronize: false, // Ensure it's false for production
        extra: {
          engine: 'InnoDB',
        },
      }),
    }),
    TestModule,
    UserRolesPermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
