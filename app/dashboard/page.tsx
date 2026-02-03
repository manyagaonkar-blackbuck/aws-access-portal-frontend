"use client";

import { useEffect, useState } from "react";
import { fetchAccessRequests } from "@/lib/utils";
import CreateAccessRequestForm from "@/components/CreateAccessRequestForm";

/**
 * Service → Actions mapping (frontend-only)
 */
const SERVICE_ACTIONS: Record<string, string[]> = {
  S3: ["ListBucket", "GetObject", "PutObject"],
  EC2: ["DescribeInstances", "StartInstances", "StopInstances"],
};

/**
 * Derive services from actions returned by backend
 */
function deriveServices(resourceArns: string[] = []) {
  const services = new Set<string>();

  Object.entries(SERVICE_ACTIONS).forEach(([service, actions]) => {
    actions.forEach((action) => {
      if (resourceArns.includes(action)) {
        services.add(service);
      }
    });
  });

  return Array.from(services);
}

/**
 * 🔥 NORMALIZE SERVICES (handles string | array | null)
 */
function normalizeServices(services: any): string[] {
  if (!services) return [];

  if (Array.isArray(services)) {
    return services;
  }

  if (typeof services === "string") {
    return services
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessRequests()
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-title">BLACKBUCK</div>
          <ul className="sidebar-menu">
            <li className="active">Access Requests</li>
            <li>Roles</li>
            <li>Email Reports</li>
            <li>Reviews</li>
          </ul>
        </aside>

        {/* MAIN */}
        <main className="dashboard-content">
          <div className="action-bar">
            <div>{requests.length} requests</div>
            <button className="primary-btn" onClick={() => setOpen(true)}>
              Create New Access Request
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Services</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              )}

              {!loading &&
                requests.map((r) => {
                  const normalizedServices = normalizeServices(r.services);
                  const derivedServices = deriveServices(r.resourceArns || []);

                  const servicesToShow =
                    normalizedServices.length > 0
                      ? normalizedServices
                      : derivedServices;

                  return (
                    <tr key={r.id}>
                      <td>{r.requesterEmail || "-"}</td>

                      {/* ✅ FIXED SERVICES COLUMN */}
                      <td>{servicesToShow.join(", ") || "-"}</td>

                      <td>{r.status}</td>
                      <td>
                        {r.createdAt
                          ? new Date(r.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </main>
      </div>

      {/* MODAL */}
      {open && (
        <div className="modal-overlay">
          <div
            className="modal-container"
            style={{
              width: "760px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="modal-header">
              <h3>Create Access Request</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <div
              className="modal-body"
              style={{
                padding: 24,
                overflowY: "auto",
                flex: 1,
              }}
            >
              <CreateAccessRequestForm
  onSuccess={(created) => {
    setOpen(false);

    setRequests((prev) => [
      {
        ...created,
        services: normalizeServices(created.services),
      },
      ...prev,
    ]);
  }}
/>

            </div>
          </div>
        </div>
      )}
    </>
  );
}