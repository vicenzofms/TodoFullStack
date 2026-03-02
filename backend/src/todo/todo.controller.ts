import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator.js';
import { TodoService } from './todo.service.js';
import { TodoAddDTO } from '../dtos/index.js';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('add')
  addTodo(@GetUser() user, @Body() dto: TodoAddDTO) {
    return this.todoService.addTodo(dto, user.uid);
  }

  @Get('all')
  getAllTodos(@GetUser('uid') uid: string) {
    return this.todoService.getAllTodos(uid);
  }
}
