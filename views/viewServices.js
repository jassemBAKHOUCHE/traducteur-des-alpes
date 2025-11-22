import { htmlDoc } from "./htmlDoc.js";
import { profile } from "../config/profile.js";

export function viewServices(nonce) {
  const title = "Services";
  const description = "Traductions certifiées Arabe ⇄ Français, interprétariat, légalisation et relecture juridique.";
  const body = `
  <section class="section">
    <div class="container">
      <h2 class="title">Services</h2>
      <p class="lead">Couverture complète pour particuliers, avocats, notaires et administrations.</p>
      <div class="grid cards">
        <div class="card">
          <h3>Traductions certifiées</h3>
          <p>Actes d’état civil, diplômes, décisions de justice, permis, documents administratifs.</p>
        </div>
        <div class="card">
          <h3>Traduction spécialisée</h3>
          <p>Juridique, technique, médical. Terminologie contrôlée, relecture en double.</p>
        </div>
        <div class="card">
          <h3>Interprétariat</h3>
          <p>Tribunaux, notaires, audiences, rendez-vous administratifs. Présentiel ou visio.</p>
        </div>
      </div>
      <div class="hr"></div>
      <p class="small">Langues : ${profile.langues.join(" · ")} | Combinaisons : ${profile.combinaisons.join(" · ")}</p>
    </div>
  </section>`;
  return htmlDoc({ title, description, body, nonce });
}
