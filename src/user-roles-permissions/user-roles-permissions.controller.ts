import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CreateUserRolePermissionRequest } from './dto/create-user-roles-permissions.dto';
import { UserRolesPermissionsService } from './user-roles-permissions.service';

@Controller('user-roles-permissions')
export class UserRolesPermissionsController {
  constructor(private readonly service: UserRolesPermissionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(
    @Res() response: Response,
    @Body() createRequest: CreateUserRolePermissionRequest,
  ) {
    try {
      const records = [];

      //delete all the permissions
      await this.service.deleteAllByUser(createRequest.userId);

      //create permission again
      for (const createDto of createRequest.items) {
        const record = await this.service.create(
          createRequest.userId,
          createDto,
        );
        records.push(record);
      }
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Update user roles and permissions successfully',
        body: {
          ...records,
        },
      });
    } catch (error) {
      console.log(error, 'error');
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const records = await this.service.findAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all user role permissions successfully',
        body: [...records],
      });
    } catch (error) {
      console.log(error, 'error');
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get('user/:id')
  async findAllByUser(@Param() params: any, @Res() response: Response) {
    try {
      const records = await this.service.getByUserId(params.id);
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all user role permissions successfully',
        body: [...records],
      });
    } catch (error) {
      console.log(error, 'error');
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
