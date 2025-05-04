
// "use client";

// import React, { createContext, useContext, useState } from 'react'

// interface Task {
//   id: number
//   data: string
//   priority: string
//   assign: string
//   completed:boolean
//   status: string
//   from?: Date;
//   to?: Date;
  
// };
// interface TaskContextType {
//   list : Task[];
//   Add:(data:string,priority:string,assign:string, status:string, date?: { from?: Date; to?: Date })=>void;
//   Edit:(id: number,newdata:string,newpriority:string,newAssign:string,newStatus:string, date?: { from?: Date; to?: Date })=>void;
//   Remove:(id:number)=>void;
//   Check: (id:number)=>void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
// }


// const TaskContext = createContext<TaskContextType | undefined>(undefined);
// const TaskProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
//   const [list, setList]=useState<Task[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const Add = (data:string,priority:string,assign:string,status:string, date?: { from?: Date; to?: Date }) => {
//     const addtask: Task={data,priority,id:Date.now(),completed:false,assign,status,from: date?.from, to: date?.to }
//     setList([...list,addtask])
//   };

//   const Edit = (id:number, newdata:string, newpriority:string,newAssign:string, newStatus:string, date?: { from?: Date; to?: Date }) => {
//     setList(list.map(task =>
//       task.id === id ? { ...task, data:newdata, priority:newpriority, assign:newAssign, status:newStatus, from: date?.from ?? task.from, to: date?.to ?? task.to,  } : task
//     )); 
//   };

//   const Remove = (id:number) =>{
//     setList(list.filter(task => task.id !== id))
//   };

//   const Check = (id:number) =>{
//     setList(list.map(task=>
//       task.id === id ? {...task,completed : !task.completed} : task
//     ));
//   };

//   return (
//     <TaskContext.Provider value={{list,Add , Edit, Remove,Check,searchTerm, setSearchTerm}}>{children}</TaskContext.Provider>
//   )
// }

// export default TaskProvider;

// export const useTaskContext=()=>{
//   const context = useContext(TaskContext);
//   if (!context) throw new Error("context is not working");
//   return(context)
// }

