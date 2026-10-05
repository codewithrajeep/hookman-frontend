"use client";
import { toast } from "@/components/ui/toast";
import { getSocket } from "@/lib/socket";
import { useEffect } from "react";

interface DeliverySuccessEvent {
  eventId: string;
  endpointId: string;
  attemptNumber: number;
  statusCode: number;
}

interface DeliveryFailedEvent {
  eventId: string;
  endpointId: string;
  attemptNumber: number;
  statusCode: number | null;
  reason: string;
}

export function useSocketEvents() {
  useEffect(() => {
    const socket = getSocket();
    const handleSuccess = (data: DeliverySuccessEvent) => {
      toast.add({
        type: "success",
        description: `Event delivered (attempt ${data.attemptNumber})`,
      });
    };
    const handleFailed = (data: DeliveryFailedEvent) => {
      const label =
        data.reason === "MAX_ATTEMPTS_EXHAUSTED"
          ? "Max attempts exhausted"
          : data.reason === "NON_RETRYABLE_STATUS"
            ? `Non-retryable status code: ${data.statusCode ?? "error"}`
            : data.reason;
      toast.add({
        type: "error",
        description: `Delivery failed: ${label}`,
        priority: "high",
      });
    };
    socket.on("delivery:success", handleSuccess);
    socket.on("delivery:failed", handleFailed);
    return () => {
      socket.off("delivery:success", handleSuccess);
      socket.off("delivery:failed", handleFailed);
    };
  }, []);
}

export function SocketEventsProvider() {
  useSocketEvents();
  return null;
}
