import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ItemsModule],
  controllers: [],
})
export class AppModule {}
