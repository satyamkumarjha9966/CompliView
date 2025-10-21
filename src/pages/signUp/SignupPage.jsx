import React, { useMemo, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../apis/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const passwordStrength = useMemo(() => {
    const pwd = form.password || "";
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 4); // 0..4
  }, [form.password]);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // live errors
    if (name === "email") {
      setErrors((er) => ({
        ...er,
        email: value
          ? validateEmail(value)
            ? ""
            : "Please enter a valid work email."
          : "",
      }));
    }
    if (name === "password") {
      setErrors((er) => ({
        ...er,
        password: value.length < 8 ? "Minimum 8 characters required." : "",
      }));
    }
    if (name === "firstName" && value)
      setErrors((er) => ({ ...er, firstName: "" }));
    if (name === "lastName" && value)
      setErrors((er) => ({ ...er, lastName: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "First name is required.";
    if (!form.lastName.trim()) er.lastName = "Last name is required.";
    if (!form.email.trim()) er.email = "Email is required.";
    else if (!validateEmail(form.email))
      er.email = "Please enter a valid work email.";
    if (!form.password) er.password = "Password is required.";
    else if (form.password.length < 8)
      er.password = "Minimum 8 characters required.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    setApiError(null);
    const res = await signUp(form);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } else {
      setApiError(res.error || "Sign up failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="su-root">
      <div className="su-shell">
        {/* Left brand / context */}
        <aside className="su-brand su-cont-cntr" aria-hidden="true">
          <div className="su-brand-inner">
            <h2 className="su-brand-title">CompileView Explorer</h2>
            <p className="su-brand-sub">
              Inspect millions of rows, pivot complex hierarchies, and stream
              insights in real-time.
            </p>

            <div className="su-table-silhouette">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="row" key={i}>
                  <span className="cell a" />
                  <span className="cell b" />
                  <span className="cell c" />
                </div>
              ))}
            </div>

            <svg className="su-tree" viewBox="0 0 420 120" aria-hidden="true">
              <defs>
                <linearGradient id="su-glow" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="var(--accent)"
                    stopOpacity="0.0"
                  />
                  <stop
                    offset="50%"
                    stopColor="var(--accent)"
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--accent)"
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>
              <g fill="none" stroke="#334155" strokeWidth="1.2">
                <path d="M20 20 H120 V60 H200 V100" />
                <path d="M120 60 H60 V100" />
                <path d="M200 100 H260 V60 H340 V20 H400" />
              </g>
              <g fill="var(--accent)">
                <circle cx="20" cy="20" r="3" />
                <circle cx="120" cy="60" r="3" />
                <circle cx="60" cy="100" r="3" />
                <circle cx="200" cy="100" r="3" />
                <circle cx="260" cy="60" r="3" />
                <circle cx="340" cy="20" r="3" />
                <circle cx="400" cy="20" r="3" />
              </g>
              <rect x="0" y="58" width="420" height="4" fill="url(#su-glow)" />
            </svg>
          </div>
        </aside>

        {/* Right form */}
        <main className="su-main">
          <section className="su-card" aria-labelledby="signup-title">
            <header className="su-card-head">
              <h1 id="signup-title" className="su-title">
                Create your account
              </h1>
              <p className="su-sub">
                Start exploring large datasets in tables and trees.
              </p>
            </header>

            {success && (
              <div className="su-toast" role="status">
                <span className="dot" />
                <div>
                  <strong>Account created.</strong> Redirecting to your
                  workspace…
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
              {/* First Name */}
              <label htmlFor="firstName" className="su-label">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="e.g., Aisha"
                value={form.firstName}
                onChange={onChange}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                className={"su-input" + (errors.firstName ? " error" : "")}
              />
              {errors.firstName && (
                <p id="firstName-error" className="su-error" role="alert">
                  {errors.firstName}
                </p>
              )}

              {/* Last Name */}
              <label htmlFor="lastName" className="su-label space-top">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="e.g., Verma"
                value={form.lastName}
                onChange={onChange}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                className={"su-input" + (errors.lastName ? " error" : "")}
              />
              {errors.lastName && (
                <p id="lastName-error" className="su-error" role="alert">
                  {errors.lastName}
                </p>
              )}

              {/* Email */}
              <label htmlFor="email" className="su-label space-top">
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
                className={"su-input" + (errors.email ? " error" : "")}
              />
              <p id="email-help" className="su-help">
                We’ll use this to verify your workspace.
              </p>
              {errors.email && (
                <p id="email-error" className="su-error" role="alert">
                  {errors.email}
                </p>
              )}

              {/* Password */}
              <label htmlFor="password" className="su-label space-top">
                Password
              </label>
              <div className="su-password">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : "password-help"
                  }
                  className={"su-input pr" + (errors.password ? " error" : "")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="su-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div id="password-help" className="su-strength">
                <div className="bars" aria-hidden="true">
                  <span
                    className={"bar" + (passwordStrength >= 1 ? " on" : "")}
                  />
                  <span
                    className={"bar" + (passwordStrength >= 2 ? " on" : "")}
                  />
                  <span
                    className={"bar" + (passwordStrength >= 3 ? " on" : "")}
                  />
                  <span
                    className={"bar" + (passwordStrength >= 4 ? " on" : "")}
                  />
                </div>
                <span className="msg">
                  Use 8+ chars, mix of letters, numbers & symbols.
                </span>
              </div>
              {errors.password && (
                <p id="password-error" className="su-error" role="alert">
                  {errors.password}
                </p>
              )}

              {/* Terms */}
              <p className="su-terms">
                By continuing, you agree to our{" "}
                <a href="#" className="su-link">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="su-link">
                  Privacy Policy
                </a>
                .
              </p>

              {/* CTA */}
              <div className="su-cta-wrap">
                <button
                  type="submit"
                  className="su-btn"
                  disabled={submitting}
                  aria-busy={submitting}
                  aria-live="polite"
                >
                  {submitting ? (
                    <>
                      <span className="spinner" /> Creating…
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              <p className="su-helper">
                Already have an account?{" "}
                <Link to={"/signin"} className="su-link">
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
