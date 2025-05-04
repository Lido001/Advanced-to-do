import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: number
        data: string
        priority: string
        assign: string
        completed:boolean
        status: string
        from?:any,
        to?:any,
}
interface TaskState {
    searchTerm:string;
    viewMode :"list"|"grid";
    list:Task[];
}
const initialState: TaskState = {
    searchTerm: "",
    viewMode: "list",
    list : [],
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        // setData:(state,action:PayloadAction<string>)=>{
        //     state.data = action.payload;
        // },
        addTask: (state, action: PayloadAction<{ id:Number; completed:Boolean;data: string; priority: string; assign:string; status: string; from?:any, to?: any, }>) => {
            const newTask: Task = {
                id: Date.now(),
                data: action.payload.data,
                priority: action.payload.priority,
                assign: action.payload.assign,
                completed: false,
                status: action.payload.status,
                // date : action.payload.date,
                from: action.payload.from.toString(),               
                to: action.payload.to.toString(),
            };
            state.list.push(newTask);
          },
        
          editTask: (state, action: PayloadAction<{
            id: number;
            data: string;
            priority: string;
            assign: string;
            status: string;
            from?: any;
            to?: any;
          }>) => {
            const index = state.list.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
              state.list[index] = {
                ...state.list[index],
                ...action.payload
              };
            }
          },
          
          deleteTask: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(task => task.id !== action.payload);
          },
          toggleComplete: (state, action: PayloadAction<number>) => {
            const task = state.list.find(t => t.id === action.payload);
            if (task) {
              task.completed = !task.completed;
            }
          },
          setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
            state.viewMode = action.payload;
          },
          setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
          },
        

    },
});
export const {addTask,editTask,deleteTask,toggleComplete,setSearchTerm,setViewMode} =taskSlice.actions;
export default taskSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the Task structure
// interface Task {
//   id: number;
//   data: string;
//   priority: string;
//   assign: string;
//   completed: boolean;
//   status: "completed" | "onProgress" | "pending"; // status is now an enum type
//   from?: any;
//   to?: any;
// }

// // Define the state structure for the tasks
// interface TaskState {
//   searchTerm: string;
//   viewMode: "list" | "grid";
//   list: Task[];
// }

// // Initial state for tasks
// const initialState: TaskState = {
//   searchTerm: "",
//   viewMode: "list",
//   list: [],
// };

// // Create the slice with reducers for handling tasks
// const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     // Add a new task
//     addTask: (
//       state,
//       action: PayloadAction<{
//         data: string;
//         priority: string;
//         assign: string;
//         status: "completed" | "onProgress" | "pending"; // Define status here
//         from?: any;
//         to?: any;
//       }>
//     ) => {
//       const newTask: Task = {
//         id: Date.now(),
//         data: action.payload.data,
//         priority: action.payload.priority,
//         assign: action.payload.assign,
//         completed: false, // New tasks are initially not completed
//         status: action.payload.status, // status defined by the user
//         from: action.payload.from?.toString(),
//         to: action.payload.to?.toString(),
//       };
//       state.list.push(newTask);
//     },

//     // Edit a task
//     editTask: (
//       state,
//       action: PayloadAction<{
//         id: number;
//         data: string;
//         priority: string;
//         assign: string;
//         status: "completed" | "onProgress" | "pending"; // status defined here
//         from?: any;
//         to?: any;
//       }>
//     ) => {
//       const index = state.list.findIndex((task) => task.id === action.payload.id);
//       if (index !== -1) {
//         state.list[index] = {
//           ...state.list[index],
//           ...action.payload, // Update task with the new data
//         };
//       }
//     },

//     // Delete a task
//     deleteTask: (state, action: PayloadAction<number>) => {
//       state.list = state.list.filter((task) => task.id !== action.payload);
//     },

//     // Toggle the completion status of a task
//     toggleComplete: (state, action: PayloadAction<number>) => {
//       const task = state.list.find((t) => t.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//       }
//     },

//     // Set the view mode (list or grid)
//     setViewMode: (state, action: PayloadAction<"list" | "grid">) => {
//       state.viewMode = action.payload;
//     },

//     // Set the search term
//     setSearchTerm: (state, action: PayloadAction<string>) => {
//       state.searchTerm = action.payload;
//     },

//     // Set task status directly (for example, moving a task from "onProgress" to "completed")
//     setTaskStatus: (
//       state,
//       action: PayloadAction<{
//         id: number;
//         status: "completed" | "onProgress" | "pending"; // Allow status to be updated directly
//       }>
//     ) => {
//       const task = state.list.find((t) => t.id === action.payload.id);
//       if (task) {
//         task.status = action.payload.status;
//       }
//     },
//   },
// });

// // Export actions to use in your components
// export const {
//   addTask,
//   editTask,
//   deleteTask,
//   toggleComplete,
//   setSearchTerm,
//   setViewMode,
//   setTaskStatus, // Export the new status setter
// } = taskSlice.actions;

// // Export the reducer to be included in the store
// export default taskSlice.reducer;

