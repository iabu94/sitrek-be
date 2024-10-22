import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { RateCardService } from './rate-cards.service';

@Controller('ratecards')
export class RateCardsController {
  constructor(private readonly service: RateCardService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const records = await this.service.getAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all rate cards successfully',
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
