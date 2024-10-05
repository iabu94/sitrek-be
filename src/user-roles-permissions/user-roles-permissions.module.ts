import { Module } from '@nestjs/common';
import { UserRolesPermissionsController } from './user-roles-permissions.controller';
import { UserRolesPermissionsService } from './user-roles-permissions.service';

@Module({
  controllers: [UserRolesPermissionsController],
  providers: [UserRolesPermissionsService],
})
export class UserRolesPermissionsModule {}
