import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user
      ? request.user
      : await(new PrismaService()).user.findFirst({ where: { id: 1 } });
    return user;
  },
);
