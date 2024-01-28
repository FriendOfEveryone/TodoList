import React, {FC, useCallback, useMemo} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {CheckBox} from "./components/CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {MyButton} from "./MyButton";
import {Task} from "./Task";

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type TodolistPropsType = {
   todolistID: string
   title: string
   filter: FilterValuesType
}

export const TodolistWithRedux: FC<TodolistPropsType> = React.memo((props) => {
   console.log('TodolistWithRedux')

   const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
   const dispatch = useDispatch();

   const allTasksForTodolist = tasks;
   let tasksForTodolist = allTasksForTodolist;

   useMemo(() => {
      if (props.filter === "active") {
         tasksForTodolist = allTasksForTodolist.filter(t => !t.isDone);
      }
      if (props.filter === "completed") {
         tasksForTodolist = allTasksForTodolist.filter(t => t.isDone);
      }
      return tasksForTodolist
   }, [allTasksForTodolist, props.filter]);


   const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistID, "all")), [dispatch, props.todolistID]);

   const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistID, "active")), [dispatch, props.todolistID]);

   const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistID, "completed")), [dispatch, props.todolistID]);

   const removeToDoListHandler = useCallback(() => {
      dispatch(removeTodolistAC(props.todolistID));
   }, [dispatch]);

   const addTaskHandler = useCallback((title: string) => {
      dispatch(addTaskAC(props.todolistID, title));
   }, [dispatch])

   const changeTodolistTitleHandler = useCallback((newTitle: string) => {
      dispatch(changeTodolistTitleAC(props.todolistID, newTitle));
   }, [dispatch, props.todolistID])

   return <div>
      <h3><EditableSpan oldTitle={props.title} callback={changeTodolistTitleHandler}/>
         <IconButton aria-label={'delete'} onClick={removeToDoListHandler}>
            <DeleteIcon/>
         </IconButton>
      </h3>
      <AddItemForm callback={addTaskHandler}/>
      <ul>
         {
            tasksForTodolist.map(t => {
               return <Task key={t.id} task={t} todolistID={props.todolistID}/>
            })
         }
      </ul>
      <div>
         <MyButton variant={props.filter === 'all' ? 'outlined' : 'contained'} color={'success'}
                   title={'All'} callback={onAllClickHandler}/>
         <MyButton variant={props.filter === 'active' ? 'outlined' : 'contained'} color={'error'}
                   title={'Active'} callback={onActiveClickHandler}/>
         <MyButton variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                   title={'Completed'} callback={onCompletedClickHandler}/>
      </div>
   </div>
});
