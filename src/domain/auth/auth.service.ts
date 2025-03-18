import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

  verify(token: string) {
    const decoded = this.jwtService.verify(token);
    return decoded.user;
  }

  async createToken(payload: any, expiresIn: string) {
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
