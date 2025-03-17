import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByLoginId(dto.loginId);
    if (!user) {
      throw new BadRequestException('회원 정보를 찾을 수 없습니다.');
    }
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('ID/PW 가 일치하지 않습니다.');
    }

    const signPayload = { username: user.userName, sub: user.loginId };

    const response = new LoginResponseDto();
    response.access_token = await this.jwtService.signAsync(signPayload, {
      expiresIn: '1h',
    });
    response.refresh_token = await this.jwtService.signAsync(signPayload, {
      expiresIn: '7d',
    });
    return response;
  }

  refresh(dto: { refreshToken: string }) {
    const token = dto.refreshToken;
    const decoded = this.jwtService.verify(token);
    const signPayload = { username: decoded.username, sub: decoded.sub };
    return {
      accessToken: this.jwtService.sign(signPayload, { expiresIn: '1h' }),
    };
  }
}
