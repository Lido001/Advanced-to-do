// "use client";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "./ui/input";
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { ImCancelCircle } from "react-icons/im";
// import { FaCheckCircle } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { deleteTask, editTask, toggleComplete } from "@/redux/taskSlice";

// const Taskgrid = () => {
//   const [newdata, setNewData] = useState("");
//   const [newpriority, setNewpriority] = useState("Medium");
//   const [editid, setEditid] = useState<number | null>(null);
//   const [fromDate, setFromDate] = useState<any | undefined>();
//   const [newAssign, setNewAssign] = useState("");
//   const [newStatus, setNewStatus] = useState("On Progress...");
//   const [toDate, setToDate] = useState<any | undefined>();
//   const [isFromOpen, setIsFromOpen] = useState(false);
//   const [isToOpen, setIsToOpen] = useState(false);

//   const dispatch = useDispatch<AppDispatch>();
//   const tasks = useSelector((state: RootState) => state.tasks.list);

//   const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);
//   const filtered = tasks.filter((task) =>
//     task.data.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {filtered.length === 0 ? (
//         <div className="col-span-full text-center text-gray-500 py-6">
//           No tasks available ❕
//         </div>
//       ) : (
//         filtered.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md p-4 space-y-4"
//           >
//             <div className="flex items-center justify-between">
//               <Checkbox
//                 checked={item.completed}
//                 onCheckedChange={() => dispatch(toggleComplete(item.id))}
//               />
//               <div className="flex gap-2">
//                 <FaEdit
//                   className="text-xl text-green-500 cursor-pointer"
//                   onClick={() => {
//                     setEditid(item.id);
//                     setNewData(item.data);
//                     setNewpriority(item.priority);
//                     setFromDate(item.from);
//                     setToDate(item.to);
//                     setNewAssign(item.assign);
//                   }}
//                 />
//                 <AiFillDelete
//                   className="text-xl text-red-500 cursor-pointer"
//                   onClick={() => dispatch(deleteTask(item.id))}
//                 />
//               </div>
//             </div>

//             {editid === item.id ? (
//               <>
//                 <Input
//                   value={newdata}
//                   onChange={(e) => setNewData(e.target.value)}
//                   placeholder="Edit task..."
//                 />
//                 <Input
//                   value={newAssign}
//                   onChange={(e) => setNewAssign(e.target.value)}
//                   placeholder="Edit assignee..."
//                 />
//                 <div className="flex flex-col gap-4">
//                   <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className="w-full">
//                         {fromDate ? format(fromDate, "PP") : "From Date"}
//                       </Button>
//                     </PopoverTrigger>
//                     {isFromOpen && (
//                       <div
//                         className="fixed inset-0 bg-black/50 z-40"
//                         onClick={() => setIsFromOpen(false)}
//                       />
//                     )}
//                     <PopoverContent className="z-50 bg-white p-4 rounded shadow">
//                       <Calendar
//                         mode="single"
//                         selected={fromDate}
//                         onSelect={setFromDate}
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   <Popover open={isToOpen} onOpenChange={setIsToOpen}>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className="w-full">
//                         {toDate ? format(toDate, "PP") : "To Date"}
//                       </Button>
//                     </PopoverTrigger>
//                     {isToOpen && (
//                       <div
//                         className="fixed inset-0 bg-black/50 z-40"
//                         onClick={() => setIsToOpen(false)}
//                       />
//                     )}
//                     <PopoverContent className="z-50 bg-white p-4 rounded shadow">
//                       <Calendar
//                         mode="single"
//                         selected={toDate}
//                         onSelect={setToDate}
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>

//                 <select
//                   value={newpriority}
//                   onChange={(e) => setNewpriority(e.target.value)}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>

//                 <select
//                   value={newStatus}
//                   onChange={(e) => setNewStatus(e.target.value)}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="Completed">Completed</option>
//                   <option value="On Progress...">On Progress</option>
//                   <option value="Pending">Pending</option>
//                 </select>

