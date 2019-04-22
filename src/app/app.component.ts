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

  tab: string = 'add'

  searchText: string = ''
  searchDate: string = ''
  todoFiltered: boolean = false

  filterTodo(): void {
    // console.log('filter')
    if(this.searchText){
      this.todoFiltered = true
      this.todos = this.todoService.searchByName(this.searchText)
    }
  }

  filterTodoByDate(): void {
    // console.log(this.searchDate)
    if(this.searchDate){
      this.todoFiltered = true
      this.todos = this.todoService.searchByDate(this.searchDate)
    }
  }

  removeFilter(): void {
    this.todoFiltered = false
    this.searchText = ''
    this.searchDate = ''
    this.refreshList()
  }

  private refreshList(): void{
    this.todos = this.todoService.getTodos()
  }
}
