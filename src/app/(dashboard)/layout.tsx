import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
