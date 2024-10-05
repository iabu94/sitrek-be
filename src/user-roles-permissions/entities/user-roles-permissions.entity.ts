import { Permission } from 'src/role-permissions/entities/role-permissions.entity';

export class UserRolesPermissions {
  id: number;
  userId: number;
  roleId: number;
  roleName: string;
  username: string;
  permissions: Permission[];
}
