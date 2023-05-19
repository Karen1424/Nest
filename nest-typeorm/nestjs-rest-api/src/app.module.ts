import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "decentralized_user",
      password: "A7JsV3nHh3w",
      database: "taskmanagment",
      entities: [Task, User],
      synchronize: true,
    }),
    TasksModule,
    AuthModule
  ],
})
export class AppModule {}
