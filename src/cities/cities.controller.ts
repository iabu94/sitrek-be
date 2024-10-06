import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CitiesService } from './cities.service';

@Controller('resource')
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  // Endpoint to get provinces
  @Get('provinces')
  async getProvinces(@Res() response: Response) {
    try {
      const result = await this.service.getProvinces();

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all provinces successfully',
        body: result,
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

  // Endpoint to get districts by provinceId
  @Get('districts')
  async getDistricts(
    @Query('provinceId') provinceId: string,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.getDistricts(Number(provinceId));
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all districts successfully',
        body: result,
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

  // Endpoint to get cities by districtId
  @Get('cities')
  async getCities(
    @Query('districtId') districtId: string,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.getCities(Number(districtId));
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all cities successfully',
        body: result,
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
