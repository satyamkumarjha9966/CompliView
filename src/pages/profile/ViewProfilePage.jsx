import React, { useMemo, useRef, useState } from "react";
import "./profile.css";

export default function ViewProfilePage() {
  // Mock initial profile
  const [profile, setProfile] = useState({
    firstName: "Aisha",
    lastName: "Verma",
    email: "aisha.verma@compileview.io",
    title: "Senior Data Engineer",
    department: "Platform",
    phone: "+1 (415) 555-0132",
    avatarUrl: "",
  });

  const [form, setForm] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const fileRef = useRef(null);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email || ""),
    [form.email]
  );

  const pwdStrength = useMemo(() => {
    const p = pwd || "";
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(4, s);
  }, [pwd]);

  function onEdit() {
    setForm(profile);
    setEditing(true);
    setSaved(false);
  }

  function onCancel() {
    setForm(profile);
    setEditing(false);
    setErrors({});
    setPwd("");
    setPwd2("");
    setPwdErr("");
  }

  function validate() {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "First name is required.";
    if (!form.lastName.trim()) er.lastName = "Last name is required.";
    if (!form.email.trim()) er.email = "Email is required.";
    else if (!emailOk) er.email = "Please enter a valid email.";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  function onSave(e) {
    e.preventDefault();
    if (!validate()) return;

    // Optional password change validation
    if (pwd || pwd2) {
      if (pwd.length < 8)
        return setPwdErr("Password must be at least 8 characters.");
      if (pwd !== pwd2) return setPwdErr("Passwords do not match.");
    }
    setPwdErr("");

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      setProfile((p) => ({ ...p, ...form }));
      setSaved(true);
      setPwd("");
      setPwd2("");
    }, 900);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "email") {
      setErrors((er) => ({
        ...er,
        email: value ? (emailOk ? "" : "Please enter a valid email.") : "",
      }));
    }
    if (name === "firstName" && value)
      setErrors((er) => ({ ...er, firstName: "" }));
    if (name === "lastName" && value)
      setErrors((er) => ({ ...er, lastName: "" }));
  }

  function onPickAvatar() {
    fileRef.current?.click();
  }

  function onAvatarFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, avatarUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  const bar = (i) => "pf-bar" + (pwdStrength >= i ? " on" : "");

  return (
    <div className="pf-root">
      <div className="pf-shell">
        {/* Header */}
        <header className="pf-page-head">
          <h1 className="pf-title">Profile</h1>
          <p className="pf-sub">
            View and edit your CompileView account details.
          </p>
        </header>

        {/* Success toast */}
        {saved && (
          <div className="pf-toast" role="status">
            <span className="dot" />
            <div>
              <strong>Profile updated.</strong> Your changes have been saved.
            </div>
          </div>
        )}

        {/* Layout: left summary card + right details/edit form */}
        <div className="pf-grid">
          {/* Left: summary */}
          <aside className="pf-card pf-summary" aria-labelledby="summary-title">
            <div
              className="pf-avatar-lg"
              aria-hidden
              style={{
                backgroundImage: `url(${
                  (editing ? form.avatarUrl : profile.avatarUrl) || ""
                })`,
              }}
            >
              {!(editing ? form.avatarUrl : profile.avatarUrl) && (
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path
                    d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </div>
            <div className="pf-ident">
              <h2 id="summary-title" className="pf-name">
                {profile.firstName} {profile.lastName}
              </h2>
              <div className="pf-role">{profile.title}</div>
              <div className="pf-meta">{profile.department}</div>
              <div className="pf-meta">{profile.email}</div>
              <div className="pf-meta">{profile.phone}</div>
            </div>
            <div className="pf-actions">
              {!editing ? (
                <button className="pf-btn" onClick={onEdit}>
                  Edit Profile
                </button>
              ) : (
                <button className="pf-btn secondary" onClick={onCancel}>
                  Cancel
                </button>
              )}
            </div>
          </aside>

          {/* Right: edit form / read view */}
          <main className="pf-card pf-details">
            <form onSubmit={onSave} noValidate aria-labelledby="details-title">
              <h2 id="details-title" className="pf-section-title">
                Account Details
              </h2>

              {/* Avatar uploader */}
              <div className="pf-field-row">
                <div className="pf-label">Avatar</div>
                <div className="pf-avatar-row">
                  <div
                    className="pf-avatar-sm"
                    style={{
                      backgroundImage: `url(${
                        form.avatarUrl || profile.avatarUrl || ""
                      })`,
                    }}
                  >
                    {!(form.avatarUrl || profile.avatarUrl) && (
                      <svg viewBox="0 0 24 24" aria-hidden>
                        <path
                          d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="pf-hidden"
                    onChange={onAvatarFile}
                  />
                  <button
                    type="button"
                    className="pf-btn outline"
                    onClick={onPickAvatar}
                    disabled={!editing}
                  >
                    Upload…
                  </button>
                </div>
              </div>

              {/* Name grid */}
              <div className="pf-two-col">
                <div className="pf-field">
                  <label className="pf-label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className={"pf-input" + (errors.firstName ? " error" : "")}
                    placeholder="e.g., Aisha"
                    value={form.firstName}
                    onChange={onChange}
                    disabled={!editing}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "fn-err" : undefined}
                  />
                  {errors.firstName && (
                    <p id="fn-err" className="pf-error">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="pf-field">
                  <label className="pf-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className={"pf-input" + (errors.lastName ? " error" : "")}
                    placeholder="e.g., Verma"
                    value={form.lastName}
                    onChange={onChange}
                    disabled={!editing}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "ln-err" : undefined}
                  />
                  {errors.lastName && (
                    <p id="ln-err" className="pf-error">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Single-column fields */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={"pf-input" + (errors.email ? " error" : "")}
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={onChange}
                  disabled={!editing}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "em-err" : undefined}
                />
                {errors.email && (
                  <p id="em-err" className="pf-error">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* <div className="pf-two-col">
                <div className="pf-field">
                  <label className="pf-label" htmlFor="title">
                    Job Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    className="pf-input"
                    placeholder="e.g., Senior Data Engineer"
                    value={form.title}
                    onChange={onChange}
                    disabled={!editing}
                  />
                </div>
                <div className="pf-field">
                  <label className="pf-label" htmlFor="department">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    className="pf-input"
                    placeholder="e.g., Platform"
                    value={form.department}
                    onChange={onChange}
                    disabled={!editing}
                  />
                </div>
              </div> */}

              <div className="pf-field">
                <label className="pf-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="pf-input"
                  placeholder="+1 (000) 000-0000"
                  value={form.phone}
                  onChange={onChange}
                  disabled={!editing}
                />
              </div>

              {/* Password update */}
              {/* <h3 className="pf-section-sub">Security</h3>
              <div className="pf-field">
                <label className="pf-label" htmlFor="pwd">
                  New Password
                </label>
                <div className="pf-passwrap">
                  <input
                    id="pwd"
                    className="pf-input pr"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    disabled={!editing}
                  />
                  <button
                    type="button"
                    className="pf-toggle"
                    onClick={() => setShowPwd((s) => !s)}
                    disabled={!editing}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="pf-strength">
                  <span className={bar(1)} />
                  <span className={bar(2)} />
                  <span className={bar(3)} />
                  <span className={bar(4)} />
                  <span className="pf-strength-msg">
                    8+ chars; mix of letters, numbers & symbols.
                  </span>
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="pwd2">
                  Confirm Password
                </label>
                <input
                  id="pwd2"
                  className="pf-input"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  disabled={!editing}
                />
                {pwdErr && <p className="pf-error">{pwdErr}</p>}
              </div> */}

              {/* Footer actions */}
              <div className="pf-form-actions">
                {!editing ? (
                  <button type="button" className="pf-btn" onClick={onEdit}>
                    Edit
                  </button>
                ) : (
                  <>
                    <button type="submit" className="pf-btn" disabled={saving}>
                      {saving ? (
                        <>
                          <span className="spinner" /> Saving…
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      type="button"
                      className="pf-btn secondary"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
