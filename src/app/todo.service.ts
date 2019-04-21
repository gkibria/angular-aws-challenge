import { Injectable } from '@angular/core';
import { Todo } from './todo'
import { v4 as uuid } from 'uuid'
import _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Todo[]{
    let localItem = JSON.parse(localStorage.getItem('todos'))
    return localItem == null ? [] : localItem.todos
  }

  addTodo(text: string): void{
    let todo = new Todo(uuid() , text)
    // console.log(todo)
    let todos = this.getTodos()
    todos.unshift(todo)
    // save localstorage
    this.setLocalTodo(todos)
  }

  editTodo(todo: Todo): void {
    let todos = this.getTodos();
    let found = _.find(todos, {id: todo.id})
    todos[todos.indexOf(found)] = todo
    this.setLocalTodo(todos);
  }

  removeTodo(todo: Todo): void {
    let todos = this.getTodos();
    let found = _.find(todos, {id: todo.id})
    console.log(found)
    todos.splice(todos.indexOf(found), 1)
    this.setLocalTodo(todos);
  }

  private setLocalTodo(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }))
  }
}
