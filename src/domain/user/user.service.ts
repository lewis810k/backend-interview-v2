import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../libs/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateFavoriteRequestDto } from './dto/update-favorite-request.dto';
import { UserFavorite } from '../../libs/entities/user-favorite.entity';
import { LoginRequestDto } from '../product/dto/login-request.dto';
import { LoginResponseDto } from '../product/dto/login-response.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserFavorite)
    private readonly userFavoriteRepository: Repository<UserFavorite>,
    private readonly authService: AuthService,
  ) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.findOneByLoginId(dto.loginId);
    if (!user) {
      throw new BadRequestException('회원 정보를 찾을 수 없습니다.');
    }
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('ID/PW 가 일치하지 않습니다.');
    }

    const signPayload = { user };

    const response = new LoginResponseDto();
    response.access_token = await this.authService.createToken(
      signPayload,
      '1h',
    );
    response.refresh_token = await this.authService.createToken(
      signPayload,
      '7d',
    );
    return response;
  }

  async register(dto: RegisterUserDto) {
    console.log('dto : ', dto);
    // id 중복체크
    const user = await this.findOneByLoginId(dto.loginId);
    if (!!user) {
      throw new BadRequestException('중복');
    }

    // 계정 생성
    const newUser = new User();
    newUser.loginId = dto.loginId;
    newUser.userName = dto.userName;
    newUser.email = dto.email;
    newUser.password = await bcrypt.hash(dto.password, 10); // TODO: hash
    return this.userRepository.save(newUser);
  }

  async findOneByLoginId(loginId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { loginId } });
  }
}
