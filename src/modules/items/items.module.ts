import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { BidGuard } from 'src/modules/auth/guard/bid.guard';
import { config } from 'dotenv';
import { AuthModule } from '@/auth/auth.module';
config();

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService, BidGuard],
  exports: [BidGuard],
})
export class ItemsModule {}
