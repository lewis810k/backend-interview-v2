import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../libs/guards/auth.guard';
import { LoginRequestDto } from '../product/dto/login-request.dto';
import { LoginResponseDto } from '../product/dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  refresh(@Body() dto: { refreshToken: string }) {
    return this.authService.refresh(dto);
  }
}
