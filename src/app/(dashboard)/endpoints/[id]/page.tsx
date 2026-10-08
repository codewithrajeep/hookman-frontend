"use client";
import { EndpointStatusBadge, StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { endpoints, events, formatRelative } from "@/lib/mock-data";
import {
  Activity,
  ArrowLeft,
  Check,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type React from "react";

export default function EndpointDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const endpoint = endpoints.find((e) => e.id === id);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  if (!endpoint) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Endpoint not found.</p>
        <Link href="/endpoints">
          <Button variant="outline" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Endpoints
          </Button>
        </Link>
      </div>
    );
  }
  const endpointEvents = events.filter((e) => e.endpointId === endpoint.id);
  const totalEvents = endpointEvents.length;
  const delivered = endpointEvents.filter(
    (e) => e.status === "DELIVERED",
  ).length;
  const failed = endpointEvents.filter((e) => e.status === "FAILED").length;
  const successRate =
    totalEvents > 0 ? Math.round((delivered / totalEvents) * 100) : 0;
  const copySecret = () => {
    navigator.clipboard.writeText(endpoint.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const stats: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { label: "Total Events", value: totalEvents.toLocaleString(), icon: Zap },
    { label: "Delivered", value: delivered.toLocaleString(), icon: Check },
    { label: "Failed", value: failed.toLocaleString(), icon: X },
    { label: "Success Rate", value: `${successRate}%`, icon: Activity },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/endpoints">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {endpoint.name}
            </h1>
            <EndpointStatusBadge isActive={endpoint.isActive} />
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            {endpoint.url}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <div className="text-2xl font-semibold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Endpoint info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Endpoint Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Endpoint ID</p>
              <p className="font-mono text-sm">{endpoint.id}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Created</p>
              <p className="text-sm">{formatRelative(endpoint.createdAt)}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                Destination URL
              </p>
              <p className="font-mono text-sm break-all">{endpoint.url}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                Signing Secret
              </p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm">
                  {showSecret ? endpoint.secret : "••••••••••••••••••••"}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={copySecret}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                {copied && (
                  <span className="text-xs text-muted-foreground">Copied</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Events</CardTitle>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Created
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpointEvents.length > 0 ? (
                  endpointEvents.map((event) => (
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
                      <TableCell className="hidden md:table-cell text-right text-xs text-muted-foreground">
                        {formatRelative(event.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No events for this endpoint yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
