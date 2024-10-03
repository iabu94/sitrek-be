import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const records = await this.service.findAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all permissions successfully',
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
