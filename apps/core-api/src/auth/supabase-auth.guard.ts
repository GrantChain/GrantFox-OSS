import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class SupabaseAuthGuard extends AuthGuard('supabase') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    
    return user;
  }
}

