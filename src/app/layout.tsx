"use client";
import React from "react";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "@/components/ui/sonner";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex bg-[#f2f1f0]">
        {" "}
        <Provider store={store}>
          <div className="fixed h-screen w-64 bg-white shadow-lg">
            <Sidebar />
          </div>

          <main className="ml-64 p-6 w-full">
            <Toaster
              position="top-right"
              className="z-50 w-auto h-4"
              richColors
            />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
