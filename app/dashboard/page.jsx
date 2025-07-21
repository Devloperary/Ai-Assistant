"use client";
import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/sidebar/contexts/sidebar-context";
import { ThemeProvider } from "@/components/sidebar/contexts/theme-context";
import { AppSidebar } from "@/components/AppSidebar";
import "@/app/globals.css";
import {
  UserButton
} from "@clerk/nextjs";

export default function Page() {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <div className="flex min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white">
          <AppSidebar />
          <div>
            <div> <UserButton /></div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>


        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
}
