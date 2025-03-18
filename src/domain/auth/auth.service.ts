import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../libs/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  refresh(dto: { refreshToken: string }) {
    const token = dto.refreshToken;
    const decodedUser = this.verify(token);
    const signPayload = { user: decodedUser };
    return {
      accessToken: this.jwtService.sign(signPayload, { expiresIn: '1h' }),
    };
  }

  verify(token: string): User {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.user as User;
    } catch (e) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }

  async createToken(payload: any, expiresIn: string): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
