import { htmlDoc } from "./htmlDoc.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function viewCommander(nonce, form = {}, errors = {}, successData = null) {
  const title = successData ? "Demande envoyée" : "Commander / Demander un devis";
  const description = "Envoyez votre demande de traduction certifiée ou d’interprétariat. Réponse rapide avec devis et délai.";
  const err = (k) => errors[k] ? `<div class="small" style="color:var(--err)">${escapeHtml(errors[k])}</div>` : "";
  const v = (k) => escapeHtml(form[k] || "");
  let body;

  if (successData) {
    const { reference, payUrl } = successData;
    body = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>Merci. Référence ${escapeHtml(reference)}</h2>
          <p>Votre demande a été enregistrée. Un accusé vous sera envoyé.</p>
          <a class="btn ghost" href="/">Retour à l’accueil</a>
        </div>
      </div>
    </section>`;
  } else {
    body = `
    <section class="section">
      <div class="container">
        <h2 class="title">Demande simplifiée</h2>
        <p class="lead">Réponse sous 24–48h.</p>

        <form class="card" action="/commander" method="post" enctype="multipart/form-data" novalidate>

          <label>Nom *</label>
          <input class="input" name="nom" value="${v("nom")}" required>
          ${err("nom")}

          <label>Email *</label>
          <input class="input" type="email" name="email" value="${v("email")}" required>
          ${errors.contact ? `<div class="small" style="color:var(--err)">${errors.contact}</div>` : ""}

          <label>Type de prestation *</label>
          <select class="select" name="typePrestation" required>
            ${["Traduction","Interprétariat"].map(x=>`<option${v("typePrestation")==x?" selected":""}>${x}</option>`).join("")}
          </select>
          ${err("typePrestation")}

          <label>Langue *</label>
          <select class="select" name="combinaison" required>
            <option value="Arabe → Français"${v("combinaison")=="Arabe → Français"?" selected":""}>Arabe → Français</option>
            <option value="Français → Arabe"${v("combinaison")=="Français → Arabe"?" selected":""}>Français → Arabe</option>
          </select>
          ${err("combinaison")}

          <label>Fichier (PDF/JPG/PNG ≤ 10 Mo)</label>
          <input class="input" type="file" name="fichier" accept=".pdf,.jpg,.jpeg,.png">

          <label>Message</label>
          <textarea class="textarea" name="commentaire" rows="4">${v("commentaire")}</textarea>

          <div class="hr"></div>
          <button class="btn primary" type="submit">Envoyer</button>
        </form>
      </div>
    </section>`;
  }
  return htmlDoc({ title, description, body, nonce });
}
