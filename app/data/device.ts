const KEY = "tm_device_id_v1";

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "server";

  const saved = localStorage.getItem(KEY);
  if (saved && saved.length >= 8) return saved;

  const id =
    "dev_" +
    Math.random().toString(16).slice(2) +
    "_" +
    Date.now().toString(16);

  localStorage.setItem(KEY, id);
  return id;
}