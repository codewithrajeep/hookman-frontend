"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  deadLetters,
  deliveryAttempts,
  endpoints,
  events,
  formatRelative,
} from "@/lib/mock-data";
import { RotateCw, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DeadLettersPage() {
  const [search, setSearch] = useState("");
  const [replaying, setReplaying] = useState<string | null>(null);
  const getEventType = (eventId: string) =>
    events.find((e) => e.id === eventId)?.type ?? "—";
  const getEndpointName = (endpointId: string) =>
    endpoints.find((e) => e.id === endpointId)?.name ?? "—";
  const getAttempts = (eventId: string) =>
    deliveryAttempts.filter((a) => a.eventId === eventId).length;
  const filtered = deadLetters.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.eventId.toLowerCase().includes(q) ||
      getEventType(d.eventId).toLowerCase().includes(q) ||
      getEndpointName(d.endpointId).toLowerCase().includes(q)
    );
  });
  const handleReplay = (id: string) => {
    // TODO: wire to deliveryApi.replay(eventId) when real data is connected
    setReplaying(id);
    setTimeout(() => setReplaying(null), 1500);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dead Letters</h1>
        <p className="text-sm text-muted-foreground">
          Events that exhausted all retry attempts
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0">
          <CardTitle className="text-base">Failed Deliveries</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search dead letters..."
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
                  <TableHead className="hidden sm:table-cell">
                    Endpoint
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Reason</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">
                    Attempts
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Created
                  </TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No dead letters found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((dl) => (
                    <TableRow key={dl.id}>
                      <TableCell className="font-mono text-xs">
                        <Link
                          href={`/events/${dl.eventId}`}
                          className="hover:underline"
                        >
                          {dl.eventId}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        {getEventType(dl.eventId)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {getEndpointName(dl.endpointId)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate text-xs text-muted-foreground">
                        {dl.reason}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right tabular-nums">
                        {getAttempts(dl.eventId)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-xs text-muted-foreground">
                        {formatRelative(dl.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 cursor-pointer"
                          onClick={() => handleReplay(dl.id)}
                          disabled={replaying === dl.id}
                        >
                          <RotateCw
                            className={`mr-1.5 h-3.5 w-3.5 ${replaying === dl.id ? "animate-spin" : ""}`}
                          />
                          {replaying === dl.id ? "Replaying..." : "Replay"}
                        </Button>
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
