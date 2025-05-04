// "use client";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@radix-ui/react-popover";
// import { format } from "date-fns";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   Table,
// } from "./ui/table";
// import { AppDispatch, RootState } from "@/redux/store";
// import { ImCancelCircle } from "react-icons/im";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteTask, editTask, toggleComplete } from "@/redux/taskSlice";
// import { CheckCircle, Pencil, Trash2 } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';

// const Tasklist = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [newdata, setNewData] = useState("");
//   const [newpriority, setNewpriority] = useState("Medium");
//   const [editid, setEditid] = useState<number | null>(null);
//   const [fromDate, setFromDate] = useState<any | undefined>();
//   const [newAssign, setNewAssign] = useState("");
//   const [newStatus, setNewStatus] = useState("On Progress...");
//   const [toDate, setToDate] = useState<any | undefined>();
//   const [isFromOpen, setIsFromOpen] = useState(false);
//   const [isToOpen, setIsToOpen] = useState(false);

//   const tasks = useSelector((state: RootState) => state.tasks.list);
//   const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);
//   const filtered = tasks.filter((task) =>
//     task.data.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="bg-white shadow-md pt-3 px-4 mb-2 rounded-2xl border border-gray-200 transition-all duration-300">
//       <Table>
//         <TableHeader>
//           <TableRow className="hover:bg-white text-base font-semibold text-gray-700 ">
//             <TableHead>
//               <Checkbox className="mx-4" checked={true} />
//             </TableHead>
//             <TableHead className="">Task</TableHead>
//             <TableHead>Assignee</TableHead>
//             <TableHead className="text-center">Priority</TableHead>
//             <TableHead className="text-center">Status</TableHead>
//             <TableHead className="text-center">From Date</TableHead>
//             <TableHead className="text-center">End Date</TableHead>
//             <TableHead className="text-center">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="px-4">
//           {tasks.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={8} className="text-center text-gray-500 py-6">
//                 No tasks available ❕
//               </TableCell>
//             </TableRow>
//           ) : filtered.length > 0 ? (
//             filtered.map((item) => (
//               <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               layout className={`border-b${item.completed ? "bg-gray-100 hover:bg-gray-100 text-gray-400 border-b":""}`}>
//                 <TableCell className="">
//                   <Checkbox
//                     checked={item.completed}
//                     onCheckedChange={() => {
//                       dispatch(toggleComplete(item.id));
//                     }}
//                     className="peer mx-4 "
//                   />
//                 </TableCell>
//                 {editid === item.id ? (
//                   <>
//                     <TableCell className="">
//                       <Input
//                         value={newdata}
//                         onChange={(e) => setNewData(e.target.value)}
//                         placeholder="Edit task..."
//                         className="flex-1 min-w-[150px]"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Input
//                         value={newAssign}
//                         onChange={(e) => {
//                           setNewAssign(e.target.value);
//                         }}
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <select
//                         value={newpriority}
//                         onChange={(e) => setNewpriority(e.target.value)}
//                         className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="High">High</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Low">Low</option>
//                       </select>
//                     </TableCell>
//                     <TableCell>
//                       <select
//                         value={newStatus}
//                         onChange={(e) => {
//                           setNewStatus(e.target.value);
//                         }}
//                         className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="Completed">Completed</option>
//                         <option value="On Progress...">On Progress</option>
//                         <option value="Pending">Pending</option>
//                       </select>
//                     </TableCell>

//                     <TableCell>
//                       <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
//                         <PopoverTrigger asChild>
//                           <Button variant="outline" className="w-full">
//                             {fromDate
//                               ? format(fromDate, "PP")
//                               : "Select From Date"}
//                           </Button>
//                         </PopoverTrigger>

//                         {isFromOpen && (
//                           <div
//                             className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
//                             onClick={() => setIsFromOpen(false)}
//                           />
//                         )}

//                         <PopoverContent
//                           className="fixed left-50 bottom-0 transform -translate-x-100 translate-y-25 
//                     w-auto p-4 bg-white rounded-lg shadow-lg z-50"
//                         >
//                           <Calendar
//                             mode="single"
//                             selected={fromDate}
//                             onSelect={setFromDate}
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </TableCell>

//                     <TableCell>
//                       <Popover open={isToOpen} onOpenChange={setIsToOpen}>
//                         <PopoverTrigger asChild>
//                           <Button variant="outline" className="w-full">
//                             {toDate ? format(toDate, "PP") : "Target Date"}
//                           </Button>
//                         </PopoverTrigger>

//                         {isToOpen && (
//                           <div
//                             className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
//                             onClick={() => setIsToOpen(false)}
//                           />
//                         )}

