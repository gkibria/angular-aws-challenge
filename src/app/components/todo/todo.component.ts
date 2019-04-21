import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TodoService } from '../../todo.service'
import { Todo } from '../../todo'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  @Output() change = new EventEmitter()

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    
  }

  editTodo(todo: Todo): void{
    let text = prompt(todo.name)
    if(text){
      todo.name = text
      // console.log(text)
      this.todoService.editTodo(todo)
    }
  }

  deleteTodo(todo: Todo): void{
    // console.log(todo)
    this.todoService.removeTodo(todo)
    this.change.emit()
  }

}
