import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entities.js';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto/index.js';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Stone of Soul', done: false },
    { id: 2, description: 'Stone of Space', done: false },
    { id: 3, description: 'Stone of Power', done: false },
    { id: 3, description: 'Stone of Live', done: true },
    { id: 3, description: 'Stone of Eggs', done: true },
  ];

  get totalTodos(): number {
    return this.todos.length
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done === true).length
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => todo.done === false).length
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs.status !== undefined) {
      return this.todos.filter((todo) => todo.done === statusArgs.status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id: ${id} not found`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const newTodo = new Todo();
    newTodo.description = createTodoInput.description;
    newTodo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(newTodo);
    return newTodo;
  }

  update({ id, description, done }: UpdateTodoInput): Todo {
    const updatedTodo = this.findOne(id);
    if (description) updatedTodo.description = description;
    if (done !== undefined) updatedTodo.done = done;
    this.todos = this.todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    return updatedTodo;
  }

  remove(id: number): Todo {
    const removedTodo = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return removedTodo;
  }
}
