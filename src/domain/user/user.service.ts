import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../libs/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
