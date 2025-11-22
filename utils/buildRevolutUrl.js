import { profile } from "../config/profile.js";

export function buildRevolutUrl(amount) {
  const base = profile.revolutBase.replace(/\/+$/, "");
  if (amount && Number(amount) > 0) return `${base}/${encodeURIComponent(Number(amount))}`;
  return base;
}
