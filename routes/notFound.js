import { htmlDoc } from "../views/htmlDoc.js";

export function registerNotFound(app) {
  app.use((req, res) => {
    const nonce = res.locals.nonce;
    const body = `
  <section class="section">
    <div class="container">
      <div class="card">
        <h2>Page introuvable</h2>
        <p class="small">Vérifiez l’URL ou retournez à l’accueil.</p>
        <a class="btn primary" href="/">Accueil</a>
      </div>
    </div>
  </section>`;
    res.status(404).send(htmlDoc({ title: "404", description: "Page introuvable", body, nonce }));
  });
}
