"use client";

import { useEffect, useState } from "react";
import { fetchAccessRequests } from "@/lib/utils";

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
                requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.requesterEmail}</td>
                    <td>{(r.services || []).join(", ")}</td>
                    <td>{r.status}</td>
                    <td>
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* MODAL */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Create Access Request</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <iframe
              src="/request"
              className="modal-iframe"
            />
          </div>
        </div>
      )}
    </>
  );
}
