// Thin client for the AstroVeda backend auth API.

function resolveApiUrl() {
  let url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim();
  url = url.replace(/\/+$/, ""); // strip trailing slashes → avoids "/api"
  // If the page is served over HTTPS, upgrade an http:// API base to https://
  // to avoid mixed-content blocking (localhost is left as-is).
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://") &&
    !/^http:\/\/(localhost|127\.0\.0\.1)/.test(url)
  ) {
    url = url.replace(/^http:\/\//, "https://");
  }
  return url;
}

const API_URL = resolveApiUrl();

/** Error carrying the server's status + field-level messages. */
export class ApiError extends Error {
  constructor(message, { status, fields } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields || null;
  }
}

async function request(path, { method = "GET", body, token } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Is the backend running?", { status: 0 });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || "Something went wrong.", {
      status: res.status,
      fields: data.fields,
    });
  }
  return data;
}

export const apiRegister = (payload) =>
  request("/api/auth/register", { method: "POST", body: payload });

export const apiLogin = (payload) =>
  request("/api/auth/login", { method: "POST", body: payload });

export const apiMe = (token) => request("/api/auth/me", { token });

export const apiPredictBasic = (token) =>
  request("/api/predict/basic", { method: "POST", token });

export const apiPredictHistory = (token) =>
  request("/api/predict/history", { token });

export const apiChart = (payload) =>
  request("/api/chart", { method: "POST", body: payload });

export const apiPlans = () => request("/api/plans");

export const apiCreateOrder = (token, payload) =>
  request("/api/payment/order", { method: "POST", token, body: payload });

export const apiVerifyPayment = (token, payload) =>
  request("/api/payment/verify", { method: "POST", token, body: payload });

export const apiPanchang = (params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null && v !== "")
  ).toString();
  return request(`/api/panchang${qs ? `?${qs}` : ""}`);
};
