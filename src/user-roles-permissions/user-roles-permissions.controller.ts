import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CreateUserRolesPermissionsDto } from './dto/create-user-roles-permissions.dto';
import { UserRolesPermissionsService } from './user-roles-permissions.service';

@Controller('user-roles-permissions')
export class UserRolesPermissionsController {
  constructor(private readonly service: UserRolesPermissionsService) {}

  @Post()
  async create(
    @Req() request: any,
    @Res() response: Response,
    @Body() createRequest: CreateUserRolesPermissionsDto[],
  ) {
    try {
      const records = [];

      for (const createDto of createRequest) {
        const record = await this.service.create(createDto);
        records.push(record);
      }
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Added user role permission successfully',
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
