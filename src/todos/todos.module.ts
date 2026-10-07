import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver.js';
import { TodosService } from './todos.service.js';

@Module({
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
