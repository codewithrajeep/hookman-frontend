// ------------- Auth -------------
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ------------- API Keys -------------
export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
}

export interface CreateApiKeyResponse {
  name: string;
  rawKey: string;
  prefix: string;
}

// ------------- Endpoints -------------
export interface Endpoint {
  id: string;
  name: string;
  url: string;
  secret: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// ------------- Events -------------
export type EventStatus = "PENDING" | "DELIVERING" | "DELIVERED" | "FAILED";

export interface Event {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: EventStatus;
  endpointId: string;
  createdAt: string;
}

// ------------- Delivery -------------
export interface DeliveryAttempt {
  id: string;
  eventId: string;
  attemptNumber: number;
  statusCode: number | null;
  responseBody: string | null;
  success: boolean;
  createdAt: string;
}

export interface DeadLetterEvent {
  id: string;
  eventId: string;
  endpointId: string;
  paylaod: Record<string, unknown>;
  reason: string;
  createdAt: string;
}

// ------------- Stats -------------
export interface EventCounts {
  PENDING: number;
  DELIVERING: number;
  DELIVERED: number;
  FAILED: number;
  total: number;
  successRate: number;
}

export interface OverallStats {
  events: EventCounts;
  totalAttempts: number;
  totalDeadLetters: number;
}

export interface EndpointStats {
  endpointId: string;
  events: EventCounts;
  totalAttempts: number;
  totalDeadLetters: number;
}

// ------------- Api Response Wrapper -------------
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  status: string;
  message: string;
}

// ------------- Socket -------------
export interface DeliverySuccessEvent {
  eventId: string;
  endpointId: string;
  attemptNumber: number;
  statusCode: number;
}

export interface DeliveryFailedEvent {
  eventId: string;
  endpointId: string;
  attemptNumber: number;
  statusCode: number | null;
  reason: string;
}