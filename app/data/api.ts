export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8080";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return (await res.json()) as T;
}

export async function apiInit(deviceId: string) {
  return jsonFetch<{ deviceId: string; stars: number; isNew?: boolean }>(
    `${API_BASE}/api/init`,
    {
      method: "POST",
      body: JSON.stringify({ deviceId }),
    }
  );
}

export async function apiScan(deviceId: string, megaId: string) {
  return jsonFetch<{
    deviceId: string;
    stars: number;
    megaId: string;
    results: { game: string; rtp: number }[];
  }>(`${API_BASE}/api/scan`, {
    method: "POST",
    body: JSON.stringify({ deviceId, megaId }),
  });
}