import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator.js';
import { TodoService } from './todo.service.js';
import { Levels, TodoAddDTO, TodoEditDTO } from '../dtos/index.js';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('add')
  addTodo(@GetUser('uid') uid: string, @Body() dto: TodoAddDTO) {
    return this.todoService.addTodo(dto, uid);
  }

  @Get('all')
  getAllTodos(
    @GetUser('uid') uid: string,
    @Query('level', new ParseIntPipe({ optional: true })) level: Levels,
    @Query('done', new ParseBoolPipe({ optional: true })) done: boolean,
  ) {
    const queryParams = { level, done };
    return this.todoService.getAllTodos(uid, queryParams);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('edit')
  editTodo(@GetUser('uid') uid: string, @Body() newTodo: TodoEditDTO) {
    return this.todoService.editTodo(uid, newTodo);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('complete/:id')
  completeTodo(
    @GetUser('uid') uid: string,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.completeTodo(uid, todoId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTodo(
    @GetUser('uid') uid: string,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteTodo(uid, todoId);
  }
}
