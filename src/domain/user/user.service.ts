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
    // id 중복체크
    const user = await this.findOneByLoginId(dto.loginId);
    if (!!user) {
      throw new BadRequestException('이미 존재하는 ID 입니다.');
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

  async updateFavorite(dto: UpdateFavoriteRequestDto): Promise<void> {
    const { token, isFavorite, targetType, targetId } = dto;
    // token 에서 회원정보 조회
    const user = this.authService.verify(token);

    const userFavorite = await this.userFavoriteRepository.findOne({
      where: { userId: user.id, targetType, targetId },
    });

    if (isFavorite && !userFavorite) {
      await this.userFavoriteRepository.save({
        userId: user.id,
        targetType,
        targetId,
      });
    } else if (!isFavorite && userFavorite) {
      await this.userFavoriteRepository.delete(userFavorite.id);
    }
    // 그 외 경우는 아무 동작 하지 않아도 됨
    //  - unlike && userFavorite 가 없는 경우
    //  - like && userFavorite 가 있는 경우
  }
}
