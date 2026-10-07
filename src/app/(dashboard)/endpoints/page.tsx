'use client'
import { EndpointStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Copy,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EndpointsPage() {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const filtered = endpoints.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.url.toLowerCase().includes(search.toLowerCase()),
  );
  const getEventCount = (endpointId: string) =>
    events.filter((e) => e.endpointId === endpointId).length;
  const resetForm = () => {
    setName("");
    setUrl("");
  };
  const handleCreate = () => {
    // TODO: wire to endpointApi.create() - for now, just close
    setCreateOpen(false);
    resetForm();
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Endpoints</h1>
          <p className="text-sm text-muted-foreground">
            Manage your webhook destinations
          </p>
        </div>
        <Dialog
          open={createOpen}
          onOpenChange={(open) => {
            setCreateOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger
            render={
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                New Endpoint
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Endpoint</DialogTitle>
              <DialogDescription>
                Add a new webhook destination
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="My Webhook"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Destination URL</Label>
                <Input
                  id="url"
                  placeholder="https://api.example.com/webhook"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Must start with https://
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                render={
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                }
              />
              <Button
                onClick={handleCreate}
                disabled={!name || !url.startsWith("https://")}
                className="cursor-pointer"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0">
          <CardTitle className="text-base">All Endpoints</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search endpoints..."
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
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Events
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-right">
                    Created
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No endpoints found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((ep) => (
                    <TableRow key={ep.id}>
                      <TableCell>
                        <Link
                          href={`/endpoints/${ep.id}`}
                          className="font-medium hover:underline"
                        >
                          {ep.name}
                        </Link>
                        <div className="font-mono text-xs text-muted-foreground md:hidden">
                          {ep.url}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground max-w-xs truncate">
                        {ep.url}
                      </TableCell>
                      <TableCell>
                        <EndpointStatusBadge isActive={ep.isActive} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right tabular-nums">
                        {getEventCount(ep.id).toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right text-muted-foreground text-xs">
                        {formatRelative(ep.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Copy className="mr-2 h-4 w-4" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
