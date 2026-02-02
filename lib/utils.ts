import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🔹 Required by shadcn/ui
 * Combines classNames safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE = "http://localhost:8080/api/v1";

/**
 * Create new access request
 */
export async function createAccessRequest(payload: {
  requesterEmail: string;
  awsAccount: string;
  reason: string;
  services: string[];
  resourceArns: string[];
  durationHours: number;
}) {
  const response = await fetch(`${API_BASE}/access-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || json.success === false) {
    throw new Error(json.error || "Failed to create request");
  }

  return json.data;
}

/**
 * Fetch all access requests (Dashboard)
 */
export async function fetchAccessRequests() {
  const response = await fetch(`${API_BASE}/access-requests`);

  const json = await response.json();

  if (!response.ok || json.success === false) {
    throw new Error(json.error || "Failed to fetch requests");
  }

  return json.data;
}
