import { Query, Resolver, Int, Args, Mutation } from '@nestjs/graphql';

import { TodosService } from './todos.service.js';
import { Todo } from './entities/todo.entities.js';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto/index.js';
import { AggregationType } from './types/aggregation.type.js';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly TodosService: TodosService) {}
  @Query(() => [Todo], {
    name: 'todos',
    description: 'returns a list of todos.',
  })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.TodosService.findAll(statusArgs);
  }

  @Query(() => Todo, {
    name: 'todo',
    description: 'returns just one todo with an specified ID.',
  })
  findOne(@Args('id', { nullable: true, type: () => Int }) id: number): Todo {
    return this.TodosService.findOne(id);
  }

  @Mutation(() => Todo, {
    name: 'createTodo',
    description: 'Adds a new todo.',
  })
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.TodosService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo',
    description: 'Updates a todo through an ID.',
  })
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.TodosService.update(updateTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'removeTodo',
    description: 'Removes a todo through an ID.',
  })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.TodosService.remove(id);
  }

  /** Deprecated */
  @Query(() => Int, {
    name: 'totalTodos',
    description: 'Returns length of total todos',
    deprecationReason: 'Use aggregations query instead.',
  })
  todos(): number {
    return this.TodosService.totalTodos;
  }

  @Query(() => Int, {
    name: 'completedTodos',
    description: 'Returns length of completed todos',
    deprecationReason: 'Use aggregations query instead.',
  })
  completed(): number {
    return this.TodosService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
    description: 'Returns length of pending todos',
    deprecationReason: 'Use aggregations query instead.',
  })
  pending(): number {
    return this.TodosService.pendingTodos;
  }

  /** Aggregations */
  @Query(() => AggregationType, {
    name: 'aggregations',
    description: 'Returns a group of the total and status of completed and pending todos.',
  })
  aggregations(): AggregationType {
    return {
      total: this.TodosService.totalTodos,
      pending: this.TodosService.pendingTodos,
      completed: this.TodosService.completedTodos,
    };
  }
}
