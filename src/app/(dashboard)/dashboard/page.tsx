'use client';

import Link from 'next/link';
import {
  Zap,
  Check,
  X,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/status-badge';
import { events, endpoints, formatRelative } from '@/lib/mock-data';

const totalEvents = events.length;
const delivered = events.filter((e) => e.status === 'DELIVERED').length;
const failed = events.filter((e) => e.status === 'FAILED').length;
const pending = events.filter((e) => e.status === 'PENDING' || e.status === 'DELIVERING').length;

const stats = [
  { label: 'Total Events', value: totalEvents.toLocaleString(), icon: Zap, delta: '+12.3%' },
  { label: 'Delivered', value: delivered.toLocaleString(), icon: Check, delta: '+8.1%' },
  { label: 'Failed', value: failed.toLocaleString(), icon: X, delta: '-3.2%' },
  { label: 'Pending', value: pending.toLocaleString(), icon: Clock, delta: '+1.4%' },
];

const getEndpointName = (endpointId: string) => {
  const endpoint = endpoints.find((e) => e.id === endpointId);
  return endpoint?.name ?? endpointId;
};

export default function DashboardPage() {
  const recentEvents = events.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your webhook delivery performance
        </p>
      </div>

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
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-muted-foreground">{stat.delta} vs last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Throughput</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-end gap-1.5">
            {[40, 55, 45, 60, 72, 68, 80, 75, 88, 82, 95, 90, 78, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-foreground/15 hover:bg-foreground/30 transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>14 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Endpoint</TableHead>
                  <TableHead className="hidden md:table-cell text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-mono text-xs">
                      <Link href={`/events/${event.id}`} className="hover:underline">
                        {event.id}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">{event.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={event.status} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {getEndpointName(event.endpointId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right text-muted-foreground text-xs">
                      {formatRelative(event.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}