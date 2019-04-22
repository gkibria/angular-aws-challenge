import { Injectable } from '@angular/core';
import { Todo } from './todo'
import { v4 as uuid } from 'uuid'
import _ from 'lodash'
import * as moment from 'moment'

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
    let todo = new Todo(uuid() , text.trim())
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

  searchByName(searchText: string): Todo[] {
    let reg = new RegExp(searchText, 'i');
    let todos = this.getTodos()
    return todos.filter(item =>{
      return item.name.match(reg)
    })
  }

  searchByDate(searchDate: string): Todo[]{
    let dt = moment(searchDate).format('DD MMM YYYY')
    let reg = new RegExp(dt, 'i');
    let todos = this.getTodos()
    return todos.filter(item => {
      return item.createdAt.match(reg)
    })
  }

  private setLocalTodo(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }))
  }
}
