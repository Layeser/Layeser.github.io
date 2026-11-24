import type { Project } from './types'

// Source of every number: ai-portfolio/<repo>/README.md (see CONTENT_SOURCES.md).
// Prose numbers are written per language (decimal comma in French); headline metrics are shared numbers.

export const projects: Project[] = [
  {
    slug: 'fraudguard',
    repo: 'fraud-detection-platform',
    featured: true,
    title: { en: 'FraudGuard', fr: 'FraudGuard' },
    line: {
      en: 'Fraud detection from point-in-time features to an LLM agent that investigates alerts, with deterministic guardrails.',
      fr: "Une détection de fraude, des features point-in-time jusqu'à un agent LLM qui instruit les alertes, encadré par des garde-fous déterministes.",
    },
    headline: { value: 0.905, digits: 3, label: { en: 'PR-AUC on a chronological test split', fr: 'PR-AUC sur un test chronologique' } },
    headlineNote: { en: 'expert rules: 0.426', fr: 'règles expertes : 0,426' },
    metrics: [
      { value: 0.905, digits: 3, label: { en: 'PR-AUC, LightGBM', fr: 'PR-AUC, LightGBM' } },
      { value: 0.426, digits: 3, label: { en: 'PR-AUC, expert rules', fr: 'PR-AUC, règles expertes' } },
      { value: 0.92, digits: 2, label: { en: 'precision at the block threshold', fr: 'précision au seuil de blocage' } },
      { value: 28, digits: 0, suffix: ' ms', label: { en: 'scoring latency p50 (laptop CPU)', fr: 'latence de scoring p50 (CPU portable)' } },
    ],
    stack: ['LightGBM', 'SHAP', 'FastAPI', 'Prometheus', 'MLflow', 'LangGraph', 'MCP', 'Pydantic', 'Docker', 'GitHub Actions'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            "Card fraud is rare (0.25 % of transactions), expensive to miss, and expensive to over-flag: every false alert lands in an analyst's queue. The model also has to explain itself, and the explanation has to be computed the same way online and offline.",
          ],
          fr: [
            "La fraude à la carte est rare (0,25 % des transactions), coûteuse quand on la rate, et coûteuse quand on sur-alerte : chaque fausse alerte arrive dans la file d'un analyste. Le modèle doit aussi s'expliquer, et cette explication doit être calculée de la même façon en ligne et hors ligne.",
          ],
        },
      },
      {
        kind: 'context',
        body: {
          en: [
            'A public reconstruction, on synthetic data, of an architecture I built as a freelancer for a microfinance institution. No client code or data is used.',
          ],
          fr: [
            "Une reconstruction publique, sur données synthétiques, d'une architecture que j'ai construite en freelance pour une institution de microfinance. Aucun code ni donnée client n'est utilisé.",
          ],
        },
      },
      {
        kind: 'approach',
        body: {
          en: [
            'Point-in-time features (velocity, novelty, ratios) → LightGBM, compared with logistic regression and weighted expert rules → a real-time FastAPI service that returns its reasons: the rules fired and the top SHAP contributions.',
            'PSI drift monitoring with a retraining trigger, MLflow tracking, Prometheus metrics, CI with ruff, pytest and a Docker smoke test.',
            'A LangGraph agent that investigates alerts through an MCP server exposing the case data (labels removed), writes a structured report validated by Pydantic, then hands it to deterministic policy code.',
          ],
          fr: [
            'Features point-in-time (vélocité, nouveauté, ratios) → LightGBM, comparé à une régression logistique et à des règles expertes pondérées → un service FastAPI temps réel qui renvoie ses raisons : les règles déclenchées et les principales contributions SHAP.',
            'Monitoring du drift par PSI avec déclencheur de réentraînement, suivi MLflow, métriques Prometheus, CI avec ruff, pytest et un smoke test Docker.',
            "Un agent LangGraph qui instruit les alertes via un serveur MCP exposant les données du dossier (labels retirés), rédige un rapport structuré validé par Pydantic, puis le confie à un code de politique déterministe.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'Chronological split: train on days 30–90, thresholds on days 90–105, test on days 105–120 (71k transactions, 142 frauds). PR-AUC **0.905** for LightGBM against 0.644 for logistic regression and 0.426 for the expert rules.',
            'Block threshold, chosen on validation from a 90 % precision constraint: precision **0.92**, recall **0.89** on test. Scoring latency p50 28 ms, p95 32 ms on a laptop CPU.',
            'Drift scenario with a new fraud pattern: PR-AUC fell from 0.905 to 0.721, and input drift (PSI 1.09 on `is_foreign`) raised the alarm before the labels arrived.',
            'Agent on 15 deliberately hard alerts (7 frauds): 13 decided without a human, accuracy **0.85** when deciding, 7 of 8 legitimate alerts correctly closed.',
          ],
          fr: [
            'Découpage chronologique : entraînement sur les jours 30 à 90, seuils sur les jours 90 à 105, test sur les jours 105 à 120 (71 000 transactions, 142 fraudes). PR-AUC de **0,905** pour LightGBM, contre 0,644 pour la régression logistique et 0,426 pour les règles expertes.',
            "Seuil de blocage choisi sur la validation à partir d'une contrainte de précision de 90 % : précision de **0,92**, rappel de **0,89** sur le test. Latence de scoring p50 de 28 ms, p95 de 32 ms sur le CPU d'un portable.",
            "Scénario de drift avec un nouveau type de fraude : la PR-AUC est passée de 0,905 à 0,721, et le drift des entrées (PSI de 1,09 sur `is_foreign`) a donné l'alerte avant l'arrivée des labels.",
            'Agent sur 15 alertes volontairement difficiles (7 fraudes) : 13 tranchées sans humain, exactitude de **0,85** quand il tranche, 7 alertes légitimes sur 8 correctement classées.',
          ],
        },
      },
      {
        kind: 'decisions',
        body: {
          en: [
            '**The LLM recommends, code decides.** It cannot clear an alert above the block threshold, never blocks a card without a human, and every number it quotes must appear in a tool output: that number-tracing guardrail was added after the agent wrote "3.9×" for a 2.8× ratio.',
            '**No train/serve skew.** The API computes features by calling the same function on the customer history plus the new transaction, and a test checks online = offline.',
            '**Label leakage found and fixed.** The first simulator named fraudster devices `FRAUD-xxxx`, so the agent could read the answer. Device ids are now opaque hashes, enforced by a test.',
            '**PR-AUC, not ROC-AUC.** At 0.25 % prevalence ROC-AUC flatters the model (0.994 here, while PR-AUC is 0.905).',
          ],
          fr: [
            "**Le LLM recommande, le code décide.** Il ne peut pas classer une alerte au-dessus du seuil de blocage, ne bloque jamais une carte sans humain, et chaque chiffre qu'il cite doit figurer dans la sortie d'un outil : ce garde-fou a été ajouté après que l'agent a écrit « 3,9× » pour un rapport de 2,8×.",
            "**Pas d'écart entre entraînement et service.** L'API calcule les features en appelant la même fonction sur l'historique du client plus la nouvelle transaction, et un test vérifie l'égalité en ligne / hors ligne.",
            "**Fuite de labels trouvée et corrigée.** Le premier simulateur nommait les appareils des fraudeurs `FRAUD-xxxx` : l'agent pouvait lire la réponse. Les identifiants sont désormais des hachages opaques, imposés par un test.",
            '**PR-AUC plutôt que ROC-AUC.** À 0,25 % de prévalence, la ROC-AUC flatte le modèle (0,994 ici, pour une PR-AUC de 0,905).',
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            '**Stealth fraud** (own device, home country, plausible amount) is caught 20 % of the time at the review threshold, and the agent inherits that blind spot: the 2 frauds it wrongly cleared are both stealth. Its value is triage and report-writing, not the final decision.',
            'The data is synthetic; streaming ingestion (CDC → Debezium → Kafka) and the Redis feature store are replaced by files and an in-memory store in this public version. The agent evaluation uses 15 alerts (free-tier rate limits).',
          ],
          fr: [
            "La **fraude furtive** (appareil habituel, pays d'origine, montant plausible) n'est détectée que dans 20 % des cas au seuil de revue, et l'agent hérite de cet angle mort : les 2 fraudes qu'il a classées à tort sont furtives. Sa valeur est le tri et la rédaction, pas la décision finale.",
            "Les données sont synthétiques ; l'ingestion streaming (CDC → Debezium → Kafka) et le feature store Redis sont remplacés par des fichiers et un store en mémoire dans cette version publique. L'évaluation de l'agent porte sur 15 alertes (limites du palier gratuit).",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'fraudguard/pr_curves',
        width: 1024,
        height: 736,
        alt: {
          en: 'Precision-recall curves on the test period: LightGBM well above logistic regression and the expert rules.',
          fr: 'Courbes précision-rappel sur la période de test : LightGBM nettement au-dessus de la régression logistique et des règles expertes.',
        },
        caption: { en: 'Precision-recall curves, test period.', fr: 'Courbes précision-rappel, période de test.' },
      },
      {
        src: 'fraudguard/drift_psi',
        width: 1024,
        height: 736,
        alt: {
          en: 'Population stability index per feature in the drift scenario; is_foreign is far above the 0.25 drift line.',
          fr: 'Indice de stabilité (PSI) par feature dans le scénario de drift ; is_foreign dépasse largement le seuil de 0,25.',
        },
        caption: { en: 'Input drift per feature (PSI).', fr: 'Drift des entrées par feature (PSI).' },
      },
    ],
  },
  {
    slug: 'rag-assistant',
    repo: 'enterprise-rag-assistant',
    featured: true,
    title: { en: 'Atelier Nord assistant', fr: 'Assistant Atelier Nord' },
    line: {
      en: "A RAG over internal policies that cites its sources and refuses when the documents don't hold the answer.",
      fr: 'Un RAG sur des politiques internes qui cite ses sources et refuse de répondre quand les documents ne contiennent pas la réponse.',
    },
    headline: { value: 98.3, digits: 1, suffix: ' %', label: { en: 'answer accuracy on a 66-question gold set', fr: 'de réponses exactes sur 66 questions de référence' } },
    headlineNote: { en: '100 % correct citations', fr: '100 % de citations correctes' },
    metrics: [
      { value: 98.3, digits: 1, suffix: ' %', label: { en: 'answer accuracy (57/58)', fr: 'réponses exactes (57/58)' } },
      { value: 100, digits: 0, suffix: ' %', label: { en: 'correct citations', fr: 'citations correctes' } },
      { value: 8, digits: 0, suffix: ' / 8', label: { en: 'unanswerable questions refused', fr: 'questions sans réponse refusées' } },
      { value: 0, digits: 0, suffix: ' %', label: { en: 'answerable questions wrongly refused', fr: 'questions légitimes refusées à tort' } },
    ],
    stack: ['bge-m3', 'BM25', 'Chroma', 'bge-reranker-v2-m3', 'Prompt Guard 2', 'Groq', 'FastAPI', 'Gradio', 'Docker'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Employees of a fictional 400-person manufacturer ask questions in everyday French ("my work laptop vanished in the metro, who do I tell?") and need a short answer with a citation to the exact policy section. When the documents do not contain the answer, the assistant must say so instead of inventing one.',
          ],
          fr: [
            "Les salariés d'un industriel fictif de 400 personnes posent leurs questions en français courant (« mon PC de boulot a disparu dans le métro, je préviens qui ? ») et attendent une réponse courte, avec la citation de la section exacte de la politique. Quand les documents ne contiennent pas la réponse, l'assistant doit le dire au lieu d'en inventer une.",
          ],
        },
      },
      {
        kind: 'approach',
        body: {
          en: [
            'Structure-aware PDF chunking with contextual headers; BM25 + `bge-m3` dense retrieval fused by weighted RRF; `bge-reranker-v2-m3` cross-encoder; a strict grounding prompt with numbered citations checked against the retrieved chunks.',
            'Input guardrails: Llama Prompt Guard 2 **and** high-precision injection patterns, with "documents are data, not instructions".',
            'A 66-question gold set (direct, paraphrased, unanswerable) scoring retrieval, answers, citations, refusals, faithfulness (an LLM judge from another model family) and injection attempts.',
          ],
          fr: [
            'Découpage des PDF selon leur structure, avec en-têtes contextuels ; recherche BM25 + dense `bge-m3` fusionnée par RRF pondérée ; cross-encoder `bge-reranker-v2-m3` ; prompt strictement ancré, avec des citations numérotées vérifiées contre les passages récupérés.',
            "Garde-fous en entrée : Llama Prompt Guard 2 **et** des motifs d'injection à haute précision, avec la règle « les documents sont des données, pas des instructions ».",
            "Un jeu de référence de 66 questions (directes, paraphrasées, sans réponse) qui mesure la recherche, les réponses, les citations, les refus, la fidélité (un LLM juge d'une autre famille de modèles) et les tentatives d'injection.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'Answer accuracy **0.983** (57/58; 1.000 on questions phrased like the documents, 0.929 on paraphrases), citation accuracy **1.000**, 0 % of answerable questions refused, **8/8** unanswerable questions refused, faithfulness 0.948 per the judge.',
            'The one miss is visible: a paraphrased question about business class omits the "flight over 9 hours" condition. The judge also caught a subtle hallucination ("analysed by the security team" for "per team") that exact-match checks alone would have missed.',
          ],
          fr: [
            "Réponses exactes : **0,983** (57/58 ; 1,000 sur les questions formulées comme les documents, 0,929 sur les paraphrases), citations correctes : **1,000**, 0 % de questions légitimes refusées, **8/8** questions sans réponse refusées, fidélité de 0,948 selon le juge.",
            "Le seul échec est visible : une question paraphrasée sur la classe affaires oublie la condition « vol de plus de 9 heures ». Le juge a aussi repéré une hallucination subtile (« analysés par l'équipe sécurité » au lieu de « par équipe ») que des vérifications exactes seules auraient laissée passer.",
          ],
        },
      },
      {
        kind: 'lessons',
        body: {
          en: [
            '**Paraphrases expose BM25.** Alone, it reached hit@1 0.91 on questions phrased like the documents and 0.36 on paraphrases. A gold set written in the documents\' wording would have hidden this.',
            '**Embedding choice mattered most**: dense hit@1 on paraphrases went from 0.57 (multilingual MiniLM) to 0.93 (`bge-m3`).',
            '**Classic RRF hurt**: equal-weight fusion dragged paraphrases down (0.93 → 0.71); weighting the dense ranking at 0.9 kept the exact-term benefit without the penalty.',
            '**The reranker is reported honestly**: +0.012 MRR for 10× the latency. On this small corpus it is not clearly worth it, and a CPU deployment should use dense retrieval only.',
            '**A "refuse if the reranker score is low" gate was rejected**: its best threshold would have refused 15 % of answerable questions.',
          ],
          fr: [
            "**Les paraphrases démasquent BM25.** Seul, il atteignait un hit@1 de 0,91 sur les questions formulées comme les documents, et de 0,36 sur les paraphrases. Un jeu de référence écrit avec les mots des documents l'aurait caché.",
            "**Le choix de l'embedding a le plus compté** : le hit@1 dense sur les paraphrases est passé de 0,57 (MiniLM multilingue) à 0,93 (`bge-m3`).",
            '**La RRF classique a nui** : la fusion à poids égaux faisait chuter les paraphrases (0,93 → 0,71) ; pondérer le classement dense à 0,9 garde le bénéfice des termes exacts sans la pénalité.',
            "**Le reranker est présenté honnêtement** : +0,012 de MRR pour une latence multipliée par 10. Sur ce petit corpus, il ne se justifie pas clairement, et un déploiement CPU devrait se limiter à la recherche dense.",
            "**Un filtre « refuser si le score du reranker est bas » a été écarté** : son meilleur seuil aurait refusé 15 % des questions légitimes.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'The corpus is small (10 documents, 52 chunks) and fictional, so retrieval is easier than on a real intranet; the paraphrase set is the main safeguard against over-optimism.',
            'Prompt Guard 2 alone blocked 4 of 6 attacks; the 6/6 figure is optimistic, because one pattern was added after seeing the miss. The faithfulness judge is itself an LLM, spot-checked, not audited.',
          ],
          fr: [
            "Le corpus est petit (10 documents, 52 passages) et fictif : la recherche y est plus facile que sur un vrai intranet, et le jeu de paraphrases est le principal garde-fou contre l'optimisme.",
            "Prompt Guard 2 seul bloquait 4 attaques sur 6 ; le 6/6 est optimiste, car un motif a été ajouté après avoir vu l'échec. Le juge de fidélité est lui-même un LLM, vérifié par sondage, pas audité.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'rag-assistant/retrieval_ablation',
        width: 1400,
        height: 554,
        alt: {
          en: 'Retrieval ablation: hit@1 and MRR for BM25, dense bge-m3, weighted fusion and fusion plus reranker, on direct and paraphrased questions.',
          fr: 'Ablation de la recherche : hit@1 et MRR pour BM25, dense bge-m3, fusion pondérée et fusion avec reranker, sur questions directes et paraphrasées.',
        },
        caption: { en: 'Retrieval ablation on 58 answerable questions.', fr: 'Ablation de la recherche sur 58 questions avec réponse.' },
      },
    ],
  },
  {
    slug: 'text-to-motion',
    repo: 'text-to-motion-retrieval',
    featured: true,
    title: { en: 'Text-to-motion retrieval', fr: 'Text-to-motion retrieval' },
    line: {
      en: 'Find a motion-capture sequence from a sentence. Won the Kaggle challenge, then found that the local validation score was measured on training data.',
      fr: "Retrouver une séquence de motion capture à partir d'une phrase. Challenge Kaggle gagné, puis découverte que le score de validation local était mesuré sur des données d'entraînement.",
    },
    headline: { value: 0.898, digits: 3, label: { en: 'leaderboard score, 1st of 13 teams (team of 3)', fr: 'score au classement, 1^{re} équipe sur 13 (équipe de 3)' } },
    headlineNote: { en: 'R@1 0.571 on unseen motions', fr: 'R@1 de 0,571 sur des mouvements inédits' },
    metrics: [
      { value: 0.898, digits: 3, label: { en: 'Kaggle score (2nd team: 0.867)', fr: 'score Kaggle (2^{e} équipe : 0,867)' } },
      { value: 0.933, digits: 3, label: { en: 'original local R@1, leaked', fr: "R@1 local d'origine, avec fuite" } },
      { value: 0.571, digits: 3, label: { en: 'R@1 among 32, unseen motions', fr: 'R@1 parmi 32, mouvements inédits' } },
      { value: 20, digits: 0, suffix: ' ms', label: { en: 'query latency on CPU', fr: 'latence par requête sur CPU' } },
    ],
    stack: ['PyTorch', 'Transformer', 'all-MiniLM-L6-v2', 'InfoNCE', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Describe a two-person interaction in English ("two people shake hands and then walk away") and retrieve the matching motion-capture sequences from a library of 6,018.',
          ],
          fr: [
            "Décrire une interaction entre deux personnes en anglais (« two people shake hands and then walk away ») et retrouver les séquences de motion capture correspondantes dans une bibliothèque de 6 018.",
          ],
        },
      },
      {
        kind: 'context',
        body: {
          en: [
            'A university data challenge on Kaggle (Université de Lille, Centrale Lille, IMT Nord Europe). Our team of three, **Recall@1**, finished **1st of 13** with 0.898 (2nd: 0.867, 3rd: 0.847). The score averages Recall@k for k = 1…10 weighted by 1/k, on hidden test data.',
          ],
          fr: [
            "Un data challenge universitaire sur Kaggle (Université de Lille, Centrale Lille, IMT Nord Europe). Notre équipe de trois, **Recall@1**, a fini **1^{re} sur 13** avec 0,898 (2^{e} : 0,867, 3^{e} : 0,847). Le score moyenne le Recall@k pour k = 1…10, pondéré par 1/k, sur des données de test cachées.",
          ],
        },
      },
      {
        kind: 'approach',
        body: {
          en: [
            'A CLIP-style dual encoder: a pretrained sentence encoder for the text, a 4-layer Transformer over the motion frames, both projected to 256 dimensions and trained with a symmetric InfoNCE loss and a learnable temperature. The three descriptions of each motion act as augmentation.',
          ],
          fr: [
            "Un dual encoder de type CLIP : un encodeur de phrases pré-entraîné pour le texte, un Transformer à 4 couches sur les frames du mouvement, tous deux projetés en 256 dimensions et entraînés avec une loss InfoNCE symétrique et une température apprise. Les trois descriptions de chaque mouvement servent d'augmentation.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            "**The finding.** The notebook reported Recall@1 = 0.933 on the challenge's validation folders. Hashing every candidate motion showed that **640 of 640** sampled validation candidates were also training motions: the model was recognising sequences it had memorised. The leak concerns only the local score; the leaderboard scores hidden data.",
            'The rebuilt pipeline holds out 10 % of motion ids (601 motions, 1,803 descriptions) **before** training. On these unseen motions: R@1 **0.571** with the target among 32 candidates (random: 0.031), and 0.119 against the full gallery of 601 (median rank 10).',
            'The held-out score plateaus around epoch 20 while the training loss keeps falling. Under the leaky protocol that plateau was invisible, because memorisation raised the reported score.',
          ],
          fr: [
            "**La découverte.** Le notebook annonçait un Recall@1 de 0,933 sur les dossiers de validation du challenge. En hachant chaque mouvement candidat, j'ai constaté que **640 sur 640** candidats de validation échantillonnés étaient aussi des mouvements d'entraînement : le modèle reconnaissait des séquences qu'il avait mémorisées. La fuite ne concerne que le score local ; le classement note des données cachées.",
            "Le pipeline reconstruit met de côté 10 % des identifiants de mouvements (601 mouvements, 1 803 descriptions) **avant** l'entraînement. Sur ces mouvements inédits : R@1 de **0,571** avec la cible parmi 32 candidats (hasard : 0,031), et de 0,119 face à toute la galerie de 601 (rang médian 10).",
            "Le score sur les données mises de côté plafonne vers l'epoch 20 pendant que la loss d'entraînement continue de baisser. Avec le protocole fuité, ce plateau était invisible, car la mémorisation faisait monter le score affiché.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'A gallery R@1 of 0.12 shows that fine-grained retrieval among hundreds of similar interactions is still hard. Next: early stopping at epoch 20, hard-negative mining, a larger text encoder.',
          ],
          fr: [
            "Un R@1 de 0,12 sur la galerie montre que la recherche fine parmi des centaines d'interactions similaires reste difficile. Prochaines étapes : arrêt à l'epoch 20, hard negatives, encodeur de texte plus grand.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'text-to-motion/training_vs_holdout',
        width: 1056,
        height: 672,
        alt: {
          en: 'Training loss keeps falling while the held-out retrieval score plateaus around epoch 20.',
          fr: "La loss d'entraînement continue de baisser alors que le score sur les données mises de côté plafonne vers l'epoch 20.",
        },
        caption: { en: 'Training loss vs held-out score.', fr: "Loss d'entraînement vs score sur données mises de côté." },
      },
    ],
  },
  {
    slug: 'sales-forecasting',
    repo: 'sales-forecasting',
    featured: true,
    title: { en: 'Sales forecasting on M5 (Walmart)', fr: 'Prévision des ventes sur M5 (Walmart)' },
    line: {
      en: '28-day forecasts for 30,490 product × store series, scored with the official competition metric.',
      fr: 'Des prévisions à 28 jours pour 30 490 séries produit × magasin, notées avec la métrique officielle de la compétition.',
    },
    headline: { value: 0.555, digits: 3, label: { en: 'WRMSSE on the M5 evaluation period (lower is better)', fr: "WRMSSE sur la période d'évaluation M5 (plus bas = mieux)" } },
    headlineNote: { en: 'winner: 0.520 · seasonal naive: 0.847', fr: 'vainqueur : 0,520 · naïf saisonnier : 0,847' },
    metrics: [
      { value: 0.555, digits: 3, label: { en: 'blend 0.8 LightGBM + 0.2 TiDE', fr: 'mélange 0,8 LightGBM + 0,2 TiDE' } },
      { value: 0.561, digits: 3, label: { en: 'LightGBM alone', fr: 'LightGBM seul' } },
      { value: 0.847, digits: 3, label: { en: 'seasonal naive benchmark', fr: 'référence naïve saisonnière' } },
      { value: 0.52, digits: 3, label: { en: 'M5 winner, for reference', fr: 'vainqueur M5, pour référence' } },
    ],
    stack: ['LightGBM', 'PyTorch', 'TiDE', 'pandas', 'SciPy', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Forecast the next 28 days of daily unit sales for 30,490 product × store series (3 states, 10 stores, 3,049 products) from sales history, a calendar (holidays, events, SNAP days) and weekly prices, scored with the official WRMSSE on the competition\'s real evaluation period, which is never used for any choice.',
          ],
          fr: [
            "Prévoir les 28 prochains jours de ventes quotidiennes pour 30 490 séries produit × magasin (3 États, 10 magasins, 3 049 produits) à partir de l'historique, d'un calendrier (jours fériés, événements, jours SNAP) et des prix hebdomadaires, avec le WRMSSE officiel sur la vraie période d'évaluation de la compétition, jamais utilisée pour un choix.",
          ],
        },
      },
      {
        kind: 'approach',
        body: {
          en: [
            'Every sales feature is at least 28 days old, so one global model forecasts the whole horizon without recursion or leakage. LightGBM with a Tweedie objective (suited to intermittent counts), and TiDE, the MLP encoder–decoder of Das et al. (TMLR 2023), implemented in PyTorch. The blend weight is chosen on the validation fold.',
            'The metric code reproduces the published M5 benchmarks exactly (seasonal naive 0.847, naive 1.752), so the numbers are comparable with the competition\'s.',
          ],
          fr: [
            "Chaque feature de ventes a au moins 28 jours, si bien qu'un seul modèle global prévoit tout l'horizon sans récursion ni fuite. LightGBM avec une objective Tweedie (adaptée aux comptages intermittents), et TiDE, l'encodeur–décodeur MLP de Das et al. (TMLR 2023), implémenté en PyTorch. Le poids du mélange est choisi sur le fold de validation.",
            'Le code de la métrique reproduit exactement les références publiées de M5 (naïf saisonnier 0,847, naïf 1,752) : les chiffres sont comparables à ceux de la compétition.',
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'WRMSSE **0.555** for the blend, 0.561 for LightGBM, 0.774 for TiDE, against 0.847 for the seasonal naive benchmark; the M5 winner (5,558 teams) scored 0.520.',
            'Aggregates are accurate and single items are noisy: RMSSE is about 0.2–0.4 for total, state and category sales but about 0.9–1.0 for individual items.',
          ],
          fr: [
            'WRMSSE de **0,555** pour le mélange, 0,561 pour LightGBM, 0,774 pour TiDE, contre 0,847 pour la référence naïve saisonnière ; le vainqueur de M5 (5 558 équipes) a obtenu 0,520.',
            "Les agrégats sont précis, les articles isolés sont bruités : le RMSSE est d'environ 0,2 à 0,4 pour les ventes totales, par État et par catégorie, mais d'environ 0,9 à 1,0 pour un article seul.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'Deep learning did not beat gradient boosting here, as in the competition itself; TiDE still helps the blend because its errors differ. The gap to the winner comes from many per-store, per-horizon LightGBM models and careful ensembling, where this project uses one model per family.',
          ],
          fr: [
            "Le deep learning n'a pas battu le gradient boosting ici, comme dans la compétition elle-même ; TiDE aide tout de même le mélange car ses erreurs diffèrent. L'écart avec le vainqueur vient de nombreux modèles LightGBM par magasin et par horizon et d'un ensemble soigné, là où ce projet utilise un modèle par famille.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'sales-forecasting/wrmsse',
        width: 1120,
        height: 576,
        alt: {
          en: 'WRMSSE by model: naive, seasonal naive, TiDE, LightGBM and the blend, with the M5 winner as reference.',
          fr: 'WRMSSE par modèle : naïf, naïf saisonnier, TiDE, LightGBM et le mélange, avec le vainqueur M5 en référence.',
        },
        caption: { en: 'WRMSSE on the M5 evaluation period.', fr: "WRMSSE sur la période d'évaluation M5." },
      },
      {
        src: 'sales-forecasting/levels',
        width: 1280,
        height: 576,
        alt: {
          en: 'RMSSE for each of the 12 aggregation levels: low for totals and categories, close to 1 for single items.',
          fr: 'RMSSE pour chacun des 12 niveaux d’agrégation : bas pour les totaux et catégories, proche de 1 pour les articles seuls.',
        },
        caption: { en: 'Error by aggregation level.', fr: "Erreur par niveau d'agrégation." },
      },
    ],
  },
  {
    slug: 'llm-finetuning',
    repo: 'llm-finetuning',
    featured: false,
    title: { en: 'LLM fine-tuning for data extraction', fr: 'Fine-tuning de LLM pour extraire des données' },
    line: {
      en: 'LoRA on a 1.5B open model to turn receipts into JSON, on a laptop GPU, with 1.2 % of the weights trained.',
      fr: "Un LoRA sur un modèle open source de 1,5 milliard de paramètres pour transformer des tickets de caisse en JSON, sur le GPU d'un portable, avec 1,2 % des poids entraînés.",
    },
    headline: { value: 0.87, from: 0.543, digits: 2, label: { en: 'field F1 on the CORD test set', fr: 'F1 par champ sur le test CORD' } },
    headlineNote: { en: 'zero-shot → LoRA', fr: 'zéro-shot → LoRA' },
    metrics: [
      { value: 0.87, from: 0.543, digits: 3, label: { en: 'field F1, zero-shot → LoRA', fr: 'F1 par champ, zéro-shot → LoRA' } },
      { value: 45, from: 0, digits: 0, suffix: ' %', label: { en: 'receipts with every field right', fr: 'tickets entièrement justes' } },
      { value: 0.45, from: 1.97, digits: 2, suffix: ' s', label: { en: 'generation time per receipt', fr: 'temps de génération par ticket' } },
      { value: 1.2, digits: 1, suffix: ' %', label: { en: 'of the weights trained', fr: 'des poids entraînés' } },
    ],
    stack: ['Qwen2.5-1.5B-Instruct', 'PEFT', 'LoRA', 'PyTorch', 'Transformers', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Turn receipt text into structured JSON (items with name, quantity and price; subtotal, tax, service; total, cash, change) on the public CORD v2 benchmark: 800 training, 100 validation and 100 test receipts. The base model and the fine-tuned one get the same prompt, which describes the target schema.',
          ],
          fr: [
            'Transformer le texte de tickets de caisse en JSON structuré (articles avec nom, quantité et prix ; sous-total, taxe, service ; total, espèces, monnaie rendue) sur le benchmark public CORD v2 : 800 tickets d’entraînement, 100 de validation et 100 de test. Le modèle de base et le modèle fine-tuné reçoivent le même prompt, qui décrit le schéma cible.',
          ],
        },
      },
      {
        kind: 'approach',
        body: {
          en: [
            'LoRA rank 16 on every attention and MLP projection of Qwen2.5-1.5B-Instruct, bf16, gradient checkpointing. The loss is computed on the answer tokens only, so the model learns to answer rather than to reproduce its input. After each epoch the model generates on the validation receipts and the best epoch is kept; the test set is scored once.',
            'Served by FastAPI with the adapter merged into the base weights, generation in a worker thread behind a lock so the event loop stays responsive.',
          ],
          fr: [
            "LoRA de rang 16 sur toutes les projections d'attention et de MLP de Qwen2.5-1.5B-Instruct, en bf16, avec gradient checkpointing. La loss ne porte que sur les tokens de la réponse : le modèle apprend à répondre, pas à recopier son entrée. Après chaque epoch, le modèle génère sur les tickets de validation et la meilleure epoch est retenue ; le test n'est noté qu'une fois.",
            "Servi par FastAPI avec l'adaptateur fusionné dans les poids de base, la génération tournant dans un thread dédié derrière un verrou pour que la boucle d'événements reste réactive.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'Field F1 **0.543 → 0.870** on the test set; receipts with every field right **0 % → 45 %**; valid JSON 99 % for both. The fine-tuned model is also 4× faster (0.45 s vs 1.97 s per receipt), because it writes compact JSON instead of pretty-printing every key with null values.',
          ],
          fr: [
            "F1 par champ de **0,543 → 0,870** sur le test ; tickets entièrement justes : **0 % → 45 %** ; JSON valide à 99 % dans les deux cas. Le modèle fine-tuné est aussi 4 fois plus rapide (0,45 s contre 1,97 s par ticket), car il écrit un JSON compact au lieu d'afficher chaque clé avec des valeurs nulles.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            "Not comparable with Donut's published CORD F1: Donut reads the image, while here the model reads text rebuilt from the annotated words. Sub-items (options listed under a dish) remain weak, with a recall of 0.19 for their names.",
            'A first run crashed on the GPU during epoch 2; its epoch-1 checkpoint was scored on test at that point (F1 0.833). That score did not influence any choice.',
          ],
          fr: [
            "Pas comparable au F1 publié par Donut sur CORD : Donut lit l'image, alors qu'ici le modèle lit le texte reconstruit à partir des mots annotés. Les sous-articles (options listées sous un plat) restent faibles, avec un rappel de 0,19 sur leurs noms.",
            "Un premier entraînement a planté sur le GPU pendant l'epoch 2 ; son checkpoint de l'epoch 1 a été noté sur le test à ce moment-là (F1 de 0,833). Ce score n'a influencé aucun choix.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'llm-finetuning/scores',
        width: 1050,
        height: 510,
        alt: {
          en: 'Bar chart on 100 test receipts: field F1 0.54 zero-shot vs 0.87 with LoRA; valid JSON 0.99 for both; receipts fully correct 0.00 vs 0.45.',
          fr: 'Histogramme sur 100 tickets de test : F1 par champ de 0,54 en zéro-shot contre 0,87 avec LoRA ; JSON valide à 0,99 pour les deux ; tickets entièrement justes 0,00 contre 0,45.',
        },
        caption: { en: 'Zero-shot vs LoRA, CORD v2 test set.', fr: 'Zéro-shot vs LoRA, test CORD v2.' },
      },
      {
        src: 'llm-finetuning/fields',
        width: 1050,
        height: 600,
        alt: {
          en: 'Recall per field for the 12 most frequent fields: LoRA above zero-shot everywhere, sub-items still low.',
          fr: 'Rappel par champ pour les 12 champs les plus fréquents : LoRA au-dessus du zéro-shot partout, sous-articles encore faibles.',
        },
        caption: { en: 'Recall per field.', fr: 'Rappel par champ.' },
      },
    ],
  },
  {
    slug: 'product-categorisation',
    repo: 'hierarchical-product-nlp',
    featured: false,
    title: { en: 'Product categorisation', fr: 'Catégorisation de produits' },
    line: {
      en: '100 categories in a 184-node taxonomy, with confidence routing to a human. The cheap model won.',
      fr: 'Cent catégories dans une taxonomie de 184 nœuds, avec routage vers un humain selon la confiance. Le modèle le plus simple a gagné.',
    },
    headline: { value: 82, digits: 0, suffix: ' %', label: { en: 'of products auto-categorised at 94.6 % accuracy', fr: 'des produits classés automatiquement à 94,6 % d’exactitude' } },
    headlineNote: { en: 'TF-IDF beat fine-tuned XLM-R', fr: 'TF-IDF devant XLM-R fine-tuné' },
    metrics: [
      { value: 0.869, digits: 3, label: { en: 'accuracy, TF-IDF + linear SVM', fr: 'exactitude, TF-IDF + SVM linéaire' } },
      { value: 0.849, digits: 3, label: { en: 'accuracy, fine-tuned XLM-RoBERTa', fr: 'exactitude, XLM-RoBERTa fine-tuné' } },
      { value: 0.932, digits: 3, label: { en: 'hierarchical F1', fr: 'F1 hiérarchique' } },
      { value: 82, digits: 0, suffix: ' %', label: { en: 'auto-categorised at a 95 % target', fr: 'classés automatiquement, cible 95 %' } },
    ],
    stack: ['scikit-learn', 'TF-IDF', 'linear SVM', 'XLM-RoBERTa', 'PyTorch', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Assign each e-commerce product (title, description, brand, colour; mostly French) to one of 100 leaf categories of a 184-node taxonomy, and decide when the prediction is safe enough to publish without a human. It started as a technical-assignment notebook and became a package with validation, two models, hierarchical metrics, routing, an API and tests.',
          ],
          fr: [
            "Affecter chaque produit e-commerce (titre, description, marque, couleur ; surtout en français) à l'une des 100 catégories feuilles d'une taxonomie de 184 nœuds, et décider quand la prédiction est assez sûre pour être publiée sans humain. Parti d'un notebook de test technique, c'est devenu un package avec validation, deux modèles, métriques hiérarchiques, routage, API et tests.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'On the official test set (7,631 products): TF-IDF + linear SVM reaches accuracy **0.869** and macro-F1 0.839, ahead of the notebook baseline (0.842) and of XLM-RoBERTa fine-tuned for 6 epochs (0.849). Product titles are short and full of brands, model numbers and units, where character n-grams are hard to beat.',
            'Errors stay close in the tree: the first two levels of the path are right 97.6 % and 96.5 % of the time. With a threshold calibrated on validation, **82 %** of products are published automatically at 94.6 % accuracy; the rest go to a human with the deepest confident category.',
          ],
          fr: [
            "Sur le test officiel (7 631 produits) : TF-IDF + SVM linéaire atteint une exactitude de **0,869** et un F1-macro de 0,839, devant la référence du notebook (0,842) et XLM-RoBERTa fine-tuné 6 epochs (0,849). Les titres de produits sont courts et pleins de marques, de références et d'unités, où les n-grammes de caractères sont difficiles à battre.",
            "Les erreurs restent proches dans l'arbre : les deux premiers niveaux du chemin sont justes à 97,6 % et 96,5 %. Avec un seuil calibré sur la validation, **82 %** des produits sont publiés automatiquement à 94,6 % d'exactitude ; le reste part vers un humain, avec la catégorie la plus profonde jugée sûre.",
          ],
        },
      },
      {
        kind: 'decisions',
        body: {
          en: [
            '**Leakage checked**: 131 test products share an exact title with a training product; scores without them are identical (0.8693 vs 0.8691).',
            '**A GPU memory bug found by timing**: epoch 2 took 33 min against 15 for epoch 1, because the best weights were copied on the GPU; they are now copied to CPU.',
            '**The served model is chosen on validation macro-F1**, never on test.',
          ],
          fr: [
            '**Fuite vérifiée** : 131 produits de test partagent un titre exact avec un produit d’entraînement ; les scores sans eux sont identiques (0,8693 contre 0,8691).',
            "**Un bug mémoire GPU repéré au chronomètre** : l'epoch 2 prenait 33 min contre 15 pour l'epoch 1, car les meilleurs poids étaient copiés sur le GPU ; ils sont désormais copiés sur le CPU.",
            "**Le modèle servi est choisi sur le F1-macro de validation**, jamais sur le test.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'The dataset belongs to the assignment provider and is not public, so the trained TF-IDF model is shared on request only (its vocabulary contains words from the private data).',
          ],
          fr: [
            "Le jeu de données appartient au fournisseur du test technique et n'est pas public : le modèle TF-IDF entraîné n'est partagé que sur demande (son vocabulaire contient des mots des données privées).",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'product-categorisation/coverage_accuracy',
        width: 1024,
        height: 704,
        alt: {
          en: 'Trade-off between the share of products published automatically and their accuracy, for both models.',
          fr: 'Compromis entre la part de produits publiés automatiquement et leur exactitude, pour les deux modèles.',
        },
        caption: { en: 'Automation vs accuracy.', fr: 'Automatisation vs exactitude.' },
      },
    ],
  },
  {
    slug: 'ranking-bandits',
    repo: 'ranking-bandits',
    featured: false,
    title: { en: 'Ranking with cascading bandits', fr: 'Classement par bandits en cascade' },
    line: {
      en: 'Learn which 5 items to show from clicks alone, online, and serve the policy behind an API.',
      fr: 'Apprendre en ligne, à partir des seuls clics, quels 5 articles afficher, et servir la politique derrière une API.',
    },
    headline: { value: 99, digits: 0, suffix: ' %', label: { en: 'of the optimal click rate (Thompson sampling)', fr: 'du taux de clic optimal (Thompson sampling)' } },
    headlineNote: { en: '3× random ranking', fr: '3× un classement aléatoire' },
    metrics: [
      { value: 0.656, digits: 3, label: { en: 'CTR after learning, Thompson', fr: 'CTR après apprentissage, Thompson' } },
      { value: 0.216, digits: 3, label: { en: 'CTR, random ranking', fr: 'CTR, classement aléatoire' } },
      { value: 718, digits: 0, label: { en: 'lost clicks over 20,000 users', fr: 'clics perdus sur 20 000 utilisateurs' } },
    ],
    stack: ['NumPy', 'Thompson sampling', 'KL-UCB', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            'Which 5 products should a page show when click-through rates are unknown and the catalogue changes? Users scan top-down and click the first attractive item: items below a click were never seen, so treating "not clicked" as "not attractive" would bias every estimate.',
          ],
          fr: [
            "Quels 5 produits afficher quand les taux de clic sont inconnus et que le catalogue change ? Les utilisateurs lisent de haut en bas et cliquent sur le premier article attirant : les articles sous un clic n'ont jamais été vus, et traiter « pas cliqué » comme « pas attirant » biaiserait chaque estimation.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            '20,000 users, 10 seeds, 95 % confidence bands, 100 items, top-5 list. Cascade Thompson sampling loses **718** clicks and reaches **99 %** of the optimal click rate, 3× random ranking. KL-UCB cuts UCB1\'s regret by 3.5×; ε-greedy looks good on a stable catalogue but suffers most from a popularity shift (+50 % regret).',
            'The API rejects unknown, expired or replayed ranking ids, so a replayed callback cannot double-count a click, and checkpoints the posterior so a restart keeps what was learned.',
          ],
          fr: [
            "20 000 utilisateurs, 10 graines, intervalles de confiance à 95 %, 100 articles, liste de 5. Le Thompson sampling en cascade perd **718** clics et atteint **99 %** du taux de clic optimal, 3 fois un classement aléatoire. KL-UCB divise le regret d'UCB1 par 3,5 ; ε-greedy paraît bon sur un catalogue stable mais souffre le plus d'un changement de popularité (+50 % de regret).",
            "L'API rejette les identifiants de classement inconnus, expirés ou rejoués, pour qu'un rappel rejoué ne compte pas deux fois un clic, et sauvegarde la loi a posteriori pour qu'un redémarrage garde ce qui a été appris.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            '**Negative result, kept on purpose**: "forgetting" old evidence, the textbook answer to non-stationarity, did not help. With 100 items and 1–5 observations per user, every discount tried forgot faster than it learned; plain Thompson sampling re-adapted on its own. All results come from simulation.',
          ],
          fr: [
            "**Résultat négatif, gardé exprès** : « oublier » les anciennes observations, la réponse classique à la non-stationnarité, n'a pas aidé. Avec 100 articles et 1 à 5 observations par utilisateur, chaque facteur d'oubli testé oubliait plus vite qu'il n'apprenait ; le Thompson sampling simple s'est réadapté seul. Tous les résultats viennent de la simulation.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'ranking-bandits/regret_stationary',
        width: 1056,
        height: 688,
        alt: {
          en: 'Cumulative regret over 20,000 users for six policies; Thompson sampling lowest, random highest.',
          fr: 'Regret cumulé sur 20 000 utilisateurs pour six politiques ; Thompson sampling le plus bas, aléatoire le plus haut.',
        },
        caption: { en: 'Regret, stationary catalogue.', fr: 'Regret, catalogue stationnaire.' },
      },
      {
        src: 'ranking-bandits/regret_popularity_shift',
        width: 1056,
        height: 688,
        alt: {
          en: 'Cumulative regret when item popularity shifts mid-run; ε-greedy degrades most.',
          fr: "Regret cumulé quand la popularité des articles change en cours de route ; ε-greedy se dégrade le plus.",
        },
        caption: { en: 'Regret with a popularity shift.', fr: 'Regret avec changement de popularité.' },
      },
    ],
  },
  {
    slug: 'visual-search',
    repo: 'visual-search',
    featured: false,
    title: { en: 'Visual similarity search', fr: 'Recherche visuelle par similarité' },
    line: {
      en: 'Four image representations on one search engine: pixels, autoencoder, self-supervised SimCLR, ImageNet transfer.',
      fr: 'Quatre représentations d’image sur un même moteur de recherche : pixels, autoencodeur, SimCLR auto-supervisé, transfert ImageNet.',
    },
    headline: { value: 0.676, from: 0.349, digits: 2, label: { en: 'P@10 without labels (autoencoder → SimCLR)', fr: 'P@10 sans labels (autoencodeur → SimCLR)' } },
    headlineNote: { en: 'ImageNet transfer: 0.766', fr: 'transfert ImageNet : 0,766' },
    metrics: [
      { value: 0.338, digits: 3, label: { en: 'P@10, pixels + PCA', fr: 'P@10, pixels + PCA' } },
      { value: 0.349, digits: 3, label: { en: 'P@10, autoencoder', fr: 'P@10, autoencodeur' } },
      { value: 0.676, digits: 3, label: { en: 'P@10, SimCLR (no labels)', fr: 'P@10, SimCLR (sans labels)' } },
      { value: 0.766, digits: 3, label: { en: 'P@10, ImageNet transfer', fr: 'P@10, transfert ImageNet' } },
    ],
    stack: ['PyTorch', 'SimCLR', 'ResNet-18', 'FAISS', 'FastAPI'],
    sections: [
      {
        kind: 'problem',
        body: {
          en: [
            '"Show me images like this one" depends almost entirely on the image representation. Gallery: CIFAR-10 train (50,000 images); queries: CIFAR-10 test (10,000). Labels are used only to score, never to train the encoders.',
          ],
          fr: [
            "« Montre-moi des images comme celle-ci » dépend presque entièrement de la représentation de l'image. Galerie : CIFAR-10 train (50 000 images) ; requêtes : CIFAR-10 test (10 000). Les labels ne servent qu'à noter, jamais à entraîner les encodeurs.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            '**Reconstruction is not similarity**: the autoencoder barely beats raw pixels (P@10 0.349 vs 0.338). **Self-supervision closes most of the gap**: SimCLR learns from unlabelled images in 26 minutes on a laptop GPU and doubles precision (0.676). **Transfer still wins here** (0.766), because CIFAR objects look like ImageNet; that would not hold for medical or industrial images.',
            'Exact FAISS search takes 0.1–0.3 ms per query over 50k vectors, ~13 ms end to end through the API on CPU.',
          ],
          fr: [
            "**Reconstruire n'est pas comparer** : l'autoencodeur bat à peine les pixels bruts (P@10 de 0,349 contre 0,338). **L'auto-supervision comble l'essentiel de l'écart** : SimCLR apprend sur des images sans labels en 26 minutes sur le GPU d'un portable et double la précision (0,676). **Le transfert gagne encore ici** (0,766), car les objets de CIFAR ressemblent à ImageNet ; ce ne serait pas le cas pour des images médicales ou industrielles.",
            "La recherche FAISS exacte prend 0,1 à 0,3 ms par requête sur 50 000 vecteurs, ~13 ms de bout en bout via l'API sur CPU.",
          ],
        },
      },
      {
        kind: 'decisions',
        body: {
          en: [
            "**Per-image augmentation on the GPU.** torchvision's batch transforms draw one random crop per batch, which starves the contrastive task; the project vectorises crop, flip, colour jitter and grayscale with independent parameters per image, checked by a test.",
          ],
          fr: [
            "**Augmentation par image sur le GPU.** Les transformations par lot de torchvision tirent un seul recadrage par lot, ce qui affame la tâche contrastive ; le projet vectorise recadrage, retournement, variation de couleur et niveaux de gris avec des paramètres indépendants par image, vérifiés par un test.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'CIFAR images are 32×32, so this shows the method rather than a product; class membership is only a proxy for "similar", and a real product would also measure clicks.',
          ],
          fr: [
            "Les images CIFAR font 32×32 : le projet montre la méthode plutôt qu'un produit ; l'appartenance à une classe n'est qu'un indicateur de similarité, et un vrai produit mesurerait aussi les clics.",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'visual-search/comparison',
        width: 1120,
        height: 640,
        alt: {
          en: 'Precision at 10 and other retrieval metrics for the four representations; SimCLR doubles the autoencoder, ImageNet transfer is highest.',
          fr: "Précision à 10 et autres métriques pour les quatre représentations ; SimCLR double l'autoencodeur, le transfert ImageNet est le plus haut.",
        },
        caption: { en: 'Four representations compared.', fr: 'Quatre représentations comparées.' },
      },
    ],
  },
  {
    slug: 'two-stage-detectors',
    repo: 'two-stage-detectors',
    featured: false,
    title: { en: 'R-CNN → Fast → Faster R-CNN', fr: 'R-CNN → Fast → Faster R-CNN' },
    line: {
      en: "The three papers that defined two-stage detection, re-implemented on one base and compared under the papers' protocol.",
      fr: 'Les trois articles qui ont défini la détection en deux étapes, réimplémentés sur une base commune et comparés selon le protocole des articles.',
    },
    headline: { value: 71.7, digits: 1, suffix: ' %', label: { en: 'Faster R-CNN mAP on VOC 2007 test', fr: 'mAP de Faster R-CNN sur VOC 2007 test' } },
    headlineNote: { en: 'paper (VGG-16): 69.9 %', fr: 'article (VGG-16) : 69,9 %' },
    metrics: [
      { value: 62.5, digits: 1, suffix: ' %', label: { en: 'R-CNN mAP (1.01 s / image)', fr: 'mAP R-CNN (1,01 s / image)' } },
      { value: 67.2, digits: 1, suffix: ' %', label: { en: 'Fast R-CNN mAP', fr: 'mAP Fast R-CNN' } },
      { value: 71.7, digits: 1, suffix: ' %', label: { en: 'Faster R-CNN mAP (0.08 s / image)', fr: 'mAP Faster R-CNN (0,08 s / image)' } },
    ],
    stack: ['PyTorch', 'ResNet-50', 'RoIAlign', 'PASCAL VOC 2007'],
    sections: [
      {
        kind: 'approach',
        body: {
          en: [
            'R-CNN, Fast R-CNN and Faster R-CNN on the same ImageNet-pretrained ResNet-50, so the comparison isolates the detection design. Train on VOC 2007 trainval minus a 300-image holdout used for every choice; test once on the 4,952 VOC 2007 test images with the 11-point VOC metric; evaluation checked with an oracle (ground-truth boxes give mAP 1.0).',
          ],
          fr: [
            "R-CNN, Fast R-CNN et Faster R-CNN sur le même ResNet-50 pré-entraîné sur ImageNet, pour que la comparaison isole la conception du détecteur. Entraînement sur VOC 2007 trainval moins 300 images mises de côté pour tous les choix ; test unique sur les 4 952 images de VOC 2007 test avec la métrique VOC à 11 points ; évaluation vérifiée par un oracle (les boîtes de vérité donnent un mAP de 1,0).",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'Each generation is both more accurate and faster: R-CNN 62.5 % at 1.01 s per image plus Selective Search, Fast R-CNN 67.2 %, Faster R-CNN **71.7 %** at **0.08 s** per image, against 69.9 % in the paper.',
          ],
          fr: [
            "Chaque génération est à la fois plus précise et plus rapide : R-CNN 62,5 % à 1,01 s par image plus Selective Search, Fast R-CNN 67,2 %, Faster R-CNN **71,7 %** à **0,08 s** par image, contre 69,9 % dans l'article.",
          ],
        },
      },
      {
        kind: 'limitations',
        body: {
          en: [
            'The papers used VGG-16; ResNet-50 explains part of the margin. R-CNN uses a jointly trained softmax head instead of the paper\'s SVMs, and RoIAlign replaces RoIPool (both departures are documented).',
          ],
          fr: [
            "Les articles utilisaient VGG-16 ; ResNet-50 explique une partie de l'écart. R-CNN utilise une tête softmax entraînée conjointement au lieu des SVM de l'article, et RoIAlign remplace RoIPool (ces deux écarts sont documentés).",
          ],
        },
      },
    ],
    figures: [
      {
        src: 'two-stage-detectors/speed_accuracy',
        width: 960,
        height: 576,
        alt: {
          en: 'Speed vs accuracy: each generation from R-CNN to Faster R-CNN is both faster and more accurate.',
          fr: 'Vitesse vs précision : chaque génération, de R-CNN à Faster R-CNN, est à la fois plus rapide et plus précise.',
        },
        caption: { en: 'Speed vs accuracy on VOC 2007 test.', fr: 'Vitesse vs précision sur VOC 2007 test.' },
      },
    ],
  },
  {
    slug: 'ml-from-scratch',
    repo: 'ml-from-scratch',
    featured: false,
    title: { en: 'ML from scratch', fr: 'ML from scratch' },
    line: {
      en: 'Classical ML, a VAE, a ResNet and a small English→French Transformer, written from the maths and checked against scikit-learn.',
      fr: 'Du ML classique, un VAE, un ResNet et un petit Transformer anglais→français, écrits à partir des maths et vérifiés contre scikit-learn.',
    },
    headline: { value: 13, digits: 0, label: { en: 'tests against scikit-learn references', fr: 'tests contre les références scikit-learn' } },
    headlineNote: { en: 'run in CI', fr: 'exécutés en CI' },
    metrics: [],
    stack: ['NumPy', 'PyTorch', 'scikit-learn (as reference)'],
    sections: [
      {
        kind: 'approach',
        body: {
          en: [
            'Linear and logistic regression, k-NN, naive Bayes, CART, k-means and PCA in NumPy; autoencoder, VAE, LeNet and ResNet-18 in PyTorch; a small EN→FR Transformer decoded autoregressively. Every update rule is written out.',
          ],
          fr: [
            "Régressions linéaire et logistique, k-NN, Bayes naïf, CART, k-means et PCA en NumPy ; autoencodeur, VAE, LeNet et ResNet-18 en PyTorch ; un petit Transformer anglais→français décodé de façon autorégressive. Chaque règle de mise à jour est écrite explicitement.",
          ],
        },
      },
      {
        kind: 'results',
        body: {
          en: [
            'Writing an algorithm from the maths only counts if it gives the right answer: 13 tests compare each classical model with scikit-learn under explicit tolerances (closed-form coefficients to rtol 1e-6, identical PCA variance, ≥ 97 % identical k-NN predictions), and each deep model must overfit a tiny batch.',
          ],
          fr: [
            "Écrire un algorithme à partir des maths ne compte que s'il donne la bonne réponse : 13 tests comparent chaque modèle classique à scikit-learn avec des tolérances explicites (coefficients exacts à rtol 1e-6, variance PCA identique, ≥ 97 % de prédictions k-NN identiques), et chaque modèle profond doit sur-apprendre un petit lot.",
          ],
        },
      },
    ],
    figures: [],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
