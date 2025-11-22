export const profile = {
  nom: "BAKHOUCHE",
  prenom: "Kamel",
  telephone: "06.82.26.87.11",
  email: "guemmour@gmail.com",
  ville: "Chambéry",
  cp: "73000",
  assermente: true,
  courAppel: "Cour d'Appel de Chambéry",
  langues: ["Arabe", "Français"],
  combinaisons: ["Français → Arabe", "Arabe → Français"],
  siret: null,
  formation:
    "Licence Traduction et Interprétariat – Université d'Alger – Septembre 1995",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  revolutBase: process.env.REVOLUT_LINK_BASE || "https://revolut.me/votrepseudo",
  sameAs: [
    "https://www.service-public.fr/",
    "https://www.courdecassation.fr/"
  ]
};
