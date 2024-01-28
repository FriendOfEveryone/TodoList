import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
   id: string
   title: string
   filter: FilterValuesType
};
export type TasksType = {
   [key: string]: Array<{
      id: string
      title: string
      isDone: boolean
   }>
}

// const todoListID1 = v1();
// const todoListID2 = v1();

// const initialTodolists: Array<TodoListsType> = [
//    {id: todoListID1, title: "What to learn", filter: "all"},
//    {id: todoListID2, title: "What to buy", filter: "all"},
// ]
//
// const initialTasks: TasksType = {
//    [todoListID1]: [
//       {id: v1(), title: "HTML&CSS", isDone: true},
//       {id: v1(), title: "JS", isDone: true},
//       {id: v1(), title: "ReactJS", isDone: false},
//       {id: v1(), title: "Rest API", isDone: false},
//       {id: v1(), title: "GraphQL", isDone: false},
//    ],
//    [todoListID2]: [
//       {id: v1(), title: "Bread", isDone: false},
//       {id: v1(), title: "Milk", isDone: false},
//       {id: v1(), title: "Jam", isDone: true},
//       {id: v1(), title: "Apple", isDone: false},
//    ],
// }

export function AppWithRedux() {


   const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
   const dispatch = useDispatch();

   const AddTodolist = useCallback((title: string) => {
      dispatch(addTodolistAC(title));
   }, [dispatch])

   return (

      <div className="App">
         <ButtonAppBar/>
         <Container>
            <Grid container style={{padding: "20px"}}>
               <AddItemForm callback={AddTodolist}/>
            </Grid>
            <Grid container spacing={3} justifyContent={'space-around'}>
               {
                  todoLists.map((list) => {
                     return (
                        <Grid key={list.id} item justifyContent={'space-around'}>
                           <Paper elevation={3} style={{padding: "20px"}}>
                              <TodolistWithRedux todolistID={list.id}
                                                 title={list.title}
                                                 filter={list.filter}
                              />
                           </Paper>
                        </Grid>
                     )
                  })
               }
            </Grid>
         </Container>
      </div>
   );
}