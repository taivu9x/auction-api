import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ItemsModule, ConfigModule],
  controllers: [],
})
export class AppModule {}