//                         <PopoverContent
//                           className="fixed right-50 bottom-0 transform translate-x-30 translate-y-25 
//                     w-auto p-4 bg-white rounded-lg shadow-lg z-50"
//                         >
//                           <Calendar
//                             mode="single"
//                             selected={toDate}
//                             onSelect={setToDate}
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </TableCell>

//                     <TableCell className="flex justify-between items-center mt-2.5 px-2.5">
//                       <button
//                         onClick={() => {
//                           dispatch(
//                             editTask({
//                               id: item.id,
//                               data: newdata,
//                               priority: newpriority,
//                               assign: newAssign,
//                               status: newStatus,
//                               from: fromDate?.toISOString(),
//                               to: toDate?.toISOString(),
//                             })
//                           );

//                           setNewData("");
//                           setNewpriority("Medium");
//                           setNewStatus("On Progress...");
//                           setFromDate(undefined);
//                           setToDate(undefined);
//                           setEditid(null);
//                         }}
//                         title="Mark Complete"
//                         className="text-green-500 hover:text-green-700 transition cursor-pointer"
//                       >
//                         <CheckCircle size={18} />
//                       </button>

//                       <ImCancelCircle
//                         size={18}
//                         className="text-red-500 cursor-pointer"
//                         onClick={() => {
//                           setNewData("");
//                           setNewAssign("");
//                           setNewpriority("Medium");
//                           setFromDate(undefined);
//                           setToDate(undefined);
//                           setEditid(null);
//                         }}
//                       />
//                     </TableCell>
//                   </>
//                 ) : (
//                   <>
//                     <TableCell>
//                       <p
//                         className={`truncate text-lg w-[350px] ${
//                           item.completed
//                             ? "line-through text-gray-500"
//                             : "text-black"
//                         }`}
//                       >
//                         {item.data}
//                       </p>
//                     </TableCell>
//                     <TableCell className="border-x-1">
//                       <p className="w-[180px] truncate">{item.assign}</p>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <span
//                         className={`
//               px-2 py-1 text-xs rounded-full font-medium
//               ${item.priority === "High" && "bg-red-100 text-red-600"}
//               ${item.priority === "Medium" && "bg-yellow-100 text-yellow-600"}
//               ${item.priority === "Low" && "bg-green-100 text-green-600"}
//             `}
//                       >
//                         {item.priority}
//                       </span>
//                     </TableCell>
//                     <TableCell className="border-x-1 text-center">
//                       <span
//                         className={`
//               px-2 py-1 text-xs rounded-full font-medium 
//               ${item.status === "Completed" && "bg-green-100 text-green-600"}
//               ${item.status === "On Progress..." && "bg-blue-100 text-blue-600"}
//               ${item.status === "Pending" && "bg-yellow-100 text-yellow-600"}
//             `}
//                       >
//                         {item.status}
//                       </span>
//                     </TableCell>

//                     {/* Display From & To Dates */}
//                     <TableCell className="text-center text-xs  text-gray-500">
//                       {item.from
//                         ? format(new Date(item.from), "LLL dd, yyyy")
//                         : "--"}
//                     </TableCell>
//                     <TableCell className="border-x-1 text-center text-xs  text-gray-500">
//                       {item.to
//                         ? format(new Date(item.to), "LLL dd, yyyy")
//                         : "--"}
//                     </TableCell>

                   

//                     {/* Actions */}
//                     <TableCell className="flex justify-between items-center mt-1.5 px-2.5">
//                       <button
//                         onClick={() => {
//                           setEditid(item.id);
//                           setNewData(item.data);
//                           setNewpriority(item.priority);
//                           setNewAssign(item.assign);
//                           setNewStatus(item.status);
//                           setFromDate(
//                             item.from ? new Date(item.from) : undefined
//                           );
//                           setToDate(item.to ? new Date(item.to) : undefined);
//                         }}
//                         title="Edit"
//                         className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       <button
//                         onClick={() => dispatch(deleteTask(item.id))}
//                         title="Delete"
//                         className="text-red-500 hover:text-red-700 transition cursor-pointer"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </TableCell>
//                   </>
//                 )}
//               </motion.tr>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={8} className="text-center text-gray-500 py-6">
//                 No tasks found ❗
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default Tasklist;

