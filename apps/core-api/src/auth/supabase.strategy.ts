import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  constructor(private prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing Supabase credentials. Check SUPABASE_URL and SUPABASE_ANON_KEY in .env'
      );
    }
    
    super({
      supabaseUrl,
      supabaseKey,
      supabaseOptions: {},
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    const supabaseUser = await super.validate(payload);
    
    const userId = payload.sub || (supabaseUser as any)?.id;
    
    if (!userId) {
      throw new UnauthorizedException('Invalid token: missing user ID');
    }
    
    const dbUser = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        email: true,
        username: true,
        roles: true,
        is_active: true,
      },
    });
    
    if (!dbUser) {
      throw new UnauthorizedException('User not found in database');
    }
    
    if (!dbUser.is_active) {
      throw new UnauthorizedException('User account is inactive');
    }
    
    return dbUser;
  }

  authenticate(req: any): void {
    const idToken = (this as any).extractor(req);
    
    if (!idToken) {
      this.fail('Unauthorized', 401);
      return;
    }
    
    const supabase = (this as any).supabase;
    
    if (!supabase) {
      this.fail('Supabase client not initialized', 500);
      return;
    }
    
    supabase.auth
      .getUser(idToken)
      .then(async ({ data: { user } }: any) => {
        const dbUser = await this.validate(user);
        this.success(dbUser, {});
      })
      .catch((err: any) => {
        this.fail(err.message, 401);
      });
  }
}

