import { profile } from "../config/profile.js";
import { nowISO } from "../utils/nowISO.js";
import { escapeXml } from "../utils/escapeXml.js";
import { transporter } from "../mail/transporter.js";

export function registerMiscRoutes(app) {

  // ---------- OpenGraph Image ----------
  app.get("/og.svg", (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    const title = `${profile.prenom} ${profile.nom} · Traducteur Interprète assermenté`;
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6ee7ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0b12"/>
  <circle cx="200" cy="120" r="240" fill="url(#g)" opacity="0.25"/>
  <circle cx="1050" cy="80" r="200" fill="url(#g)" opacity="0.20"/>
  <text x="80" y="330" fill="#ffffff" font-size="72" font-family="Segoe UI, Roboto, Arial" font-weight="800">${escapeXml(title)}</text>
  <text x="80" y="410" fill="#bbf7fe" font-size="42" font-family="Segoe UI, Roboto, Arial">Arabe ⇄ Français · Traductions certifiées</text>
  <text x="80" y="480" fill="#e5e7eb" font-size="32" font-family="Segoe UI, Roboto, Arial">${escapeXml(profile.courAppel)}</text>
</svg>`);
  });

  // ---------- Robots.txt ----------
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /
Sitemap: ${profile.baseUrl}/sitemap.xml`);
  });

  // ---------- Sitemap ----------
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 <url><loc>${profile.baseUrl}/</loc></url>
 <url><loc>${profile.baseUrl}/services</loc></url>
 <url><loc>${profile.baseUrl}/commander</loc></url>
 <url><loc>${profile.baseUrl}/mentions-legales</loc></url>
</urlset>`);
  });

  // ---------- Health Check ----------
  app.get("/healthz", (req, res) => res.json({ ok: true, time: nowISO() }));

  // ---------- SMTP TEST ROUTE ----------
  app.get("/test-email", async (req, res) => {
    if (!transporter) return res.send("❌ Transporter non initialisé (SMTP non chargé)");

    try {
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: "Test SMTP - Serveur fonctionnel",
        text: "Votre serveur Node.js a bien réussi à envoyer un email via LWS."
      });

      res.send("✔️ Email envoyé. Vérifiez votre boîte mail (SPAM inclus).");
    } catch (err) {
      console.log("SMTP ERROR:", err);
      res.send("❌ Email non envoyé. Voir console.");
    }
  });

}
