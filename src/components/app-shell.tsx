"use client";
import {
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Webhook,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/endpoints", label: "Endpoints", icon: Webhook },
  { href: "/events", label: "Events", icon: Zap },
  { href: "/dead-letters", label: "Dead Letters", icon: Mail },
];

const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/endpoints", label: "Endpoints", icon: Webhook },
  { href: "/events", label: "Events", icon: Zap },
  { href: "/dead-letters", label: "Dead", icon: Mail },
];

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-foreground">
        <Webhook className="h-4 w-4 text-background" />
      </div>
      <span className="text-sm font-semibold tracking-tight">Hookman</span>
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer h-9 w-9"
        disabled
      >
        <Moon className="cursor-pointer h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer h-9 w-9"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="cursor-pointer h-4 w-4" />
      ) : (
        <Moon className="cursor-pointer h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function WSDot() {
  const [connected, setConnected] = React.useState(true);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setConnected((c) => c);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-2.5 py-1.5">
      <span
        className={cn(
          "h-2 w-2 rounded-full bg-foreground",
          connected && "animate-ws-pluse",
        )}
      />
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {connected ? "Live" : "Disconnected"}
      </span>
    </div>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer h-9 w-9 rounded-full"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary">
              <User className="h-3.5 w-3.5" />
            </div>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>john@acme.com</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="lg:inline xl:inline hidden">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" || pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-16 border-r border-border bg-background md:flex md:flex-col lg:w-60 xl:w-60">
        <div className="flex h-14 items-center px-4 border-b border-border">
          <span className="lg:hidden xl:hidden">
            <Logo />
          </span>
          <span className="hidden lg:inline xl:inline">
            <Logo />
          </span>
        </div>
        <SidebarContent />
        <div className="mt-auto px-3 pb-4 hidden lg:block xl:block">
          <div className="rounded-md border border-border bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Free Plan</p>
            <p className="mt-1 text-sm font-medium">1,000 events / mo</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/3 rounded-full bg-foreground" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:ml-16 lg:ml-60 xl:ml-60">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="px-4 pt-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4" onClick={() => setMobileOpen(false)}>
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
            <div className="md:hidden">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WSDot />
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 pb-24 md:px-6 md:py-8 md:pb-8 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-border bg-background py-2 md:hidden">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 text-xs",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
