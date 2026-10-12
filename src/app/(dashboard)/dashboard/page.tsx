"use client";

import Link from "next/link";
import {
  Zap,
  Check,
  X,
  Clock,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { events, endpoints, formatRelative } from "@/lib/mock-data";
import { useOverallStats, useRecentEvents } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";

const totalEvents = events.length;
const delivered = events.filter((e) => e.status === "DELIVERED").length;
const failed = events.filter((e) => e.status === "FAILED").length;
const pending = events.filter(
  (e) => e.status === "PENDING" || e.status === "DELIVERING",
).length;

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useOverallStats();
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents,
  } = useRecentEvents();
  const recentEvents = events?.slice(0, 6) ?? [];
  const statsCards = [
    {
      label: "Total Events",
      value: stats?.events.total ?? 0,
      icon: Zap,
      delta: "+0%",
    },
    {
      label: "Delivered",
      value: stats?.events.DELIVERED ?? 0,
      icon: Check,
      delta: "+0%",
    },
    {
      label: "Failed",
      value: stats?.events.FAILED ?? 0,
      icon: X,
      delta: "+0%",
    },
    {
      label: "Pending",
      value: (stats?.events.PENDING ?? 0) + (stats?.events.DELIVERING ?? 0),
      icon: Clock,
      delta: "+0%",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your webhook delivery performance
        </p>
      </div>
      {/* Stats Card */}
      {statsError ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              Failed to load stats.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchStats()}
              className="cursor-pointer"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {statsLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : (
                      stat.value.toLocaleString()
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-muted-foreground">
                      {stat.delta} vs last week
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {/* Throughput chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Throughput</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-end gap-1.5">
            {[40, 55, 45, 60, 72, 68, 80, 75, 88, 82, 95, 90, 78, 85].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-foreground/15 transition-colors hover:bg-foreground/30"
                  style={{ height: `${h}%` }}
                />
              ),
            )}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>14 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
      {/* Recent events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Events</CardTitle>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          {eventsError ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Failed to load events.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchEvents()}
                className="cursor-pointer"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Endpoint
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-right">
                      Created
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-muted-foreground"
                      >
                        <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : recentEvents.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No events yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono text-xs">
                          <Link
                            href={`/events/${event.id}`}
                            className="hover:underline"
                          >
                            {event.id}
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.type}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={event.status} />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">
                          {event.endpointId}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-right text-xs text-muted-foreground">
                          {formatRelative(event.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
