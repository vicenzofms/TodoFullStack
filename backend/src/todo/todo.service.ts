import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { TodoAddDTO } from '../dtos/index.js';

@Injectable()
export class TodoService {
  constructor(private dbService: DbService) {}

  async addTodo(dto: TodoAddDTO, uid: string) {
    try {
      const todo = await this.dbService.todo.create({
        data: {
          done: false,
          level: dto.level,
          title: dto.title,
          description: dto.description,
          authorId: uid,
        },
      });
      return { message: 'Todo criado com sucesso!', todo };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllTodos(uid: string) {
    try {
      const todos = await this.dbService.todo.findMany({
        where: { authorId: uid },
      });
      return todos;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003')
        throw new ForbiddenException({
          errorMessage: 'O usuário não foi encontrado.',
        });
      throw new ForbiddenException({
        errorMessage: 'Ocorreu um erro com o banco de dados!',
      });
    }
    throw error;
  }
}
