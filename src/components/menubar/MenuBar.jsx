import React, { useEffect, useRef, useState } from "react";
import "./menubar.css";
import { Link } from "react-router-dom";

export default function MenuBar({ onProfile, onSettings, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (
        menuRef.current.contains(e.target) ||
        btnRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const onMenuKeyDown = (e) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll('[role="menuitem"]') || []
    );
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[i + 1] || items[0])?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      (items[i - 1] || items[items.length - 1])?.focus();
    }
    if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    }
    if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  return (
    <header className="cv-nav" role="banner">
      <div className="cv-row">
        {/* Brand */}
        <Link className="cv-brand" to="/" aria-label="CompileView Home">
          <span className="cv-logo" aria-hidden>
            <svg viewBox="0 0 24 24">
              <path
                d="M3 4h18v4H3zM3 10h6v10H3zM11 10h10v10H11z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="cv-name">
            Compile<span className="cv-accent">View</span>
          </span>
        </Link>

        {/* {token && (
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({ fontWeight: isActive ? "700" : "400" })}
          >
            Dashboard
          </NavLink>
        )}
        {token && user?.role === "admin" && (
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({ fontWeight: isActive ? "700" : "400" })}
          >
            Admin Dashboard
          </NavLink>
        )} */}

        {/* Right actions */}
        <div className="cv-actions">
          <div className="cv-profwrap">
            <button
              ref={btnRef}
              type="button"
              className="cv-avatar-btn"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls="cv-profile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="cv-avatar" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <svg className="cv-caret" viewBox="0 0 20 20" aria-hidden>
                <path d="M5.5 7l4.5 5 4.5-5z" fill="currentColor" />
              </svg>
            </button>

            {open && (
              <div
                id="cv-profile-menu"
                className="cv-menu"
                role="menu"
                aria-orientation="vertical"
                ref={menuRef}
                tabIndex={-1}
                onKeyDown={onMenuKeyDown}
              >
                <button role="menuitem" className="cv-item" onClick={onProfile}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 20a8 8 0 0116 0v1H4z"
                      fill="currentColor"
                    />
                  </svg>
                  View Profile
                </button>
                <button
                  role="menuitem"
                  className="cv-item"
                  onClick={onSettings}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M19.1 12.94a8.2 8.2 0 000-1.88l2.03-1.58-2-3.46-2.39.96a7.9 7.9 0 00-1.63-.94l-.36-2.54h-4l-.36 2.54a7.9 7.9 0 00-1.63.94l-2.39-.96-2 3.46 2.03 1.58a8.2 8.2 0 000 1.88L2.2 14.52l2 3.46 2.39-.96c.52.42 1.06.72 1.63.94l.36 2.54h4l.36-2.54c.57-.22 1.11-.52 1.63-.94l2.39.96 2-3.46-2.03-1.58zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
                      fill="currentColor"
                    />
                  </svg>
                  Settings
                </button>
                <div className="cv-sep" aria-hidden />
                <button
                  role="menuitem"
                  className="cv-item danger"
                  onClick={onLogout}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8a2 2 0 00-2 2v3h2V5h8v14h-8v-3h-2v3a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2z"
                      fill="currentColor"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
