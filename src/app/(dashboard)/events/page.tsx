"use client";
import { endpoints, events, formatRelative } from "@/lib/mock-data";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const getEndpointName = (endpointId: string) => {
    const endpoint = endpoints.find((e) => e.id === endpointId);
    return endpoint?.name ?? endpointId;
  };
  const filtered = events.filter((e) => {
    const endpointName = getEndpointName(e.endpointId);
    const q = search.toLowerCase();
    return (
      e.id.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q) ||
      endpointName.toLowerCase().includes(q)
    );
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Events</h1>
        <p className="text-sm text-muted-foreground">
          All webhook events across endpoints
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0">
          <CardTitle className="text-base">Event Log</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
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
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((event) => (
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
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {getEndpointName(event.endpointId)}
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
        </CardContent>
      </Card>
    </div>
  );
}
