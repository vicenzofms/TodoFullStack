import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsEnum(Levels)
  level: Levels;
}

export class TodoEditDTO {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Levels)
  level: Levels;

  @IsBoolean()
  done: boolean;
}
