import React from "react";
import "./client.css";
import { Link } from "react-router-dom";

const CLIENTS = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    risk: "Medium",
    score: 78,
    frameworks: ["ISO27001", "SOC2", "GDPR"],
    last: "1/15/2024",
  },
  {
    id: 2,
    name: "FinanceFirst Bank",
    industry: "Financial Services",
    risk: "High",
    score: 65,
    frameworks: ["SOC2", "NIST", "RBI"],
    last: "1/10/2024",
  },
  {
    id: 3,
    name: "HealthcarePlus",
    industry: "Healthcare",
    risk: "Low",
    score: 92,
    frameworks: ["GDPR", "ISO27001", "NIST"],
    last: "1/20/2024",
  },
];

export default function ClientsPage() {
  return (
    <div className="cm-root">
      {/* Page header */}
      <header className="cm-header">
        <h1 className="cm-title">Client Management</h1>
        <p className="cm-sub">
          Manage your clients and view their compliance status across various
          frameworks.
        </p>
      </header>

      {/* (Optional) toolbar placeholder for filters/search – easy to wire later */}
      {/* <div className="cm-toolbar">
        <input className="cm-search" placeholder="Search clients…" />
      </div> */}

      {/* Cards */}
      <section className="cm-grid" aria-label="Client list">
        {CLIENTS.map((c) => (
          <article key={c.name} className="cm-card">
            <header className="cm-card-head">
              <div className="cm-avatar" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M4 4h16v6H4zM4 14h10v6H4z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <div className="cm-ident">
                <h3 className="cm-name">{c.name}</h3>
                <div className="cm-industry">{c.industry}</div>
              </div>
            </header>

            <div className="cm-meta">
              <div className="cm-row">
                <span className="cm-label">Risk Level:</span>
                <span className={`cm-badge ${badgeClass(c.risk)}`}>
                  {c.risk}
                </span>
              </div>

              <div className="cm-row">
                <span className="cm-label">Compliance Score:</span>
                <span className="cm-value">{c.score}%</span>
              </div>

              <div className="cm-row">
                <span className="cm-label">Frameworks:</span>
                <span className="cm-chips">
                  {c.frameworks.map((f) => (
                    <span key={f} className="cm-chip">
                      {f}
                    </span>
                  ))}
                </span>
              </div>

              <div className="cm-row">
                <span className="cm-label">Last Assessment:</span>
                <span className="cm-note">{c.last}</span>
              </div>
            </div>

            <footer className="cm-foot">
              <Link to={`/client/${c.id}`} className="cm-link">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M4 4h16v16H4z" fill="currentColor" />
                </svg>
                <span>View Compliance</span>
              </Link>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

function badgeClass(risk) {
  if (risk === "High") return "high";
  if (risk === "Low") return "low";
  return "medium";
}
