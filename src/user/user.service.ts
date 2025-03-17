import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterUserDto) {
    // id 중복체크
    const user = await this.userRepository.findOne({
      where: { loginId: dto.loginId },
    });
    if (!!user) {
      throw new BadRequestException('중복');
    }

    // 계정 생성
    const newUser = new User();
    newUser.loginId = dto.loginId;
    newUser.userName = dto.userName;
    newUser.email = dto.email;
    newUser.password = dto.password; // TODO: hash
    return this.userRepository.save(newUser);
  }
}
