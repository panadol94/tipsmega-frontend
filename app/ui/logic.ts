export function isValidMegaId(v: string) {
  if (!/^\d{12}$/.test(v)) return false;
  const first = v[0];
  return first === "0" || first === "1" || first === "2";
}

export function maskMegaId(v: string) {
  if (!v) return "";
  return v.slice(0, 2) + "******" + v.slice(-2);
}
