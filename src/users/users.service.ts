import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: Partial<User>): Promise<User> {
    try {
      const user = this.usersRepository.create(userData);
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' || error.errno === 19) {
        throw new ConflictException('Oops! nombre de usuario o email ya existen!');
      }
      throw error;
    }
  }
}
