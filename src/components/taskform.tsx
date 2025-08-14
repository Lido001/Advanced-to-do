"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, DeleteIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/slice/store";
import { toast } from "sonner";
import { TbAlertOctagonFilled, TbFlaskFilled } from "react-icons/tb";
import { createTodo } from "@/api/services/todoservice";
import { fetchTodos } from "@/redux/taskSlice";

const Taskform = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState("");
  const [assign, setAssign] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("On Progress...");
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<any | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const resetform = () => {
    setData("");
    setAssign("");
    setDate(undefined);
    setPriority("Medium");
    setStatus("On Progress...");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.trim()) {
      setValidationMessage("Please Enter a task !");
      setShowDialog(true);
      return;
    }
    if (!assign) {
      setValidationMessage("Please assign the task !");
      setShowDialog(true);
      return;
    }
    if (!date?.from && !date?.to) {
      const today = new Date();
      const oneweek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      setDate({ from: today, to: oneweek });
      console.log(today);
      toast.info("Date Range Set to 1 Week From Today !", {
        description: `${today.toDateString()} to ${oneweek.toDateString()}`,
        duration: 4000,
      });

      return;
    }
    setIsOpen(false);

    try {
      await createTodo({
        data,
        priority,
        assign,
        status,
        from: date?.from.toISOString(),
        to: date?.to?.toISOString(),
        completed: false,
      });
      await dispatch(fetchTodos());
      resetform();
      toast.success("Task added!", {
        description: "It will appear in your list shortly.",
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to add task. Please try again.", {
        description: "There was an error while adding the task.",
      });
    }

    setIsOpen(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-12 my-12 mx-6 w-[40rem]"
      >
        <div className="flex items-center">
          <Label className="text-nowrap">Enter Task :</Label>
          <Input
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Add Task..."
            className="ms-6"
          />
        </div>

        <div className="flex items-center gap-x-6">
          <div className="flex items-center w-full">
            <Label className="text-nowrap">Task Assignee :</Label>
            <Input
              type="text"
              value={assign}
              onChange={(e) => {
                setAssign(e.target.value);
              }}
              placeholder="Enter Task Assignee..."
              className="ms-4"
            />
          </div>

          <div className="flex items-center">
            <Label className="text-nowrap">Set Duration :</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={`justify-start text-left font-normal ms-4 w-[14rem] ${
                    !date?.from ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-gray-500">Pick a date Range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 bg-white rounded-lg shadow-lg z-50">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => {
                    setDate({ from: range?.from, to: range?.to });
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center gap-x-6 ">
          <div className="flex items-center w-full">
            <Label className="text-nowrap">Set Priority :</Label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full outline-1 rounded-lg py-1.5 px-2 ms-4"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center w-full">
            <Label className="text-nowrap">Set Status :</Label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="w-full outline-1 rounded-lg py-1.5 px-2 ms-4"
            >
              <option value="Completed">Completed</option>
              <option value="On Progress...">On Progress...</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Add
        </Button>
      </form>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-x-3">
              Missing Information
              <TbAlertOctagonFilled className="text-red-500 text-2xl" />
            </AlertDialogTitle>
            <AlertDialogDescription>{validationMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Taskform;
