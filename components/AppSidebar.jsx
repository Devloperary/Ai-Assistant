"use client";

import { useSidebar } from "@/components/sidebar/contexts/sidebar-context";
import { SidebarTrigger } from "@/components/ui/sidebar-trigger";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/components/sidebar/sidebarItems";
import {
  TooltipRoot as Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { LogIn, Moon, Sun } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useUser } from "@clerk/nextjs";
import { useTheme } from "@/components/sidebar/contexts/theme-context";

export function AppSidebar() {
  const { isOpen } = useSidebar();
  const { isSignedIn, user } = useUser();
  const { darkMode, setDarkMode } = useTheme();

  

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <aside
      className={cn(
        "h-screen transition-all duration-300 ease-in-out flex flex-col justify-between border-r",
        isOpen ? "w-64" : "w-16",
        "bg-[#dfdfdf] dark:bg-[#1e1e1e] text-black dark:text-white"
      )}
    >
      {/* Top: Logo and Trigger */}
      <div className="flex items-center justify-between px-3 py-4 border-b dark:border-gray-700">
        <div className={cn("flex items-center gap-2", isOpen ? "" : "justify-center w-full")}>
          {isOpen ? (
            <img src="/logo.png" alt="AI-Assist Logo" className="h-8 w-auto rounded-full" />
          ) : null}
          {isOpen && <span className="font-bold text-lg">AI-Assist</span>}
        </div>
        <div className={cn(isOpen ? "" : "mx-auto")}>
          <SidebarTrigger />
        </div>
      </div>

      {/* Middle: Navigation */}
      <nav className={cn("flex-1 overflow-y-auto space-y-4 px-1")}>
        <TooltipProvider>
          {sidebarItems.map((section, i) => (
            <div key={i} className="space-y-1">
              {section.items.map(({ name, icon: Icon }) => (
                <Tooltip key={name} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/${name.toLowerCase()}`}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-[#bebebe] cursor-pointer dark:hover:bg-[#2d2d2d] hover:rounded-lg transition-all",
                        !isOpen && "justify-center"
                      )}
                    >
                      <Icon size={20} />
                      {isOpen && <span>{name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right">
                      <span>{name}</span>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Bottom: Theme Toggle & Auth */}
      <div className="p-4 border-t dark:border-gray-700 space-y-4">
        <div className="flex justify-center border-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>

        <TooltipProvider>
          <SignedOut>
            <div className={cn("flex gap-2", !isOpen && "items-center justify-center")}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <SignInButton>
                    <button className="bg-transparent text-white rounded-full font-medium text-sm h-10 px-4 cursor-pointer w-full">
                      {isOpen ? "Sign In" : <LogIn size={20} />}
                    </button>
                  </SignInButton>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <span>Sign In</span>
                  </TooltipContent>
                )}
              </Tooltip>

              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <SignUpButton>
                    <button className="bg-white text-black rounded-full font-medium text-sm h-10 px-4 cursor-pointer w-full">
                      {isOpen ? "Sign Up" : "+"}
                    </button>
                  </SignUpButton>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <span>Sign Up</span>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </SignedOut>

          <SignedIn>
            <div className={cn("h-10 flex gap-4 items-center", !isOpen && "justify-center")}>
              <UserButton />
              {isOpen && (
                <div className="flex flex-col text-sm">
                  <span>{user?.username || user?.firstName || "User"}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-300">
                    {user?.emailAddresses?.[0]?.emailAddress || "No Email"}
                  </span>
                </div>
              )}
            </div>
          </SignedIn>
        </TooltipProvider>
      </div>
    </aside>
  );
}
