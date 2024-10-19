import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CustomersService } from './customers.service';
import { UpdateCustomerPayload } from './dto/create.customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const records = await this.service.getAll();
      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Retrieved all role permissions successfully',
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
  async findOne(@Param() params: { id: number }, @Res() response: Response) {
    try {
      const record = await this.service.getById(params.id);
      return response.status(StatusCodes.OK).json(record);
    } catch (error) {
      console.log(error, 'error');
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Put()
  async update(
    @Body() payload: UpdateCustomerPayload,
    @Res() response: Response,
  ) {
    const record = await this.service.update(payload);
    return response.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: 'update customer successfully',
      body: record,
    });
  }
  catch(error) {
    console.log(error, 'error');
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong',
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