//                 <div className="flex justify-end gap-3">
//                   <FaCheckCircle
//                     className="text-2xl text-green-500 cursor-pointer"
//                     onClick={() => {
//                       dispatch(
//                         editTask({
//                           id: item.id,
//                           data: newdata,
//                           priority: newpriority,
//                           assign: newAssign,
//                           status: newStatus,
//                           from: fromDate?.toString(),
//                           to: toDate?.toString(),
//                         })
//                       );

//                       setNewData("");
//                       setNewpriority("Medium");
//                       setNewStatus("On Progress...");
//                       setFromDate(undefined);
//                       setToDate(undefined);
//                       setEditid(null);
//                     }}
//                   />
//                   <ImCancelCircle
//                     className="text-2xl text-red-500 cursor-pointer"
//                     onClick={() => {
//                       setNewData("");
//                       setNewAssign("");
//                       setNewpriority("Medium");
//                       setFromDate(undefined);
//                       setToDate(undefined);
//                       setEditid(null);
//                     }}
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p
//                   className={`text-lg font-semibold ${
//                     item.completed ? "line-through text-gray-400" : ""
//                   }`}
//                 >
//                   {item.data}
//                 </p>
//                 <p className="text-sm text-gray-500 truncate">
//                   Assignee: {item.assign || "--"}
//                 </p>
//                 <p className="text-sm">
//                   From: {item.from ? format(new Date(item.from), "PP") : "--"}
//                 </p>
//                 <p className="text-sm">
//                   To: {item.to ? format(new Date(item.to), "PP") : "--"}
//                 </p>
//                 <span
//                   className={`inline-block px-3 py-1 text-sm text-white rounded-full ${
//                     item.priority === "High"
//                       ? "bg-red-500"
//                       : item.priority === "Medium"
//                       ? "bg-yellow-500"
//                       : "bg-green-500"
//                   }`}
//                 >
//                   {item.priority}
//                 </span>
//                 <span
//                   className={`inline-block px-3 py-1 text-sm text-white rounded-full ${
//                     item.status === "Pending"
//                       ? "bg-red-500"
//                       : item.status === "On Progress..."
//                       ? "bg-yellow-500"
//                       : "bg-green-500"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Taskgrid;

