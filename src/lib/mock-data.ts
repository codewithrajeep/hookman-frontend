import { DeadLetterEvent, DeliveryAttempt, Endpoint, Event } from "@/types";

// ---------- Mock Endpoints ----------
export const endpoints: Endpoint[] = [
  {
    id: "ep_2kL9mX3",
    name: "Billing Webhook",
    url: "https://api.acme.com/webhooks/billing",
    secret: "whsec_8f2a9b3c1d7e4f6a",
    isActive: true,
    userId: "user_1",
    createdAt: "2025-11-12T09:14:00Z",
    updatedAt: "2025-11-12T09:14:00Z",
  },
  {
    id: "ep_9pQ4nK7",
    name: "Order Notifications",
    url: "https://orders.shop.dev/hooks/main",
    secret: "whsec_3c8d2e1f9a6b7c0d",
    isActive: true,
    userId: "user_1",
    createdAt: "2025-10-28T14:30:00Z",
    updatedAt: "2025-10-28T14:30:00Z",
  },
  {
    id: "ep_1aB5cD8",
    name: "User Sync",
    url: "https://crm.internal.app/sync/user",
    secret: "whsec_7e1f4a2b8c9d0e3f",
    isActive: false,
    userId: "user_1",
    createdAt: "2025-09-15T11:00:00Z",
    updatedAt: "2025-09-15T11:00:00Z",
  },
  {
    id: "ep_6fG2hJ9",
    name: "Analytics Pipeline",
    url: "https://data.metrics.io/ingest/webhook",
    secret: "whsec_2b9c6d3e8f1a4b7c",
    isActive: true,
    userId: "user_1",
    createdAt: "2025-08-03T16:45:00Z",
    updatedAt: "2025-08-03T16:45:00Z",
  },
  {
    id: "ep_3rT8yU1",
    name: "Slack Alerts",
    url: "https://hooks.slack.com/services/T00/B00/XX00",
    secret: "whsec_9d4e1f8a2c3b6d7e",
    isActive: true,
    userId: "user_1",
    createdAt: "2026-01-05T08:20:00Z",
    updatedAt: "2026-01-05T08:20:00Z",
  },
  {
    id: "ep_7mN4pQ2",
    name: "Legacy CRM Bridge",
    url: "https://old-crm.enterprise.net/hook",
    secret: "whsec_1a2b3c4d5e6f7a8b",
    isActive: false,
    userId: "user_1",
    createdAt: "2025-07-22T13:10:00Z",
    updatedAt: "2025-07-22T13:10:00Z",
  },
];
export const events: Event[] = [
  {
    id: "evt_01HX9K4M3P",
    type: "invoice.paid",
    payload: {
      event_type: "invoice.paid",
      data: { object: { id: "in_1AbcDef234", amount_paid: 4999 } },
    },
    status: "DELIVERED",
    endpointId: endpoints[0].id,
    createdAt: "2026-08-22T14:32:01Z",
  },
  {
    id: "evt_01HX9K3J2N",
    type: "order.created",
    payload: {
      event_type: "order.created",
      data: { object: { id: "ord_8821", total: 12999 } },
    },
    status: "DELIVERED",
    endpointId: endpoints[1].id,
    createdAt: "2026-08-22T14:28:45Z",
  },
  {
    id: "evt_01HX9K2F1M",
    type: "user.updated",
    payload: {
      event_type: "user.updated",
      data: { object: { id: "usr_4455", email: "jane@example.com" } },
    },
    status: "FAILED",
    endpointId: endpoints[2].id,
    createdAt: "2026-08-22T14:15:30Z",
  },
  {
    id: "evt_01HX9K1C0L",
    type: "metric.ingested",
    payload: {
      event_type: "metric.ingested",
      data: { metric: "cpu_usage", value: 0.73 },
    },
    status: "DELIVERED",
    endpointId: endpoints[3].id,
    createdAt: "2026-08-22T14:02:12Z",
  },
  {
    id: "evt_01HX9K0B9K",
    type: "alert.triggered",
    payload: {
      event_type: "alert.triggered",
      data: { alert: "high_error_rate", threshold: 0.05 },
    },
    status: "DELIVERING",
    endpointId: endpoints[4].id,
    createdAt: "2026-08-22T13:58:00Z",
  },
  {
    id: "evt_01HX9J9A8J",
    type: "invoice.paid",
    payload: {
      event_type: "invoice.paid",
      data: { object: { id: "in_1AbcDef233", amount_paid: 1999 } },
    },
    status: "DELIVERED",
    endpointId: endpoints[0].id,
    createdAt: "2026-08-22T13:45:22Z",
  },
  {
    id: "evt_01HX9J8B7H",
    type: "order.refunded",
    payload: {
      event_type: "order.refunded",
      data: { object: { id: "ord_8810", refund_amount: 4999 } },
    },
    status: "PENDING",
    endpointId: endpoints[1].id,
    createdAt: "2026-08-22T13:30:10Z",
  },
  {
    id: "evt_01HX9J7C6G",
    type: "user.deleted",
    payload: {
      event_type: "user.deleted",
      data: { object: { id: "usr_3301" } },
    },
    status: "FAILED",
    endpointId: endpoints[5].id,
    createdAt: "2026-08-22T13:12:55Z",
  },
];

