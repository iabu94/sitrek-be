import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(
    @Req() request: any,
    @Res() response: Response,
    @Body() createTestDto: CreateTestDto,
  ) {
    try {
      const test = await this.testService.create(createTestDto);
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Added test successfully',
        body: {
          ...test,
        },
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get()
  async findAll(@Req() request: any, @Res() response: Response) {
    console.log('findAll');

    try {
      const tests = await this.testService.findAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all test successfully',
        body: [...tests],
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Req() request: any,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      const test = await this.testService.findOne(+id);
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved test successfully',
        body: { ...test },
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Patch(':id')
  async update(
    @Req() request: any,
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    try {
      const test = await this.testService.update(+id, updateTestDto);
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Updated test successfully',
        body: { ...test },
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get('password')
  async getPassword(@Req() request: any, @Res() response: Response) {
    try {
      const password = await this.testService.getPassword();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved password successfully',
        body: { password },
      });
    } catch (error) {
      console.log('error', error);

      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Req() request: any,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      const res = await this.testService.remove(+id);
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Deleted test successfully',
        body: { deleted: res },
      });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
