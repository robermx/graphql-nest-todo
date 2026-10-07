import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @IsInt()
  @Min(1)
  @Field(() => Int, { description: 'This ID is an integer' })
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field(() => String, {
    description: 'A Task that needs to be done',
    nullable: true,
  })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {
    description: 'When a todo is completed',
    nullable: true,
  })
  done?: boolean;
}