// --------- Mock Delivery Attempts for Events ----------
export const deliveryAttempts: DeliveryAttempt[] = [
  // For evt_01HX9K4M3P
  {
    id: "att_1",
    eventId: events[0].id,
    attemptNumber: 1,
    statusCode: 200,
    responseBody: '{"status":"ok"}',
    success: true,
    createdAt: "2026-08-22T14:32:01Z",
  },
  // For evt_01HX9K3J2N
  {
    id: "att_2",
    eventId: events[1].id,
    attemptNumber: 1,
    statusCode: 200,
    responseBody: '{"status":"ok"}',
    success: true,
    createdAt: "2026-08-22T14:28:45Z",
  },
  // For evt_01HX9K2F1M (failed)
  {
    id: "att_3",
    eventId: events[2].id,
    attemptNumber: 1,
    statusCode: 503,
    responseBody: '{"error":"Service Unavailable"}',
    success: false,
    createdAt: "2026-08-22T14:15:30Z",
  },
  {
    id: "att_4",
    eventId: events[2].id,
    attemptNumber: 2,
    statusCode: 503,
    responseBody: '{"error":"Service Unavailable"}',
    success: false,
    createdAt: "2026-08-22T14:15:35Z",
  },
  {
    id: "att_5",
    eventId: events[2].id,
    attemptNumber: 3,
    statusCode: 504,
    responseBody: '{"error":"Gateway Timeout"}',
    success: false,
    createdAt: "2026-08-22T14:15:40Z",
  },
  // For evt_01HX9K1C0L
  {
    id: "att_6",
    eventId: events[3].id,
    attemptNumber: 1,
    statusCode: 204,
    responseBody: "",
    success: true,
    createdAt: "2026-08-22T14:02:12Z",
  },
  // For evt_01HX9K0B9K (retrying)
  {
    id: "att_7",
    eventId: events[4].id,
    attemptNumber: 1,
    statusCode: 429,
    responseBody: '{"error":"Too Many Requests"}',
    success: false,
    createdAt: "2026-08-22T13:58:00Z",
  },
  // For evt_01HX9J9A8J
  {
    id: "att_8",
    eventId: events[5].id,
    attemptNumber: 1,
    statusCode: 200,
    responseBody: '{"status":"ok"}',
    success: true,
    createdAt: "2026-08-22T13:45:22Z",
  },
  // For evt_01HX9J7C6G (failed)
  {
    id: "att_9",
    eventId: events[7].id,
    attemptNumber: 1,
    statusCode: 500,
    responseBody: '{"error":"Internal Server Error"}',
    success: false,
    createdAt: "2026-08-22T13:12:55Z",
  },
  {
    id: "att_10",
    eventId: events[7].id,
    attemptNumber: 2,
    statusCode: 500,
    responseBody: '{"error":"Internal Server Error"}',
    success: false,
    createdAt: "2026-08-22T13:13:00Z",
  },
];

// --------- Mock Dead Letter ----------
export const deadLetters: DeadLetterEvent[] = [
  {
    id: "dl_01HX9K2F1M",
    eventId: events[2].id,
    endpointId: endpoints[2].id,
    payload: events[2].payload,
    reason: "Max retry attempts exceeded (503 Service Unavailable)",
    createdAt: "2026-08-22T14:15:40Z",
  },
  {
    id: "dl_01HX9J7C6G",
    eventId: events[7].id,
    endpointId: endpoints[5].id,
    payload: events[7].payload,
    reason: "Endpoint returned 500 Internal Server Error",
    createdAt: "2026-08-22T13:13:00Z",
  },
  {
    id: "dl_01HX8F3E5D",
    eventId: "evt_01HX8F3E5D",
    endpointId: endpoints[0].id,
    payload: { event_type: "payment.failed", data: { amount: 1000 } },
    reason: "Connection timeout after 10s",
    createdAt: "2026-08-22T11:22:33Z",
  },
  {
    id: "dl_01HX7A2B3C",
    eventId: "evt_01HX7A2B3C",
    endpointId: endpoints[1].id,
    payload: { event_type: "order.created", data: { id: "ord_999" } },
    reason: "DNS resolution failed for host",
    createdAt: "2026-08-22T09:45:12Z",
  },
];

// --------- Helper: formatRelative ----------
export function formatRelative(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
