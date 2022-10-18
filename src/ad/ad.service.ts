import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdService {
  constructor(private prisma: PrismaService) {}

  async create(createAdDto: CreateAdDto, user: User) {
    try {
      const ad = await this.prisma.ad.create({
        data: {
          name: createAdDto.name,
          creator_id: user.id,
          media: {
            createMany: {
              data: createAdDto.image.map((img) => ({
                source: img,
                type: 'image',
              })),
            },
          },
        },
        include: {
          media: true,
        },
      });
      return ad;
    } catch (error) {
      throw new BadRequestException('Cannot create Ad');
    }
  }

  async findAll(user: User) {
    return await this.prisma.ad.findMany({
      where: {
        creator_id: user.id,
      },
      include: {
        media: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.ad.findUnique({
      where: {
        id: id,
      },
      include: {
        media: true,
      },
    });
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }

  async remove(id: number) {
    try {
      const ad = await this.findOne(id);
      if (ad) {
        return this.prisma.ad.delete({
          where: {
            id: id,
          },
        });
      }
      throw '';
    } catch (error) {
      throw new BadRequestException('Cannot delete Ad');
    }
  }
}
