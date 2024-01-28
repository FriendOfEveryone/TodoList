import {TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import {ADD_TODOLIST, REMOVE_TODOLIST, AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

type AddTaskActionType = {
   type: typeof ADD_TASK
   payload: {
      todolistID: string
      title: string
   }
}

type RemoveTaskActionType = {
   type: typeof REMOVE_TASK
   payload: {
      todolistID: string
      taskID: string
   }
}

type ChangeTaskStatusActionType = {
   type: typeof CHANGE_TASK_STATUS
   payload: {
      todolistID: string
      taskID: string
      isDone: boolean
   }
}

type ChangeTaskTitleActionType = {
   type: typeof CHANGE_TASK_TITLE
   payload: {
      todolistID: string
      taskID: string
      title: string
   }
}

export type ActionsTasksType = AddTaskActionType | AddTodolistActionType | RemoveTodolistActionType | RemoveTaskActionType
   | ChangeTaskStatusActionType | ChangeTaskTitleActionType

const initialTasks: TasksType = {}

export const tasksReducer = (state = initialTasks, action: ActionsTasksType): TasksType => {
   const {type, payload} = action
   switch (type) {
      case ADD_TASK: {
         const {todolistID, title} = payload
         const newTask = {id: v1(), title: title, isDone: false}
         return {...state, [todolistID]: [...state[todolistID], newTask]}
      }
      case ADD_TODOLIST: {
         const {todolistID} = payload
         return {...state, [todolistID]: []}
      }
      case REMOVE_TASK: {
         const {todolistID, taskID} = payload
         return {...state, [todolistID]: state[todolistID].filter(task => task.id != taskID)}
      }
      case REMOVE_TODOLIST: {
         const {todolistID} = payload
         const copyState = state;
         delete copyState[todolistID]
         return copyState
      }

      case CHANGE_TASK_STATUS: {
         const {todolistID, taskID, isDone} = payload
         return {
            ...state,
            [todolistID]:
               state[todolistID].map(task => task.id === taskID ?
               {...task, isDone: isDone} : task)
         }
      }
      case CHANGE_TASK_TITLE: {
         const {todolistID, taskID, title} = payload
         return {
            ...state, [todolistID]: state[todolistID].map(task => task.id === taskID ?
               {...task, title: title} : task)
         }
      }
      default:
         return state
   }
}

export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
   return {
      type: ADD_TASK,
      payload: {
         todolistID,
         title
      }
   }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
   return {
      type: REMOVE_TASK,
      payload: {
         todolistID,
         taskID
      }
   }
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
   return {
      type: CHANGE_TASK_STATUS,
      payload: {
         todolistID,
         taskID,
         isDone
      }
   }
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
   return {
      type: CHANGE_TASK_TITLE,
      payload: {
         todolistID,
         taskID,
         title
      }
   }
}

