import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateFavoriteRequestDto } from './dto/update-favorite-request.dto';
import { UserToken } from '../../libs/decorators/auth.decorator';
import { LoginRequestDto } from '../product/dto/login-request.dto';
import { LoginResponseDto } from '../product/dto/login-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.userService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }

  @Post('favorite')
  async updateFavorite(
    @UserToken() token: string,
    @Body() dto: UpdateFavoriteRequestDto,
  ) {
    dto.token = token;
    return this.userService.updateFavorite(dto);
  }
}
