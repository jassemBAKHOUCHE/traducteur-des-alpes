import { profile } from "../config/profile.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function htmlDoc({ title, description, body, nonce, jsonLd = {} }) {
  const ogUrl = `${profile.baseUrl}`;
  const ogTitle = `${title} – Traducteur Interprète assermenté à ${profile.ville}`;
  const ogDesc = description || "Traductions certifiées et interprétariat par traducteur assermenté près de la Cour d’Appel de Chambéry.";
  const jsonLdStr = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${profile.prenom} ${profile.nom} – Traducteur Interprète assermenté`,
    telephone: profile.telephone,
    areaServed: `FR-${profile.cp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.ville,
      postalCode: profile.cp,
      addressCountry: "FR"
    },
    sameAs: profile.sameAs,
    ...jsonLd
  });

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(ogTitle)}</title>
<meta name="description" content="${escapeHtml(ogDesc)}">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(ogTitle)}">
<meta property="og:description" content="${escapeHtml(ogDesc)}">
<meta property="og:image" content="${ogUrl}/og.svg">
<meta property="og:url" content="${ogUrl}">
<meta name="twitter:card" content="summary_large_image">
<style>
/* --------- Design 2025, WOW sans dépendance externe --------- */
:root{
  --bg:#0b0b12; --fg:#e8e8f0; --muted:#a2a2b6; --card:#11111a; --accent:#6ee7ff; --accent2:#8b5cf6; --ok:#10b981; --warn:#f59e0b; --err:#ef4444;
}
@media (prefers-color-scheme: light){
  :root{ --bg:#f7f7fb; --fg:#0b0b12; --muted:#3b3b55; --card:#ffffff; }
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;color:var(--fg);background:radial-gradient(1200px 600px at 10% -10%,rgba(139,92,246,.25),transparent 60%),
             radial-gradient(800px 400px at 110% 10%,rgba(110,231,255,.2),transparent 60%),
             linear-gradient(180deg,rgba(255,255,255,.02),transparent),
             var(--bg);
  font:16px/1.55 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial;
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
a{color:var(--accent2);text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:24px}
header.nav{
  position:sticky; top:0; backdrop-filter: blur(10px);
  background:rgba(10,10,16,.55); border-bottom:1px solid rgba(255,255,255,.08); z-index:50;
}
@media (prefers-color-scheme: light){ header.nav{ background:rgba(255,255,255,.6); } }
.nav-inner{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.3px}
.badge{display:inline-flex;gap:8px;align-items:center;padding:6px 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02))}
.hero{padding:72px 0 24px}
.hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:24px;align-items:center}
.h1{font-size:clamp(32px,6vw,56px);line-height:1.05;margin:0 0 16px}
.sub{color:var(--muted);font-size:1.1rem}
.cta{display:flex;gap:12px;margin-top:24px}
.btn{border:0;border-radius:12px;padding:14px 18px;font-weight:700;cursor:pointer}
.btn.primary{background:linear-gradient(90deg,var(--accent2),var(--accent));color:#0b0b12}
.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.18);color:var(--fg)}
.card{
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01)),var(--card);
  border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:20px;
  box-shadow:0 20px 50px -20px rgba(0,0,0,.4);
}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
.kpi{padding:16px;border-radius:14px;border:1px dashed rgba(255,255,255,.14)}
.section{padding:56px 0}
.grid{display:grid;gap:18px}
.grid.cards{grid-template-columns:repeat(3,1fr)}
@media (max-width:900px){
  .hero-grid{grid-template-columns:1fr}
  .grid.cards{grid-template-columns:1fr}
  .kpis{grid-template-columns:1fr}
}
h2.title{font-size:28px;margin:0 0 10px}
.lead{color:var(--muted);margin:0 0 22px}
.step{display:flex;gap:16px;align-items:flex-start}
.step .no{width:36px;height:36px;border-radius:10px;background:linear-gradient(180deg,var(--accent),var(--accent2));color:#0b0b12;display:grid;place-items:center;font-weight:900}
.pricing{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.pricing .card{position:relative;overflow:hidden}
.ribbon{position:absolute;top:16px;right:-50px;transform:rotate(35deg);background:var(--ok);color:#04110a;padding:6px 70px;font-weight:800}
.faq details{border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:12px;background:rgba(255,255,255,.02)}
.faq summary{cursor:pointer;font-weight:700}
footer{padding:40px 0;color:var(--muted);border-top:1px solid rgba(255,255,255,.08)}
.input, .select, .textarea{width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.02);color:var(--fg)}
label{display:block;margin:10px 0 6px;font-weight:700}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:900px){ .form-row{grid-template-columns:1fr} }
.toast{position:fixed;right:16px;bottom:16px;padding:12px 14px;border-radius:12px;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.4);color:#d1fae5;display:none}
.logo-stack{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
.logo{display:grid;place-items:center;background:#fff; border-radius:15%}
.logopng{height:100px;border-radius:200px;background:#fff;padding:4px;}
.hr{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);margin:28px 0}
.figure{;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:
  radial-gradient(600px 400px at 20% 20%,rgba(139,92,246,.35),transparent 60%),
  radial-gradient(800px 500px at 90% 10%,rgba(110,231,255,.25),transparent 60%);}
.figure-inner{width:100%;height:100%;display:grid;place-items:center;color:#e7faff;font-size:64px;letter-spacing:.05em}
.small{font-size:.92rem;color:var(--muted)}

/* ---------- Mobile real responsive ---------- */
@media (max-width: 760px) {

  .container {
    padding: 16px;
  }
  .logopng {
    height: 60px;     /* réduit sur mobile */
    padding: 3px;
    border-radius: 120px;
  }
  .nav-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .brand img {
    height: 64px !important;
  }

  .hero {
    padding: 40px 0 16px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .cta {
    flex-direction: column;
    width: 100%;
  }

  .cta .btn {
    width: 100%;
    text-align: center;
  }

  .kpis {
    grid-template-columns: 1fr;
  }

  .grid.cards {
    grid-template-columns: 1fr;
  }

  .logo-stack {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .logo img {
    max-height: 32px !important;
  }

  .pricing {
    grid-template-columns: 1fr;
  }

  .figure {
    height: 180px;
  }

  .figure-inner {
    font-size: 30px;
  }

  .form-row {
    grid-template-columns: 1fr !important;
  }

}
</style>
<script nonce="${nonce}">
document.addEventListener('DOMContentLoaded',()=>{
  const toast=document.querySelector('.toast');
  const q = new URLSearchParams(location.search);
  if(q.get('ok')==='1'){ toast.style.display='block'; setTimeout(()=>toast.style.display='none',4000); }
  // FAQ animation
  document.querySelectorAll('.faq details').forEach(d=>{
    d.addEventListener('toggle',()=>{ if(d.open){ d.parentElement.querySelectorAll('details').forEach(o=>{ if(o!==d) o.open=false;}); }});
  });
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1), el=document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
  }));
  // Estimation simple
  const pages=document.getElementById('est-pages');
  const urgent=document.getElementById('est-urgent');
  const out=document.getElementById('est-out');
  function compute(){
    const p=Number(pages.value||0);
    const base = 25; // €/page indicatif
    const factor = urgent.checked?1.4:1.0;
    const total = Math.max(1,p)*base*factor;
    out.textContent = new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(total);
  }
  if(pages && out){ pages.addEventListener('input',compute); urgent.addEventListener('change',compute); compute(); }
});
</script>
<script type="application/ld+json">${jsonLdStr}</script>
</head>
<body>
<header class="nav">
  <div class="container nav-inner">
    <div class="brand">
    <img class="logopng" src="/static/logo.png" alt="Logo">
      <span>${escapeHtml(profile.prenom)} ${escapeHtml(profile.nom)}</span>
    </div>
    <nav class="small" aria-label="Navigation principale">
      <a href="/">Accueil</a> ·
      <a href="/services">Services</a> ·
      <a href="/commander">Commander</a> ·
      <a href="/mentions-legales">Mentions légales</a>
    </nav>
  </div>
</header>
${body}
<footer>
  <div class="container small">
    <div class="hr"></div>
    <p>Traducteur Interprète Assermenté expert près de la ${escapeHtml(profile.courAppel)} — ${escapeHtml(profile.ville)} ${escapeHtml(profile.cp)}</p>
    <p>Contact : ${escapeHtml(profile.telephone)} · ${escapeHtml(profile.email)}</p>
    <p>© ${new Date().getFullYear()} ${escapeHtml(profile.prenom)} ${escapeHtml(profile.nom)}. Tous droits réservés.</p>
  </div>
</footer>
<div class="toast" role="status" aria-live="polite">Votre demande a bien été envoyée.</div>
</body></html>`;
}
