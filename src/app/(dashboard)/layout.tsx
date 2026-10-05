import { AppShell } from "@/components/app-shell";
import { SocketEventsProvider } from "@/hooks/use-socket-events";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <SocketEventsProvider />
      {children}
    </AppShell>
  );
}
