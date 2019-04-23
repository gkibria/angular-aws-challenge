import { Injectable } from '@angular/core';
import { Todo } from './todo'
import { v4 as uuid } from 'uuid'
import _ from 'lodash'
import * as moment from 'moment'
// import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { TodoExportSchema } from './todo-export'
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

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

  uploadToS3(aws){
    // console.log(aws)
    let todos = this.getTodos()
    const exportFormat = new TodoExportSchema(1, new Date().toUTCString(), todos)
    const bucket = new S3({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: aws.region
    })
    const params = {
      Bucket: aws.bucket,
      Key: 'todolist.json',
      Body: JSON.stringify(exportFormat),
      ACL: 'public-read',
      ContentType: 'application/json'
    }

    bucket.upload(params, (err, data) => {
      if(err){
        alert('Something is wrong')
        console.log(err)
      }else{
        console.log(data)
        alert(`File: ${data.Location}`)
      }
    })
  }

  downloadFromS3(url: string){
    return this.http.get(url)
  }

  setLocalTodo(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }))
  }
}
