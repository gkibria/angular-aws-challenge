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

  aws: object = {
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    bucket: ''
  }

  importURL: string = ''

  importList(): void {
    if(this.importURL){
      this.todoService.downloadFromS3(this.importURL)
        .subscribe(result => {
          // check json schema
          if(result.hasOwnProperty('name') && result['name'] == 'AngularTodosFile'){
            // import for version 1
            if(result['version'] == 1){
              this.todoService.setLocalTodo(result['todos'])
              this.refreshList()
            }
          }else{
            alert('Invalid File')
          }
        })
    }
  }

  exportList(): void{
    if(this.aws['accessKeyId'] && this.aws['secretAccessKey'] && this.aws['region'] && this.aws['bucket']){
      this.todoService.uploadToS3(this.aws)
    }else{
      alert('All AWS credential is required')
    }
    
  }

  private refreshList(): void{
    this.todos = this.todoService.getTodos()
  }
}
