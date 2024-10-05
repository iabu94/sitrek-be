import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateUserRolesPermissionsDto {
  @IsInt({ message: 'roleId must be an integer' })
  @IsNotEmpty({ message: 'roleId is required' })
  roleId: number;

  @IsInt({ message: 'permissionId must be an integer' })
  @IsNotEmpty({ message: 'permissionId is required' })
  permissionId: number;
}

export class CreateUserRolePermissionRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserRolesPermissionsDto)
  items: CreateUserRolesPermissionsDto[];
  @IsInt({ message: 'userId must be an integer' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;
}
