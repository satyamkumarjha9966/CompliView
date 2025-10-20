import safeFetch from "./api";

// Base URL - adjust as needed (use env var or config)
const API_BASE = "http://localhost:3000";

/**
 * Sign up user
 * @param {{ name?: string, email: string, password: string }} payload
 */
export async function signUp(payload) {
  const url = `${API_BASE}/api/v1/users/register`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // body: payload,
  };
  return safeFetch(url, options);
}

/**
 * Sign in user
 * @param {{ email: string, password: string }} payload
 */
export async function signIn(payload) {
  const url = `${API_BASE}/api/v1/users/login`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return safeFetch(url, options);
}

/**
 * Forgot Password in user
 * @param {{ email: string }} payload
 */
export async function forgotPassword(payload) {
  const url = `${API_BASE}/api/v1/users/forgot-password`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return safeFetch(url, options);
}

/**
 * Reset Password in user
 * @param {{ password: string, confirm: string, resetToken: string }} payload
 */
export async function resetPassword(payload) {
  const url = `${API_BASE}/api/v1/users/reset-password/${payload.resetToken}`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: payload.password,
      confirm: payload.confirm,
    }),
  };
  return safeFetch(url, options);
}

export default { signIn, signUp, resetPassword, forgotPassword };
