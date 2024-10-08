import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const records = await this.service.findAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all users successfully',
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

  @Get(':id')
  async findById(@Param() params: { id: number }, @Res() response: Response) {
    try {
      const record = await this.service.findById(params.id);

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved user successfully',
        body: record,
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
