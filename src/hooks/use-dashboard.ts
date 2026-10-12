"use client";

import { eventApi, statsApi } from "@/lib/api";
import { ApiResponse, Event, OverallStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useOverallStats() {
  return useQuery({
    queryKey: ["stats", "overall"],
    queryFn: async () => {
      const res = (await statsApi.getOverall()) as ApiResponse<OverallStats>;
      return res.data;
    },
  });
}

export function useRecentEvents() {
  return useQuery({
    queryKey: ["events", "recent"],
    queryFn: async () => {
      const res = (await eventApi.list()) as ApiResponse<Event[]>;
      return res.data;
    },
  });
}
