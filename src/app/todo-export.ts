import { Todo } from './todo'

export class TodoExportSchema {
    name: string
    version: number
    date: string
    todos: Todo[]

    constructor(version: number, date: string, todos: Todo[]){
        this.name = 'AngularTodosFile'
        this.version = version
        this.date = date
        this.todos = todos
    }
}