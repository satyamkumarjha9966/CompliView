import React, { useMemo, useState } from "react";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/slices/authSlice";

export default function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email || ""),
    [form.email]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "email") {
      setErrors((er) => ({
        ...er,
        email: value ? (emailOk ? "" : "Invalid email.") : "",
      }));
    }
    if (name === "password") {
      setErrors((er) => ({ ...er, password: value ? "" : er.password }));
    }
  };

  const validate = () => {
    const er = {};
    if (!form.email.trim()) er.email = "Email is required.";
    else if (!emailOk) er.email = "Invalid email.";
    if (!form.password) er.password = "Password is required.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    setApiError(null);
    const res = await signIn(form);
    if (res.success) {
      // expecting res.data to include token and user
      const token = res.data?.token || null;
      const user = res.data?.user || null;
      if (token) dispatch(setToken(token));
      if (user) dispatch(setUser(user));
      setSuccess(true);
      navigate("/");
    } else {
      setApiError(res.error || "Sign in failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="si-root">
      <div className="si-shell">
        {/* Left: brand / context */}
        <aside className="si-brand si-cont-cntr" aria-hidden="true">
          <div className="si-brand-inner">
            <h2 className="si-brand-title">CompileView Explorer</h2>
            <p className="si-brand-sub">
              Query billions of cells. Traverse trees in milliseconds.
            </p>

            {/* Heatmap grid */}
            <div className="si-heat">
              {Array.from({ length: 54 }).map((_, i) => (
                <span
                  key={i}
                  className="cell"
                  style={{ opacity: ((i * 73) % 100) / 100 }}
                />
              ))}
            </div>

            {/* Sparkline */}
            <svg className="si-spark" viewBox="0 0 360 64" aria-hidden>
              <polyline
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                points="0,40 20,22 40,28 60,15 80,30 100,18 120,26 140,12 160,20 180,14 200,32 220,22 240,40 260,28 280,36 300,26 320,30 340,22 360,34"
              />
            </svg>
          </div>
        </aside>

        {/* Right: form */}
        <main className="si-main">
          <section className="si-card" aria-labelledby="signin-title">
            <header className="si-card-head">
              <h1 id="signin-title" className="si-title">
                Sign in
              </h1>
              <p className="si-sub">
                Welcome back. Continue where you left off.
              </p>
            </header>

            {success && (
              <div className="si-toast" role="status">
                <span className="dot" />
                <div>
                  <strong>Signed in.</strong> Redirecting to your workspace…
                </div>
              </div>
            )}

            {apiError && (
              <div className="su-toast" role="status">
                <span className="fail-dot" />
                <div>
                  <strong>{apiError}</strong> Try again later.
                </div>
              </div>
            )}

            <form noValidate onSubmit={onSubmit}>
              {/* Email */}
              <label htmlFor="email" className="si-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={onChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : "email-help"}
                className={"si-input" + (errors.email ? " error" : "")}
              />
              <p id="email-help" className="si-help">
                Use your work email.
              </p>
              {errors.email && (
                <p id="email-error" className="si-error" role="alert">
                  {errors.email}
                </p>
              )}

              {/* Password */}
              <label htmlFor="password" className="si-label space-top">
                Password
              </label>
              <div className="si-password">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={"si-input pr" + (errors.password ? " error" : "")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="si-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="si-error" role="alert">
                  {errors.password}
                </p>
              )}

              {/* Row: remember + forgot */}
              <div className="si-row">
                <label className="si-check">
                  <input type="checkbox" /> <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="si-link">
                  Forgot password?
                </Link>
              </div>

              {/* CTA */}
              <div className="si-cta-wrap">
                <button
                  type="submit"
                  className="si-btn"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner" /> Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <p className="si-helper">
                New here?{" "}
                <Link to="/signup" className="si-link">
                  Create account
                </Link>
              </p>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
