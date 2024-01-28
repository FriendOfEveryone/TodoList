import {v1} from "uuid";
import {TodoListsType} from "../AppWithRedux";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistReducer
} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const todolistID1 = v1();
const todolistID2 = v1();

const startState: Array<TodoListsType> = [
   {id: todolistID1, title: 'What to learn', filter: 'all'},
   {id: todolistID2, title: 'What to buy', filter: 'all'},
]

const tasks = {
   [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
   ],
   [todolistID2]: [
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Jam", isDone: true},
      {id: v1(), title: "Apple", isDone: false},
   ],
};

test ('add todolist with empty tasks', () => {

   const action = addTodolistAC('New Todolist');

   const endState = todolistReducer(startState, action);
   const endTasks = tasksReducer(tasks, action)

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe('New Todolist');

   expect(endTasks[action.payload.todolistID]).toBeDefined();
});

test ('remove todolist and tasks with id of todolist', () => {
   const action = removeTodolistAC(todolistID1);

   const endState = todolistReducer(startState, action);
   const endTasks = tasksReducer(tasks, action)

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistID2);

   expect(endTasks[todolistID1]).not.toBeDefined();
   expect(endTasks[todolistID2]).toBeDefined();

})

test ('change todolist title', () => {
   const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID1, 'What to write'));

   expect(endState.length).toBe(2);
   expect(endState[0].title).toBe('What to write');
})

test ('change todolist filter', () => {
   const endState = todolistReducer(startState, changeTodolistFilterAC(todolistID1, 'completed'));

   expect(endState.length).toBe(2);
   expect(endState[0].filter).toBe('completed');
})