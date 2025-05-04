"use client";
import TaskForm from "@/components/taskform";
import TaskGrid from "@/components/taskgrid";
import TaskList from "@/components/tasklist";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import myImg from "@/images/bell.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSearchTerm } from "@/redux/taskSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm);

  return (
    <div>
      <div className="flex flex-col gap-y-12">
        <header className="w-full flex flex-col gap-y-8">
          <div className="flex items-center justify-between p-2.5 px-5 bg-white rounded-3xl">
            <IoIosSearch className="absolute left-79 top-11.4" />
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search Task..."
              className="w-2/6 py-4 px-2 ps-12 rounded-2xl bg-[#f2f1f0] "
            />
            <div className="flex items-center gap-x-10">
              <Image src={myImg} alt={""} width={30} height={30} />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex items-center justify-between px-3">
            <div className="bg-black rounded-lg">
              <span>
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "default" : "outline"}
                  className="border-none outline-none cursor-pointer"
                >
                  <IoIosList />
                </Button>
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className="border-none outline-none cursor-pointer"
                >
                  <BsGrid />
                </Button>
              </span>
            </div>
            <div>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button className="cursor-pointer">Add Task</Button>
                </PopoverTrigger>
                {isOpen && (
                  <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
                    onClick={() => setIsOpen(false)}
                  />
                )}
                <PopoverContent
                  className="fixed right-28 bottom-0 transform -translate-x-50 translate-y-100 
                  w-auto p-4 bg-white rounded-lg shadow-lg z-50"
                >
                  <TaskForm />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>
        {viewMode === "list" ? <TaskList /> : <TaskGrid />}
      </div>
    </div>
  );
};

export default Home;
