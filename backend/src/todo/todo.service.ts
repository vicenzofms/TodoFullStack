import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Levels, TodoAddDTO, TodoEditDTO } from '../dtos/index.js';

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

  async getAllTodos(
    uid: string,
    queryParams: { level?: Levels; done?: boolean },
  ) {
    if (
      queryParams.level &&
      (queryParams.level < Levels.LOW || queryParams.level > Levels.IMPORTANT)
    ) {
      throw new ForbiddenException({
        errorMessage: 'O nível do TODO está inválido.',
      });
    }
    try {
      const todos = await this.dbService.todo.findMany({
        where: {
          authorId: uid,
          ...(queryParams.level !== undefined && { level: queryParams.level }),
          ...(queryParams.done !== undefined && { done: queryParams.done }),
        },
      });
      return todos;
    } catch (error) {
      this.handleError(error);
    }
  }

  async editTodo(uid: string, newTodo: TodoEditDTO) {
    try {
      const todo = await this.dbService.todo.findUnique({
        where: { id: newTodo.id },
      });
      if (todo?.authorId !== uid) {
        throw new ForbiddenException({
          errorMessage: 'Você não tem permissão para alterar esse TODO!',
        });
      }

      await this.dbService.todo.update({
        where: { id: newTodo.id, authorId: uid },
        data: { ...newTodo },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async completeTodo(uid: string, todoId: number) {
    try {
      const todo = await this.dbService.todo.findUnique({
        where: { id: todoId },
      });
      if (todo?.authorId !== uid) {
        throw new ForbiddenException({
          errorMessage: 'Você não tem permissão para alterar esse TODO!',
        });
      }
      if (todo.done) {
        throw new ForbiddenException({
          errorMessage: 'Este TODO já está concluído',
        });
      }

      await this.dbService.todo.update({
        where: { id: todoId, authorId: uid },
        data: { done: true },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTodo(uid: string, todoId: number) {
    try {
      await this.dbService.todo.delete({
        where: {
          id: todoId,
          authorId: uid,
        },
      });
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
      if (error.code === 'P2025') {
        throw new ForbiddenException({
          errorMessage: 'O TODO em questão não foi encontrado',
        });
      }
      throw new ForbiddenException({
        errorMessage: 'Ocorreu um erro com o banco de dados!',
      });
    }
    throw error;
  }
}
