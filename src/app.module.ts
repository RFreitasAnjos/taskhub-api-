import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
