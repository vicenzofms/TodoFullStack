import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Levels {
  LOW = 1,
  AVERAGE = 2,
  IMPORTANT = 3,
}

export class TodoAddDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Levels)
  level: Levels;
}
