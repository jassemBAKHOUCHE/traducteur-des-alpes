import xss from "xss";

export function sanitize(s) {
  return xss(String(s || "").trim());
}