"use client";
import React from 'react';
import { deleteTask, toggleComplete, editTask } from '@/redux/taskSlice';
import { Trash2, Pencil, CheckCircle } from 'lucide-react';
import { AppDispatch, RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const TaskGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);

  const filtered = tasks.filter((task) =>
    task.data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 bg-gray-100 font-semibold text-gray-700 px-6 py-3 rounded-t-xl">
        <div className="col-span-2">Task</div>
        <div>Assigned</div>
        <div>Status</div>
        <div>Priority</div>
        <div>From - To</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Task Rows */}
      <AnimatePresence mode="popLayout">
        {filtered.map((task: any) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            layout
            className={`grid grid-cols-7 items-center px-6 py-3 border-b text-sm transition 
              ${task.completed ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50'}
            `}
          >
            {/* Task Data */}
            <div className="col-span-2">
              <p
                className={`truncate text-lg w-[320px] ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-black"
                }`}
              >
                {task.data}
              </p>
            </div>

            {/* Assigned */}
            <div>
              <p className="w-[160px] truncate">{task.assign}</p>
            </div>

            {/* Status */}
            <div>
              <span className={`
                px-2 py-1 text-xs rounded-full font-medium 
                ${task.status === 'Completed' && 'bg-green-100 text-green-600'}
                ${task.status === 'On Progress...' && 'bg-blue-100 text-blue-600'}
                ${task.status === 'Pending' && 'bg-yellow-100 text-yellow-600'}
              `}>
                {task.status}
              </span>
            </div>

            {/* Priority */}
            <div>
              <span className={`
                px-2 py-1 text-xs rounded-full font-medium
                ${task.priority === 'High' && 'bg-red-100 text-red-600'}
                ${task.priority === 'Medium' && 'bg-yellow-100 text-yellow-600'}
                ${task.priority === 'Low' && 'bg-green-100 text-green-600'}
              `}>
                {task.priority}
              </span>
            </div>

            {/* From - To */}
            <div className="text-xs text-gray-500">
              {task.from || 'N/A'} <span className="text-gray-400">to</span> {task.to || 'N/A'}
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => dispatch(toggleComplete(task.id))}
                title="Mark Complete"
                className="text-green-500 hover:text-green-700 transition"
              >
                <CheckCircle size={18} />
              </button>
              <button
                onClick={() => dispatch(editTask(task))}
                title="Edit"
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                title="Delete"
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}

        {/* No Results Message */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-5 text-gray-500 text-center text-sm"
          >
            No tasks match your search.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskGrid;


























// "use client";
// import React from 'react';
// import { deleteTask, toggleComplete, editTask } from '@/redux/taskSlice';
// import { Trash2, Pencil, CheckCircle } from 'lucide-react';
// import { AppDispatch, RootState } from '@/redux/store';
// import { useSelector,useDispatch } from 'react-redux';

// const TaskGrid: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const tasks = useSelector((state:RootState) => state.tasks.list);
//   const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);
//   const filtered = tasks.filter((task) =>
//     task.data.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="mt-6 bg-white shadow-md rounded-xl overflow-hidden">
//       <div className="grid grid-cols-7 bg-gray-100 font-semibold text-gray-700 px-6 py-3">
//         <div className="col-span-2">Task</div>
//         <div>Assigned</div>
//         <div>Status</div>
//         <div>Priority</div>
//         <div>From - To</div>
//         <div className="text-right">Actions</div>
//       </div>

//       {filtered.map((task:any) => (
//         <div
//           key={task.id}
//           className={`grid grid-cols-7 items-center px-6 py-3 border-b text-sm transition 
//             ${task.completed ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50'}
//           `}
//         >
//           {/* Task data */}
//           <div className="col-span-2">
//           <p
//                         className={`truncate text-lg w-[320px] ${
//                           task.completed
//                             ? "line-through text-gray-500"
//                             : "text-black"
//                         }`}
//                       >
//                         {task.data}
//                       </p>
//           </div>

//           {/* Assigned */}
//           <div><p className="w-[160px] truncate">{task.assign}</p></div>

//           {/* Status */}
//           <div>
//             <span className={`
//               px-2 py-1 text-xs rounded-full font-medium 
//               ${task.status === 'Completed' && 'bg-green-100 text-green-600'}
//               ${task.status === 'On Progress...' && 'bg-blue-100 text-blue-600'}
//               ${task.status === 'Pending' && 'bg-yellow-100 text-yellow-600'}
//             `}>
//               {task.status}
//             </span>
//           </div>

//           {/* Priority */}
//           <div>
//             <span className={`
//               px-2 py-1 text-xs rounded-full font-medium
//               ${task.priority === 'High' && 'bg-red-100 text-red-600'}
//               ${task.priority === 'Medium' && 'bg-yellow-100 text-yellow-600'}
//               ${task.priority === 'Low' && 'bg-green-100 text-green-600'}
//             `}>
//               {task.priority}
//             </span>
//           </div>

//           {/* From - To */}
//           <div className="text-xs text-gray-500">
//             {task.from || 'N/A'} <span className="text-gray-400">to</span> {task.to || 'N/A'}
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end items-center gap-3">
//             <button
//               onClick={() => dispatch(toggleComplete(task.id))}
//               title="Mark Complete"
//               className="text-green-500 hover:text-green-700 transition"
//             >
//               <CheckCircle size={18} />
//             </button>
//             <button
//               onClick={() => dispatch(editTask(task))} // You might need to pass the right structure to open edit mode
//               title="Edit"
//               className="text-blue-500 hover:text-blue-700 transition"
//             >
//               <Pencil size={18} />
//             </button>
//             <button
//               onClick={() => dispatch(deleteTask(task.id))}
//               title="Delete"
//               className="text-red-500 hover:text-red-700 transition"
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskGrid;
