'use client';
import * as React from 'react';
import Link from 'next/link';
import { PanelLeft, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardNav } from '@/components/dashboard-nav';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <aside
        className={cn(
          'hidden md:flex flex-col border-r bg-muted/40 transition-all',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6 text-primary" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </div>
        <div className="flex-1 py-4">
          <DashboardNav isCollapsed={isCollapsed} />
        </div>
        <div className="mt-auto p-4">
            <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                size="icon"
                variant="outline"
                className="h-10 w-10"
            >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-16 md:hidden flex h-16 items-center gap-4 border-b bg-background px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                >
                  <Briefcase className="h-5 w-5" />
                  <span className="sr-only">WorkFlow Connect</span>
                </Link>
                <DashboardNav isCollapsed={false} />
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
