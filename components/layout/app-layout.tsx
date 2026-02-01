"use client";

import * as React from "react";
import { SidebarNav } from "./sidebar-nav";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen border-r bg-background transition-all duration-300 lg:block",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarNav isCollapsed={sidebarCollapsed} />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background lg:hidden">
            <SidebarNav
              isCollapsed={false}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex h-screen flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <Header onToggleSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>

      {/* Sidebar Toggle Button (Desktop) */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={cn(
          "fixed bottom-6 z-40 hidden h-10 w-10 items-center justify-center rounded-full border bg-background shadow-lg transition-all hover:scale-110 lg:flex",
          sidebarCollapsed ? "left-10" : "left-60"
        )}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          className={cn("h-4 w-4 transition-transform", !sidebarCollapsed && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
}
