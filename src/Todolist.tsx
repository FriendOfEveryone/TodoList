import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {CheckBox} from "./components/CheckBox";

type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   todoListID: string
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string, todoListID: string) => void
   changeFilter: (todoListId: string, value: FilterValuesType) => void
   addTask: (todoListID: string, title: string) => void
   changeTaskStatus: (todoTaskID: string, taskId: string, isDone: boolean) => void
   filter: FilterValuesType
   removeToDoList: (todoListId: string) => void
   changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
   changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {

   const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");

   const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");

   const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

   const removeToDoListHandler = () => {
      props.removeToDoList(props.todoListID)
   }

   const addTaskHandler = (title: string) => {
      props.addTask(props.todoListID, title);
   }

   const changeTaskTitleHandler = (taskID: string, newTitle: string) => {
      props.changeTaskTitle(props.todoListID, taskID, newTitle)
   }

   const changeTodolistTitleHandler = (newTitle: string) => {
      props.changeTodolistTitle(props.todoListID, newTitle)
   }

   const ChangeStatusHandler = (taskID: string, isDone: boolean) => {
      props.changeTaskStatus(props.todoListID ,taskID, isDone)
   }

   return <div>
      <h3><EditableSpan oldTitle={props.title} callback={changeTodolistTitleHandler}/>
         <IconButton aria-label={'delete'} onClick={removeToDoListHandler}>
            <DeleteIcon/>
         </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler}/>
      <ul>
         {
            props.tasks.map(t => {
               const onClickDeleteHandler = () => props.removeTask(props.todoListID, t.id)

               return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                  <CheckBox callback={(isDone)=>ChangeStatusHandler(t.id, isDone)} checked={t.isDone}/>
                  <EditableSpan key={t.id} oldTitle={t.title}
                                callback={(newTitle) => changeTaskTitleHandler(t.id, newTitle)}/>
                  <IconButton aria-label={'delete'} onClick={onClickDeleteHandler}>
                     <DeleteIcon/>
                  </IconButton>
               </li>
            })
         }
      </ul>
      <div>
         <Button variant={props.filter === 'all' ? 'outlined' : 'contained'} color={'success'}
                 onClick={onAllClickHandler}>
            All
         </Button>
         <Button variant={props.filter === 'active' ? 'outlined' : 'contained'} color={'error'}
                 onClick={onActiveClickHandler}>
            Active
         </Button>
         <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'} onClick={onCompletedClickHandler}>
            Completed
         </Button>
      </div>
   </div>
}
