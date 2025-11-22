import { htmlDoc } from "./htmlDoc.js";
import { profile } from "../config/profile.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function viewMentions(nonce) {
  const title = "Mentions légales";
  const description = "Mentions légales et informations réglementaires du site.";
  const body = `
  <section class="section">
    <div class="container">
      <h2 class="title">Mentions légales</h2>
      <div class="card">
        <p><strong>Responsable de publication :</strong> ${escapeHtml(profile.prenom)} ${escapeHtml(profile.nom)}</p>
        <p><strong>Assermentation :</strong> ${escapeHtml(profile.courAppel)}</p>
        ${profile.siret ? `<p><strong>SIRET :</strong> ${escapeHtml(profile.siret)}</p>` : ""}
        <p><strong>Contact :</strong> ${escapeHtml(profile.email)} – ${escapeHtml(profile.telephone)}</p>
        <p class="small">Les informations fournies sur ce site sont indicatives et ne remplacent pas un devis formel.</p>
      </div>
    </div>
  </section>`;
  return htmlDoc({ title, description, body, nonce });
}
