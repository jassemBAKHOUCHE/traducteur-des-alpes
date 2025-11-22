import helmet from "helmet";

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "font-src": ["'self'"],
      "connect-src": ["'self'"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "frame-ancestors": ["'none'"]
    }
  },
  referrerPolicy: { policy: "no-referrer-when-downgrade" },
  crossOriginEmbedderPolicy: false
});
