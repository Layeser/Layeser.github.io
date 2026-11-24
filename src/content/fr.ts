import type { Dictionary } from './types'

export const fr: Dictionary = {
  meta: {
    siteTitle: 'Sekou Kaba — Ingénieur IA & Machine Learning',
    homeTitle: 'Sekou Kaba — Ingénieur IA & Machine Learning',
    homeDescription:
      'Ingénieur IA et ML : agents LLM, RAG, computer vision et MLOps, de la recherche à la production, mesurés. 1re place Kaggle, article soumis à CVPR 2027.',
    ogLocale: 'fr_FR',
    ogAlt: 'Sekou Kaba, ingénieur IA & Machine Learning',
  },
  a11y: {
    skip: 'Aller au contenu',
    nav: 'Principale',
    toLight: 'Passer au thème clair',
    toDark: 'Passer au thème sombre',
    language: 'Langue',
    switchTo: 'Read in English',
    portraitAlt: 'Portrait de Sekou Kaba, souriant, en t-shirt noir',
    external: "s'ouvre dans un nouvel onglet",
  },
  nav: { work: 'Projets', experience: 'Expérience', skills: 'Compétences', about: 'À propos', contact: 'Contact' },
  cv: { label: 'Télécharger le CV', href: '/Sekou-Kaba-CV-FR.pdf', note: 'PDF, 1 page' },
  hero: {
    role: 'Ingénieur IA & Machine Learning',
    line: "Je mène les systèmes d'IA de la recherche à la production, et je les mesure avant de leur faire confiance.",
    availability: 'Ouvert à un CDI · disponible immédiatement · Lille / Paris',
    proofs: [
      { value: '1^{re} / 13', label: 'équipes dans un challenge Kaggle de text-to-motion retrieval' },
      { value: 'CVPR 2027', label: "article en premier auteur, en cours d'évaluation" },
      { value: '2 M', label: 'de transactions dans un système de détection de fraude pour une institution de microfinance' },
    ],
    ctaWork: 'Voir mes projets',
  },
  work: {
    title: 'Projets choisis',
    intro:
      "Des projets personnels sur données publiques ou synthétiques, chacun avec son code, ses tests et son protocole d'évaluation. Les limites font partie du résultat.",
    personal: 'Projet personnel',
    featured: 'À la une',
    more: 'Autres projets',
    read: "Lire l'étude de cas",
  },
  experience: {
    title: 'Expérience',
    intro: 'Missions et postes. Le détail s\'arrête là où commence la confidentialité.',
    clientWork: 'Mission client',
    clientNote: 'Confidentielle, pas de code public.',
    publicReconstruction: 'Reconstruction publique sur données synthétiques :',
    research: 'Recherche',
    stack: 'Stack',
  },
  skills: {
    title: 'Compétences',
    intro:
      "Ce que j'ai utilisé en mission ou dans les projets ci-dessus. Les éléments plus discrets sont ceux que je suis encore en train de consolider.",
    notions: 'Notions',
    inTraining: 'En formation',
    languagesTitle: 'Langues',
    languages: 'Français (courant) · Anglais (professionnel — master et recherche en anglais)',
    legend: 'En pointillés : notions ou en formation',
  },
  education: { title: 'Formation' },
  about: {
    title: 'À propos',
    paragraphs: [
      "J'ai suivi deux ans de classes préparatoires en Côte d'Ivoire, puis l'École Centrale Casablanca et l'École Centrale de Lille, où je me suis spécialisé en IA. En chemin, j'ai construit un assistant RAG pour une équipe finance, un système de détection de fraude pour une institution de microfinance, et un nouveau mécanisme d'attention pour les réseaux de neurones à impulsions, aujourd'hui en relecture à CVPR.",
      "Le fil conducteur est simple : un modèle n'est pas terminé quand il tourne dans un notebook. Il l'est quand il est évalué sur des données qu'il n'a jamais vues, déployé derrière une API et surveillé une fois en service. C'est pour cela que mes pages projets montrent leurs protocoles, leurs limites, et la fuite de validation que j'ai trouvée dans mon propre modèle gagnant sur Kaggle.",
    ],
  },
  contact: {
    title: 'Contact',
    text: "Si vous construisez des systèmes d'IA qui doivent tenir en production, échangeons.",
    copy: "Copier l'e-mail",
    copied: 'Copié',
    write: "M'écrire",
  },
  project: {
    back: 'Tous les projets',
    personal: 'Projet personnel · données publiques ou synthétiques',
    keyResults: 'Résultats clés',
    stack: 'Stack',
    repo: 'Code, tests et README complet sur GitHub',
    figure: 'Figure produite par le code du projet',
    next: 'Projet suivant',
    headings: {
      problem: 'Le problème',
      context: 'Contexte',
      approach: "Ce que j'ai construit",
      results: 'Résultats',
      decisions: "Décisions d'ingénierie",
      limitations: 'Limites',
      lessons: 'Ce que les mesures ont changé',
    },
  },
  notFound: {
    title: 'Page introuvable',
    text: "Cette page n'existe pas, ou elle a été déplacée.",
    home: "Retour à l'accueil",
  },
  footer: {
    built: 'Construit avec React et TypeScript, pré-rendu, sans cookie ni traceur.',
    licence: 'Code sous licence MIT — contenu © Sekou Kaba',
    source: 'Source',
  },
}
