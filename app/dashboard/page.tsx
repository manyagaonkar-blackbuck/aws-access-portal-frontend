"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
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
        {/* TAB HEADER */}
        <div className="tab-header">
          <div className="tab active">My Requests</div>
        </div>

        {/* ACTION BAR */}
        <div className="action-bar">
          <div className="count">1–0 of 0</div>
          <button
            className="primary-btn"
            onClick={() => router.push("/request")}
          >
            Create New Access Request
          </button>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Roles</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="empty-table">
                  No requests found.
                  <br />
                  <span
                    className="link"
                    onClick={() => router.push("/request")}
                  >
                    Click here
                  </span>{" "}
                  to create a new access request
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
