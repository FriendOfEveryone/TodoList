import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
   RequestStatusType,
   setErrorAC,
   SetErrorActionType,
   setRequestStatusAC,
   SetRequestStatusActionType
} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.id)
      case 'ADD-TODOLIST':
         return [{...action.todolist, entityStatus: 'idle', filter: 'all'}, ...state]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      case 'SET-TODOLISTS':
         return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
      case 'CHANGE-ENTITY-STATUS': {
         return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
      }
      default:
         return state
   }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeEntityStatusAC = (id: string, status: RequestStatusType) => ({
   type: 'CHANGE-ENTITY-STATUS',
   status,
   id
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
   type: 'CHANGE-TODOLIST-TITLE',
   id,
   title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
   type: 'CHANGE-TODOLIST-FILTER',
   id,
   filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
   return (dispatch: Dispatch<ActionsType>) => {
      todolistsAPI.getTodolists()
         .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setRequestStatusAC('succeeded'))
         })
   }
}
export const removeTodolistTC = (todolistId: string) => {
   return (dispatch: Dispatch<ActionsType>) => {
      dispatch(setRequestStatusAC('loading'))
      dispatch(changeEntityStatusAC(todolistId, 'loading'))
      todolistsAPI.deleteTodolist(todolistId)
         .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setRequestStatusAC('succeeded'))
         })
         .catch(e => {
            dispatch(setRequestStatusAC('failed'))
            dispatch(changeEntityStatusAC(todolistId, 'idle'))
            dispatch(setErrorAC(e.message))
         })
   }
}
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch<ActionsType>) => {
      dispatch(setRequestStatusAC('loading'))
      todolistsAPI.createTodolist(title)
         .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setRequestStatusAC('succeeded'))
         })
   }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
   return (dispatch: Dispatch<ActionsType>) => {
      dispatch(setRequestStatusAC('loading'))
      dispatch(changeEntityStatusAC(id, 'loading'))
      todolistsAPI.updateTodolist(id, title)
         .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setRequestStatusAC('succeeded'))
         })
   }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof changeEntityStatusAC>
   | SetTodolistsActionType
   | SetRequestStatusActionType
   | SetErrorActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   entityStatus: RequestStatusType
   filter: FilterValuesType
}

export enum RESULT_CODE {
   SUCCEEDED = 0,
   ERROR = 1,
   CAPTCHA = 2
}