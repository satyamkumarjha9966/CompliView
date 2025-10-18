import React, { useState } from "react";
import "./clientDashboard.css";
import { Link } from "react-router-dom";

const KPIS = [
  { key: "score", label: "Overall Score", value: "94%", tone: "info" },
  { key: "total", label: "Total Controls", value: "114" },
  { key: "ok", label: "Compliant", value: "89", tone: "success" },
  { key: "bad", label: "Non-Compliant", value: "25", tone: "danger" },
];

const TABS = ["Control Assessment", "Cloud Mappings", "Remediation Plan"];

const ROWS = [
  {
    id: "A.5.1.1",
    name: "Information Security Policy",
    status: "compliant",
    severity: "HIGH",
  },
  {
    id: "A.6.1.1",
    name: "Information Security Roles",
    status: "compliant",
    severity: "HIGH",
  },
  {
    id: "A.8.1.1",
    name: "Inventory of Assets",
    status: "non compliant",
    severity: "MEDIUM",
  },
  {
    id: "A.9.1.1",
    name: "Access Control Policy",
    status: "compliant",
    severity: "HIGH",
  },
  {
    id: "A.11.1.2",
    name: "Physical Entry Controls",
    status: "compliant",
    severity: "MEDIUM",
  },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="cd-root">
      <div className="cd-shell">
        {/* Back */}
        <Link to="/" className="cd-back" aria-label="Back to clients">
          <span className="arrow" aria-hidden>
            ←
          </span>{" "}
          Back to Clients
        </Link>

        {/* Title */}
        <header className="cd-header">
          <h1 className="cd-title">Compliance Dashboard</h1>
          <p className="cd-sub">TechCorp Solutions · ISO27001 Framework</p>
        </header>

        {/* KPI cards */}
        <section className="cd-kpis" aria-label="Summary metrics">
          {KPIS.map((k) => (
            <div key={k.key} className="cd-kpi">
              <div className="cd-kpi-label">{k.label}</div>
              <div className={"cd-kpi-value " + (k.tone || "")}>{k.value}</div>
              {k.key === "score" && <div className="cd-kpi-line" aria-hidden />}
            </div>
          ))}
        </section>

        {/* Tabs */}
        <nav className="cd-tabs" aria-label="Dashboard sections">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={"cd-tab " + (activeTab === t ? "active" : "")}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Table – Control Assessment (shown for first tab) */}
        <section className="cd-panel">
          <h2 className="cd-panel-title">Control Assessment Details</h2>

          <div
            className="cd-table-wrap"
            role="region"
            aria-label="Control assessment table"
          >
            <table className="cd-table">
              <thead>
                <tr>
                  <th scope="col">Control ID</th>
                  <th scope="col">Control Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Severity</th>
                  <th scope="col" className="right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{r.id}</td>
                    <td className="name">{r.name}</td>
                    <td>
                      <span
                        className={
                          "cd-status " +
                          (r.status === "compliant" ? "ok" : "bad")
                        }
                      >
                        <i aria-hidden />
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <span className={"cd-sev " + r.severity.toLowerCase()}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="right">
                      <a href="#" className="cd-btn-link">
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
