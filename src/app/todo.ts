export class Todo {
    id: string
    name: string
    createdAt: string

    constructor(id: string, name: string){
        this.id = id
        this.name = name
        this.createdAt = new Date().toUTCString()
    }
}