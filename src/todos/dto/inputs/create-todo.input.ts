import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field(() => String, { description: 'Create a todo description' })
  description: string;
}
