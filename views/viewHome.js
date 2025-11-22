import { htmlDoc } from "./htmlDoc.js";
import { profile } from "../config/profile.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function viewHome(nonce) {
  const title = "Accueil";
  const description = "Traductions certifiées et interprétariat Arabe ⇄ Français. Délai rapide. Devis en ligne.";
  const body = `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <div class="badge" aria-label="Assermenté">
          <span>✔</span><span>Assermenté – ${escapeHtml(profile.courAppel)}</span>
        </div>
        <h1 class="h1">Traductions certifiées<br>et interprétariat <br><span style="background:linear-gradient(90deg,var(--accent2),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent">Arabe ⇄ Français</span></h1>
        <p class="sub">Documents officiels, procédures, audiences. Qualité vérifiable, délais maîtrisés.</p>
        <div class="cta">
          <a class="btn primary" href="/commander">Demander un devis</a>
          <a class="btn ghost" href="#process">Comment ça marche</a>
        </div>
        <div class="kpis">
          <div class="kpi"><strong>25+ ans</strong><br><span class="small">d’expérience</span></div>
          <div class="kpi"><strong>48–72 h</strong><br><span class="small">délais usuels</span></div>
          <div class="kpi"><strong>1000+</strong><br><span class="small">documents traités</span></div>
        </div>
      </div>

    <img class="logopng" src="/static/logo.png" alt="Logo"
     style="height:300px;border-radius:200px;background:#fff;padding:4px;">
      <div class="figure" role="img" aria-label="Illustration balance et texte bilingue">
        <div class="figure-inner">Français</div>
        <div class="figure-inner">⇄</div>
        <div class="figure-inner">Arabe</div>
      </div>
    </div>
  </section>


<section class="section">
  <div class="container">
    <h2 class="title">Ils nous font confiance</h2>
    <p class="lead">Administrations, cabinets, particuliers. Discrétion et conformité.</p>

    <div class="logo-stack">
      ${[
        "/static/justice.png",
        "/static/gendarmerieSavoie.jpg",
        "/static/gendarmerie.png",
        "/static/douane.jpg",
        "/static/prefecture.png"
      ].map(src => `
        <div class="logo">
          <img src="${src}" alt="" style="height:120px;">
        </div>
      `).join("")}
    </div>
  </div>
</section>


  <section id="process" class="section">
    <div class="container grid cards">
      <div class="card">
        <div class="step"><div class="no">1</div><div><h3>Envoi sécurisé</h3><p>Transmettez votre document et vos besoins. Formats PDF, JPG, PNG.</p></div></div>
      </div>
      <div class="card">
        <div class="step"><div class="no">2</div><div><h3>Devis & délai</h3><p>Réception d’un devis clair avec délai ferme et référence.</p></div></div>
      </div>
      <div class="card">
        <div class="step"><div class="no">3</div><div><h3>Traduction certifiée</h3><p>Sceau et signature. Remise numérique et/ou papier selon besoin.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="title">Estimation rapide</h2>
      <p class="lead">Indication non contractuelle. Le devis fera foi.</p>
      <div class="pricing">
        <div class="card">
          <label for="est-pages">Nombre de pages</label>
          <input id="est-pages" class="input" type="number" min="1" step="1" value="2" inputmode="numeric">
          <label><input id="est-urgent" type="checkbox"> Urgent</label>
          <div class="hr"></div>
          <p>Total estimé : <strong id="est-out">—</strong></p>
          <a class="btn primary" href="/commander">Obtenir un devis formel</a>
        </div>
        <div class="card">
          <div class="ribbon">Populaire</div>
          <h3>Interprétariat</h3>
          <p class="small">Audience, notaire, asile, rendez-vous administratifs.</p>
          <ul class="small">
            <li>Présentiel ou par Téléphone</li>
          </ul>
          <a class="btn ghost" href="/services">Voir les modalités</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section faq">
    <div class="container">
      <h2 class="title">FAQ</h2>
      <div class="grid">
        ${[
          ["Qu’est-ce qu’une traduction certifiée ?","Une traduction revêtue de la signature et du sceau d’un traducteur assermenté, reconnue par les autorités."],
          ["Quels documents ?","État civil, diplômes, permis, jugements, statuts, pièces administratives et techniques."],
          ["Délais ?","Selon volume et complexité. Une estimation 48–72 h est courante pour l’état civil."],
          ["Remise ?", "Document numérique PDF et/ou exemplaire papier."]
        ].map(([q,a])=>`
          <details><summary>${q}</summary><div class="small">${a}</div></details>
        `).join("")}
      </div>
    </div>
  </section>
  `;
  return htmlDoc({ title, description, body, nonce });
}
