export function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "server";
  const key = "tipsmega_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    // UUID simple (ok untuk device key)
    id = crypto.randomUUID ? crypto.randomUUID() : `dev_${Date.now()}_${Math.random()}`;
    localStorage.setItem(key, id);
  }
  return id;
}
