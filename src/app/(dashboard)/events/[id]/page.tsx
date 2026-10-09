"use client";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deliveryAttempts, events, formatRelative } from "@/lib/mock-data";
import { ArrowLeft, Check, Clock, Copy, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id;
  const event = events.find((e) => e.id === id);
  const [copied, setCopied] = useState(false);
  if (!event) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Event not found.</p>
        <Link href="/events">
          <Button variant="outline" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </div>
    );
  }
  const endpointName = event.endpointId;
  const attempts = deliveryAttempts.filter((a) => a.eventId === event.id);
  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(event.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/events">
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
            <h1 className="font-mono text-xl font-semibold tracking-tight">
              {event.id}
            </h1>
            <StatusBadge status={event.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {event.type} · {endpointName} · {formatRelative(event.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* JSON payload viewer */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Payload</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={copyJson}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md border border-border bg-secondary p-4 font-mono text-xs leading-relaxed">
              <code>{JSON.stringify(event.payload, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Delivery attempts timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Delivery Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            {attempts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No delivery attempts yet. Event is queued.
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {attempts.map((attempt, idx) => {
                  const Icon = attempt.success ? Check : X;
                  return (
                    <div
                      key={attempt.id}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* Timeline line */}
                      {idx < attempts.length - 1 && (
                        <div className="absolute bottom-0 left-3.5 top-7 w-px bg-border" />
                      )}
                      {/* Icon */}
                      <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Attempt {attempt.attemptNumber}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatRelative(attempt.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-mono">
                            {attempt.statusCode ?? "—"}
                          </span>
                          {attempt.responseBody && (
                            <>
                              <span>·</span>
                              <span className="truncate max-w-xs">
                                {attempt.responseBody}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Event metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Event Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Event Type</p>
              <p className="font-mono text-sm">{event.type}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Endpoint</p>
              <p className="text-sm">{endpointName}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Created At</p>
              <p className="text-sm">
                {new Date(event.createdAt).toISOString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
