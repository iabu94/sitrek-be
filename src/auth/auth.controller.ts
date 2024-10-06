import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('user-info')
  async getUserPermissions(@Req() req: any, @Res() response: Response) {
    try {
      const permissions = await this.authService.getUserPermissionsQuery(
        +req.user.id,
      );
      return response.status(200).json({
        statusCode: 200,
        message: 'Retrieved user permissions successfully',
        body: { ...permissions },
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  @Post('login')
  async login(@Req() req: any, @Res() response: Response, @Body() body: any) {
    try {
      const token = await this.authService.login(body);
      return response.status(200).json({
        statusCode: 200,
        message: 'Logged in successfully',
        body: { ...token },
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: error.message,
        statusCode: 500,
      });
    }
  }
}
