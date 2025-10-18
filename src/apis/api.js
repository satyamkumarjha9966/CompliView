// Simple auth API service
// Each exported function returns a Promise that resolves to a standard response shape:
// { success: boolean, status: number|null, data: any|null, error: string|null }

const DEFAULT_TIMEOUT = 10000; // 10s

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export default async function safeFetch(
  url,
  options = {},
  timeout = DEFAULT_TIMEOUT
) {
  try {
    const res = await timeoutPromise(timeout, fetch(url, options));
    const contentType = res.headers.get("content-type") || "";
    let data = null;
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        data: null,
        error: data?.message || data || "Request failed",
      };
    }

    return { success: true, status: res.status, data, error: null };
  } catch (err) {
    return {
      success: false,
      status: null,
      data: null,
      error: err.message || "Network error",
    };
  }
}
