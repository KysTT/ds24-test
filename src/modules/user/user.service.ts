import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './DTO/login-user.dto';
import { DrawUserDto } from './DTO/draw-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DrawUserDto[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(data: CreateUserDto): Promise<DrawUserDto> {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          isVIP: data.isVIP,
        },
      });
    } catch (err) {
      throw new BadRequestException('Такой пользователь уже существует');
    }
  }

  async getUserById(id: number): Promise<DrawUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        reservations: true,
      },
    });
    if (!user) {
      throw new HttpException('Пользователь не найден!', 404);
    }
    return plainToInstance(DrawUserDto, user);
  }

  async login(data: LoginUserDto): Promise<DrawUserDto> {
    // здесь в идеале должна быть логика авторизации через JWT / OAuth
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('Неверный имя пользователя или пароль');
    }
    if (await bcrypt.compare(data.password, user.password)) {
      return plainToInstance(DrawUserDto, user);
    } else {
      throw new BadRequestException('Неверный имя пользователя или пароль');
    }
  }
}
