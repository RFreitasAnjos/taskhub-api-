import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth/auth.guard';
import { ScopesGuard } from '../auth/scope.guard';
import { Scopes } from '../auth/scope.decorator';

@UseGuards(AuthGuard, ScopesGuard)
@Controller('tasks')
export class TasksController {

  @Get()
  @Scopes('taskhub.read')
  getTasks() {
    return [{ id: 1, title: 'Teste', done: false }];
  }

  @Post()
  @Scopes('taskhub.write')
  createTask() {
    return { message: 'Criado com sucesso' };
  }
}
