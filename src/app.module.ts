import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
