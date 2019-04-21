import { Component } from '@angular/core';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private todoService: TodoService){}

  todos = this.todoService.getTodos()

  refreshList(): void{
    this.todos = this.todoService.getTodos()
  }
}
