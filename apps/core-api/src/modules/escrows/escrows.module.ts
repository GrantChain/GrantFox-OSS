import { Module } from '@nestjs/common';
import { EscrowsService } from './escrows.service';
import { EscrowsController } from './escrows.controller';
import { DatabaseModule } from '../../database';

@Module({
  imports: [DatabaseModule],
  controllers: [EscrowsController],
  providers: [EscrowsService],
  exports: [EscrowsService],
})
export class EscrowsModule {}
