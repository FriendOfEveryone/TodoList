import {FilterValuesType, TodoListsType} from "../AppWithRedux";
import {v1} from "uuid";

export const ADD_TODOLIST = 'ADD-TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

export type AddTodolistActionType = {
   type: typeof ADD_TODOLIST
   payload: {
      todolistID: string
      title: string
   }
}

export type RemoveTodolistActionType = {
   type: typeof REMOVE_TODOLIST
   payload: {
      todolistID: string
   }
}

type ChangeTodolistTitleActionType = {
   type: typeof CHANGE_TODOLIST_TITLE
   payload: {
      todolistID: string
      title: string
   }
}

type ChangeTodolistFilterActionType = {
   type: typeof CHANGE_TODOLIST_FILTER
   payload: {
      todolistID: string
      filter: FilterValuesType
   }
}

export type ActionTodolistsTypes = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType |
   ChangeTodolistFilterActionType

const initialTodolists: Array<TodoListsType> = []

export const todolistReducer = (state = initialTodolists, action: ActionTodolistsTypes): Array<TodoListsType> => {
   const {type, payload} = action
   switch (type) {
      case ADD_TODOLIST: {
         const {todolistID, title} = payload
         const newTodolist: TodoListsType = {id: todolistID, title: title, filter: 'all'};
         return [newTodolist, ...state];
      }
      case REMOVE_TODOLIST: {
         const {todolistID} = payload
         return state.filter(el => el.id !== todolistID);
      }
      case CHANGE_TODOLIST_TITLE: {
         const {todolistID, title} = payload
         return state.map(el => el.id === todolistID ? {...el, title: title} : el);
      }
      case CHANGE_TODOLIST_FILTER: {
         const {todolistID, filter} = payload
         return state.map(el => el.id === todolistID ? {...el, filter: filter} : el);
      }
      default: return state
   }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
   return {
      type: ADD_TODOLIST,
      payload: {
         todolistID: v1(), title
      }
   }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
   return {type: REMOVE_TODOLIST, payload: {todolistID}}
}

export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
   return {
      type: CHANGE_TODOLIST_TITLE,
      payload: {
         todolistID, title
      }

   }
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
   return {
      type: CHANGE_TODOLIST_FILTER,
      payload: {
         todolistID, filter
      }

   }
}