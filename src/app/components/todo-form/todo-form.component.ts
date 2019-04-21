import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../todo.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  text: string = ""

  @Output() change = new EventEmitter()

  addTodo(): void {
    if(this.text){
      this.todoService.addTodo(this.text)
      this.text = ""
      this.change.emit()
    }
  }

  ngOnInit() {
  }

}
