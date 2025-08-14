"use client";
import React from "react";
import { Trash2, Pencil, CheckCircle } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/slice/store";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const TaskGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.user.list);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

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
              ${
                task.completed ? "bg-gray-50 text-gray-400" : "hover:bg-gray-50"
              }
            `}
          >
            {/* Task Data */}
            <div className="col-span-2">
              <p
                className={`truncate text-lg w-[320px] ${
                  task.completed ? "line-through text-gray-500" : "text-black"
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
              <span
                className={`
                px-2 py-1 text-xs rounded-full font-medium 
                ${task.status === "Completed" && "bg-green-100 text-green-600"}
                ${
                  task.status === "On Progress..." &&
                  "bg-blue-100 text-blue-600"
                }
                ${task.status === "Pending" && "bg-yellow-100 text-yellow-600"}
              `}
              >
                {task.status}
              </span>
            </div>

            {/* Priority */}
            <div>
              <span
                className={`
                px-2 py-1 text-xs rounded-full font-medium
                ${task.priority === "High" && "bg-red-100 text-red-600"}
                ${task.priority === "Medium" && "bg-yellow-100 text-yellow-600"}
                ${task.priority === "Low" && "bg-green-100 text-green-600"}
              `}
              >
                {task.priority}
              </span>
            </div>

            {/* From - To */}
            <div className="text-xs text-gray-500">
              {task.from || "N/A"} <span className="text-gray-400">to</span>{" "}
              {task.to || "N/A"}
            </div>

            {/* Actions */}
            {/* <div className="flex justify-end items-center gap-3">
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
            </div> */}
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
