import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { description: 'Status filter', nullable: true })
  status?: boolean;
}
