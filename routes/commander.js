import fs from "fs";

import { upload } from "../middlewares/upload.js";
import { sanitize } from "../utils/sanitize.js";
import { nowISO } from "../utils/nowISO.js";
import { buildRevolutUrl } from "../utils/buildRevolutUrl.js";
import { transporter } from "../mail/transporter.js";
import { viewCommander } from "../views/viewCommander.js";

export function registerCommanderRoutes(app) {
  app.get("/commander", (req, res) => res.send(viewCommander(res.locals.nonce)));

  app.post("/commander", upload.single("fichier"), async (req, res) => {
    const b = req.body;
    
    const form = {
      nom: sanitize(b.nom),
      email: sanitize(b.email),
      telephone: sanitize(b.telephone), // laissé pour compatibilité (optionnel)
      typePrestation: sanitize(b.typePrestation),
      combinaison: sanitize(b.combinaison),
      typeDocument: sanitize(b.typeDocument), // laissé optionnel (non utilisé mais supporté)
      commentaire: sanitize(b.commentaire),
      reference: `CMD-${Date.now()}`
    };

    // Validation minimale
    const errors = {};
    if (!form.nom) errors.nom = "Obligatoire";
    if (!form.typePrestation) errors.typePrestation = "Obligatoire";
    if (!form.combinaison) errors.combinaison = "Obligatoire";
    if (!form.email && !form.telephone) errors.contact = "Email requis";

    // Retour si erreur
    if (Object.keys(errors).length) {
      if (req.file) try { fs.unlinkSync(req.file.path); } catch {}
      return res.status(400).send(viewCommander(res.locals.nonce, form, errors));
    }

    const record = {
      ...form,
      fichier: req.file ? req.file.filename : null,
      createdAt: nowISO(),
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress
    };

    // Stockage local JSON
    try {
      fs.mkdirSync("./data", { recursive: true });
      const dataFile = "./data/requests.json";
      const arr = fs.existsSync(dataFile)
        ? JSON.parse(fs.readFileSync(dataFile, "utf-8") || "[]")
        : [];
      arr.push(record);
      fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2));
    } catch {}

    // Envoi email si SMTP dispo
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.MAIL_FROM || "no-reply@local",
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || "",
          subject: `Nouvelle demande ${record.reference} – ${form.nom}`,
          text:
`Nouvelle demande reçue.

Référence: ${record.reference}
Nom: ${form.nom}
Email: ${form.email}
Téléphone: ${form.telephone || "—"}
Prestation: ${form.typePrestation}
Direction: ${form.combinaison}

Commentaire:
${form.commentaire || "—"}

Fichier: ${record.fichier || "Aucun"}
IP: ${record.ip}
`
        });
      } catch {}
    }

    // Pas de montant → donc pas de paiement → affichage confirmation simple
    return res.send(
      viewCommander(res.locals.nonce, {}, {}, {
        reference: record.reference,
        payUrl: null
      })
    );
  });
}
