import safeFetch from "./api";

// Base URL - adjust as needed (use env var or config)
const API_BASE = "http://localhost:3000";

/**
 * Sign up user
 * @param {{ name?: string, email: string, password: string }} payload
 */
export async function signUp(payload) {
  const url = `${API_BASE}/api/auth/signup`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return safeFetch(url, options);
}

/**
 * Sign in user
 * @param {{ email: string, password: string }} payload
 */
export async function signIn(payload) {
  const url = `${API_BASE}/api/auth/signin`; // adjust endpoint
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return safeFetch(url, options);
}

export default { signIn, signUp };
