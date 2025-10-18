import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SimpleAuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Obtener user_id del header
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    // Buscar usuario en la DB
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        email: true,
        username: true,
        roles: true,
        is_active: true,
      },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('Invalid user');
    }

    // Adjuntar usuario al request
    req['user'] = user;
    next();
  }
}
