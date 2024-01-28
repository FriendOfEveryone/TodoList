import React, {FC, useCallback} from 'react';
import {CheckBox} from "./components/CheckBox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodolistWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

type TaskPropsType = {
   task: TaskType
   todolistID: string
}


export const Task: FC<TaskPropsType> = React.memo(({task, todolistID}) => {

   const dispatch = useDispatch();

   const changeTaskTitleHandler = useCallback((taskID: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(todolistID, taskID, newTitle));
   }, [dispatch, todolistID])

   const changeTaskStatusHandler = useCallback((taskID: string, isDone: boolean) => {
      dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
   }, [dispatch, todolistID])

   const onClickDeleteHandler = () => dispatch(removeTaskAC(todolistID, task.id))

   console.log('Task')

      return (
         <li
            className={task.isDone ? "is-done" : ""}>
            < CheckBox
               callback={(isDone) => changeTaskStatusHandler(task.id, isDone)}
               checked={task.isDone}
            />
            <EditableSpan key={task.id} oldTitle={task.title}
                          callback={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}/>
            <IconButton aria-label={'delete'} onClick={onClickDeleteHandler}>
               <DeleteIcon/>
            </IconButton>
         </li>
      )
         ;
})
