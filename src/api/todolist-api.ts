import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1',
   withCredentials: true
})

export const todolistApi = {
   getTodos() {
      return instance.get<TodolistType[]>('/todo-lists')
   },

   createTodolist(payload: {title: string}) {
      return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', payload)
   },

   deleteTodolist (todoId: string) {
      return instance.delete<ResponseType>(`/todo-lists/${todoId}`)
   },

   updateTodolist(todoId: string, title: string) {
      return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title})
   }
}

type ResponseType<T = {}> = {
   resultCode: number
   messages: string[]
   fieldErrors: string[]
   data: T
}

type TodolistType = {
   id?: string
   title: string
   addedDate: Date
   order?: number
}
