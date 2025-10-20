import React, { useState, useMemo } from "react";
import "./forgot.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../apis/auth";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(null);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email || ""),
    [email]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required.");
    if (!emailOk) return setError("Invalid email.");
    setError("");
    setSubmitting(true);
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setSent(true);
    // }, 900);
    const res = await forgotPassword({ email });
    if (res.success) {
        setSubmitting(false);
        setSent(true);
        // navigate("/reset-password");
    } else {
        setSubmitting(false);
        setApiError(res.error || "Error in Forgot Password.");
    }
  };

  return (
    <div className="fp-root">
      <div className="fp-shell">
        {/* Left: brand / context (different motif: CSV stacks + envelope path) */}
        {/* <aside className="fp-brand" aria-hidden="true">
          <div className="fp-brand-inner">
            <h2 className="fp-brand-title">Reset your access</h2>
            <p className="fp-brand-sub">
              We’ll email a secure link to reset your password.
            </p>

            <div className="fp-csv">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="line" key={i}>
                  <span className="col a" />
                  <span className="col b" />
                  <span className="col c" />
                  <span className="col d" />
                </div>
              ))}
            </div>

            <svg className="fp-envelope" viewBox="0 0 420 120" aria-hidden>
              <g fill="none" stroke="#334155" strokeWidth="1.5">
                <rect x="40" y="20" width="140" height="80" rx="6" />
                <path d="M40 20 L110 70 L180 20" />
              </g>
              <circle cx="260" cy="30" r="3" fill="var(--accent)" />
              <circle cx="300" cy="50" r="3" fill="var(--accent)" />
              <circle cx="340" cy="70" r="3" fill="var(--accent)" />
              <polyline
                points="260,30 300,50 340,70"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </aside> */}

        {/* Right: form */}
        <main className="fp-main">
          <section className="fp-card" aria-labelledby="forgot-title">
            <header className="fp-head">
              <h1 id="forgot-title" className="fp-title">
                Forgot password
              </h1>
              <p className="fp-sub">
                Enter your email and we’ll send a reset link.
              </p>
            </header>

            {sent && (
              <div className="fp-toast" role="status">
                <span className="dot" />
                <div>
                  <strong>Link sent.</strong> Check <em>{email}</em> for
                  instructions.
                </div>
              </div>
            )}

            <form noValidate onSubmit={onSubmit}>
              <label htmlFor="email" className="fp-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={"fp-input" + (error ? " error" : "")}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "email-err" : "email-help"}
              />
              <p id="email-help" className="fp-help">
                Use the email associated with your account.
              </p>
              {error && (
                <p id="email-err" className="fp-error" role="alert">
                  {error}
                </p>
              )}

              <div className="fp-cta-wrap">
                <button
                  type="submit"
                  className="fp-btn"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner" /> Sending…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </div>

              <p className="fp-helpcenter">
                Remembered it?{" "}
                <Link className="fp-link" to="/signin">
                  Sign in
                </Link>
              </p>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
