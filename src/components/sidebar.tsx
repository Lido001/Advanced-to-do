"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { Home, ListChecks } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    { name: "Add Task", href: "/", icon: <Home size={18} /> },
    { name: "All Tasks", href: "/task", icon: <ListChecks size={18} /> },
  ];
  return (
    <div>
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="flex items-center justify-center py-8 border-b">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                pathname === link.href
                  ? "bg-gray-900 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
