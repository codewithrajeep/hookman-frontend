const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};
// Base fetch warpper - sends cookies automatically with every request
// credentials: "include" is what makes httpOnly cookies work cross-origin
const request = async<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = "GET", body, headers = {} } = options;
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include", // sends httpOnly cookie on every request
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
};

// ---------- Auth ----------
export const authApi = {
  register: (body: { name: string, email: string, password: string }) =>
    request("/api/v1/auth/register", { method: "POST", body }),
  login: (body: { email: string, password: string }) =>
    request("/api/v1/auth/login", { method: "POST", body }),
};

// ---------- API Keys ----------
export const apiKeyApi = {
  create: (body: { name: string }) =>
    request("/api/v1/api-keys", { method: "POST", body }),
  list: () => request("/api/v1/api-keys"),
  delete: (id: string) => request(`/api/v1/api-keys/${id}`, { method: "DELETE" }),
};

// ---------- Endpoints ----------
export const endpointApi = {
  create: (body: { name: string, url: string }) =>
    request("/api/v1/endpoints", { method: "POST", body }),
  list: () => request("/api/v1/endpoints"),
  getById: (id: string) => request(`/api/v1/endpoints/${id}`),
  update: (id: string, body: { name?: string, url?: string, isActive?: boolean }) =>
    request(`/api/v1/endpoints/${id}`, { method: "PATCH", body }),
  delete: (id: string) => request(`/api/v1/endpoints/${id}`, { method: "DELETE" }),
}

// ---------- Events ----------
export const eventApi = {
  list: () => request("/api/v1/events"),
  getById: (id: string) => request(`/api/v1/events/${id}`),
};

// ---------- Delivery ----------
export const deliveryApi = {
  listAttempts: (eventId: string) => request(`/api/v1/delivery/attempts/${eventId}`),
  listDeadLetters: () => request(`/api/v1/delivery/dead-letters`),
  getDeadLetter: (eventId: string) =>
    request(`/api/v1/delivery/dead-letters/${eventId}`),
  replay: (eventId: string) =>
    request(`/api/v1/delivery/dead-letters/${eventId}/replay`, { method: "POST" })
}

// ---------- Stats ----------
export const statsApi = {
  getOverall: () => request(`/api/v1/stats`),
  getByEndpoint: (endpointApi: string) =>
    request(`/api/v1/stats/${endpointApi}`),
}
