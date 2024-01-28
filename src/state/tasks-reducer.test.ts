import {v1} from "uuid";
import {
   addTaskAC,
   changeTaskStatusAC,
   changeTaskTitleAC,
   removeTaskAC,
   tasksReducer
} from "./tasks-reducer";

const todolistID1 = v1();
const todolistID2 = v1();

const startState = {
   [todolistID1]: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false},
      {id: '4', title: "Rest API", isDone: false},
      {id: '5', title: "GraphQL", isDone: false},
   ],
   [todolistID2]: [
      {id: '1', title: "Bread", isDone: true},
      {id: '2', title: "Milk", isDone: false},
      {id: '3', title: "Jam", isDone: true},
      {id: '4', title: "Apple", isDone: false},
   ],
};

test('add task', () => {
   const endState = tasksReducer(startState, addTaskAC(todolistID1, 'New Task'))

   expect(endState[todolistID1].length).toBe(6);
   expect(endState[todolistID1][5].title).toBe('New Task');
   expect(endState[todolistID1][5].isDone).toBe(false);
   expect(endState[todolistID1][5].id).toBeDefined();
})

test('remove task', () => {
   const endState = tasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][1].id));

   expect(endState[todolistID1].length).toBe(4);
   expect(endState[todolistID1][1].title).toBe('ReactJS');
})

test('change task status', () => {
   const endTasks = tasksReducer(startState, changeTaskStatusAC(todolistID1, startState[todolistID1][0].id, true));

   expect(endTasks[todolistID1].length).toBe(5);
   expect(endTasks[todolistID1][0].isDone).toBe(false);
   expect(endTasks[todolistID2][0].isDone).toBe(true);
   expect(endTasks[todolistID1][0].title).toBe('HTML&CSS');
})

test('change task title', () => {
   const endTasks = tasksReducer(startState, changeTaskTitleAC(todolistID1, startState[todolistID1][0].id, 'New Task Title'));

   expect(endTasks[todolistID1].length).toBe(5);
   expect(endTasks[todolistID1][0].title).toBe('New Task Title');
   expect(endTasks[todolistID2][0].title).toBe('Bread');
   expect(endTasks[todolistID1][1].title).toBe('JS');
})