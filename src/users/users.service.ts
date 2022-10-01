import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/hashing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password_hash)

      const new_user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password_hash: hashedPassword,
        },
      });

      const { password_hash, ...result } = new_user

      return result;
    } catch (error) {
      throw new BadRequestException('Cannot create User.');
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }

  findOneByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name
      }
    })
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