"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { AppDispatch, RootState } from "@/redux/store";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, toggleComplete } from "@/redux/taskSlice";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Tasklist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newdata, setNewData] = useState("");
  const [newpriority, setNewpriority] = useState("Medium");
  const [editid, setEditid] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<any | undefined>();
  const [newAssign, setNewAssign] = useState("");
  const [newStatus, setNewStatus] = useState("On Progress...");
  const [toDate, setToDate] = useState<any | undefined>();
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const tasks = useSelector((state: RootState) => state.tasks.list);
  const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);
  const filtered = tasks.filter((task) =>
    task.data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md pt-3 px-4 mb-2 rounded-2xl border border-gray-200 transition-all duration-300">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white text-base font-semibold text-gray-700">
            <TableHead>
              <Checkbox className="mx-4" checked={true} />
            </TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">From Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="px-4">
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-6">
                No tasks available ❕
              </TableCell>
            </TableRow>
          ) : filtered.length > 0 ? (
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`border-b ${
                    item.completed
                      ? "bg-gray-100 hover:bg-gray-100 text-gray-400"
                      : ""
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => {
                        dispatch(toggleComplete(item.id));
                      }}
                      className="peer mx-4"
                    />
                  </TableCell>

                  {editid === item.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={newdata}
                          onChange={(e) => setNewData(e.target.value)}
                          placeholder="Edit task..."
                          className="flex-1 min-w-[150px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={newAssign}
                          onChange={(e) => setNewAssign(e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <select
                          value={newpriority}
                          onChange={(e) => setNewpriority(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Completed">Completed</option>
                          <option value="On Progress...">On Progress</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                              {fromDate
                                ? format(fromDate, "PP")
                                : "Select From Date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4 bg-white rounded-lg shadow-lg z-50">
                            <Calendar
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Popover open={isToOpen} onOpenChange={setIsToOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                              {toDate ? format(toDate, "PP") : "Target Date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4 bg-white rounded-lg shadow-lg z-50">
                            <Calendar
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell className="flex justify-between items-center mt-2.5 px-2.5">
                        <button
                          onClick={() => {
                            dispatch(
                              editTask({
                                id: item.id,
                                data: newdata,
                                priority: newpriority,
                                assign: newAssign,
                                status: newStatus,
                                from: fromDate?.toISOString(),
                                to: toDate?.toISOString(),
                              })
                            );
                            setNewData("");
                            setNewpriority("Medium");
                            setNewStatus("On Progress...");
                            setFromDate(undefined);
                            setToDate(undefined);
                            setEditid(null);
                          }}
                          title="Save"
                          className="text-green-500 hover:text-green-700 transition cursor-pointer"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <ImCancelCircle
                          size={18}
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setNewData("");
                            setNewAssign("");
                            setNewpriority("Medium");
                            setFromDate(undefined);
                            setToDate(undefined);
                            setEditid(null);
                          }}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <p
                          className={`truncate text-lg w-[350px] ${
                            item.completed
                              ? "line-through text-gray-500"
                              : "text-black"
                          }`}
                        >
                          {item.data}
                        </p>
                      </TableCell>
                      <TableCell className="border-x-1">
                        <p className="w-[180px] truncate">{item.assign}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`
                            px-2 py-1 text-xs rounded-full font-medium
                            ${item.priority === "High" && "bg-red-100 text-red-600"}
                            ${item.priority === "Medium" && "bg-yellow-100 text-yellow-600"}
                            ${item.priority === "Low" && "bg-green-100 text-green-600"}
                          `}
                        >
                          {item.priority}
                        </span>
                      </TableCell>
                      <TableCell className="border-x-1 text-center">
                        <span
                          className={`
                            px-2 py-1 text-xs rounded-full font-medium
                            ${item.status === "Completed" && "bg-green-100 text-green-600"}
                            ${item.status === "On Progress..." && "bg-blue-100 text-blue-600"}
                            ${item.status === "Pending" && "bg-yellow-100 text-yellow-600"}
                          `}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-xs text-gray-500">
                        {item.from
                          ? format(new Date(item.from), "LLL dd, yyyy")
                          : "--"}
                      </TableCell>
                      <TableCell className="border-x-1 text-center text-xs text-gray-500">
                        {item.to
                          ? format(new Date(item.to), "LLL dd, yyyy")
                          : "--"}
                      </TableCell>
                      <TableCell className="flex justify-between items-center mt-1.5 px-2.5">
                        <button
                          onClick={() => {
                            setEditid(item.id);
                            setNewData(item.data);
                            setNewpriority(item.priority);
                            setNewAssign(item.assign);
                            setNewStatus(item.status);
                            setFromDate(
                              item.from ? new Date(item.from) : undefined
                            );
                            setToDate(item.to ? new Date(item.to) : undefined);
                          }}
                          title="Edit"
                          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => dispatch(deleteTask(item.id))}
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </TableCell>
                    </>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-6">
                No tasks found ❗
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasklist;

