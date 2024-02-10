import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      const promise = todolistApi.getTodos();
      promise.then(res => {
         setState(res.data);
      })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      const payload = {title: 'NEW TODO'}
      todolistApi.createTodolist(payload)
         .then((res) => {
            setState(res.data)
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      const todoId = '1c3563d0-b834-44a2-abcb-05d5c1dfbf89'
      todolistApi.deleteTodolist(todoId)
         .then(res => {
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      const todoId = '1c3563d0-b834-44a2-abcb-05d5c1dfbf89'
      todolistApi.updateTodolist(todoId, 'OLD Title')
         .then(res => {
            setState(res.data);
         })
   }, []);

   return <div>{JSON.stringify(state)}</div>
}
