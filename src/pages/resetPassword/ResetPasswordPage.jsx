import React, { useMemo, useState } from "react";
import "./reset.css";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../apis/auth";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState({ p: false, c: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const strength = useMemo(() => {
    const pwd = password || "";
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return Math.min(s, 4);
  }, [password]);

  const validate = () => {
    const er = {};
    if (!password) er.password = "Password is required.";
    else if (password.length < 8)
      er.password = "Minimum 8 characters required.";
    if (!confirm) er.confirm = "Confirm your password.";
    else if (confirm !== password) er.confirm = "Passwords do not match.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = await resetPassword({ password, confirm, resetToken });
    if (res.success) {
      setSubmitting(false);
      setDone(true);
      navigate("/signin");
    } else {
      setSubmitting(false);
      const errMsg = res.error || "Error in resetting password.";
      setErrors({ password: errMsg, confirm: errMsg });
    }
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setDone(true);
    //   navigate("/signin");
    // }, 900);
  };

  const bar = (i) => "rp-bar" + (strength >= i ? " on" : "");

  return (
    <div className="rp-root">
      <div className="rp-shell">
        {/* Left: brand / context (new motif: locks + progress bands) */}
        {/* <aside className="rp-brand" aria-hidden="true">
          <div className="rp-brand-inner">
            <h2 className="rp-brand-title">Set a new password</h2>
            <p className="rp-brand-sub">
              Use at least 8 characters with a mix of types.
            </p>

            <div className="rp-locks">
              <div className="lock">
                <div className="shackle" />
              </div>
              <div className="lock">
                <div className="shackle" />
              </div>
              <div className="lock">
                <div className="shackle" />
              </div>
            </div>

            <div className="rp-bands">
              <span className="band" />
              <span className="band" />
              <span className="band" />
            </div>
          </div>
        </aside> */}

        {/* Right: form */}
        <main className="rp-main">
          <section className="rp-card" aria-labelledby="reset-title">
            <header className="rp-head">
              <h1 id="reset-title" className="rp-title">
                Reset password
              </h1>
              <p className="rp-sub">
                Choose a strong password for your account.
              </p>
            </header>

            {done && (
              <div className="rp-toast" role="status">
                <span className="dot" />
                <div>
                  <strong>Password updated.</strong> Redirecting to sign in…
                </div>
              </div>
            )}

            <form noValidate onSubmit={onSubmit}>
              {/* New password */}
              <label htmlFor="password" className="rp-label">
                New password
              </label>
              <div className="rp-password">
                <input
                  id="password"
                  type={show.p ? "text" : "password"}
                  className={"rp-input pr" + (errors.password ? " error" : "")}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((x) => ({ ...x, password: "" }));
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "pwd-err" : "pwd-help"}
                />
                <button
                  type="button"
                  className="rp-toggle"
                  onClick={() => setShow((s) => ({ ...s, p: !s.p }))}
                >
                  {show.p ? "Hide" : "Show"}
                </button>
              </div>
              <div id="pwd-help" className="rp-strength">
                <div className="bars" aria-hidden>
                  <span className={bar(1)} />
                  <span className={bar(2)} />
                  <span className={bar(3)} />
                  <span className={bar(4)} />
                </div>
                <span className="msg">
                  8+ chars, mix of letters, numbers & symbols.
                </span>
              </div>
              {errors.password && (
                <p id="pwd-err" className="rp-error" role="alert">
                  {errors.password}
                </p>
              )}

              {/* Confirm */}
              <label htmlFor="confirm" className="rp-label space-top">
                Confirm password
              </label>
              <div className="rp-password">
                <input
                  id="confirm"
                  type={show.c ? "text" : "password"}
                  className={"rp-input pr" + (errors.confirm ? " error" : "")}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setErrors((x) => ({ ...x, confirm: "" }));
                  }}
                  aria-invalid={Boolean(errors.confirm)}
                  aria-describedby={errors.confirm ? "confirm-err" : undefined}
                />
                <button
                  type="button"
                  className="rp-toggle"
                  onClick={() => setShow((s) => ({ ...s, c: !s.c }))}
                >
                  {show.c ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirm && (
                <p id="confirm-err" className="rp-error" role="alert">
                  {errors.confirm}
                </p>
              )}

              {/* CTA */}
              <div className="rp-cta-wrap">
                <button
                  type="submit"
                  className="rp-btn"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner" /> Updating…
                    </>
                  ) : (
                    "Update password"
                  )}
                </button>
              </div>

              <p className="rp-helper">
                Know your password?{" "}
                <a className="rp-link" href="#">
                  Sign in
                </a>
              </p>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
