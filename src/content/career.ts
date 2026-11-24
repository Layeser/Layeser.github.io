import type { Education, Experience, SkillGroup } from './types'

// Source: claude-code/cv/sections/experience.tex (CV order). Wording follows the CV; no title is upgraded.
export const experience: Experience[] = [
  {
    id: 'propulsai',
    org: {
      en: 'PropulsAI — for Crédit Rural de Guinée (microfinance)',
      fr: 'PropulsAI — pour le Crédit Rural de Guinée (microfinance)',
    },
    place: { en: 'Remote', fr: 'À distance' },
    roles: [
      {
        title: {
          en: 'Data & AI Engineer — freelance, part-time alongside my studies',
          fr: 'Data & AI Engineer — freelance, à temps partiel en parallèle des études',
        },
        start: '2026-01',
        end: '2026-09',
        bullets: {
          en: [
            'Fraud detection on 2 M transactions, supervised and unsupervised (**PR-AUC 0.87**): it recovers the business-rule alerts and finds the fraud the rules do not cover.',
            'Alert threshold set by a financial cost (missed fraud vs blocked legitimate transactions), evaluated on history.',
            'An AI-agent system (LangGraph, MCP) that helps auditors triage and investigate alerts.',
            'Data ingestion: history 2010–2026, then real time through SQL Server CDC, Debezium and Kafka.',
            'Model lifecycle: tracking and versioning (MLflow, DVC), drift detection (Evidently), Docker.',
          ],
          fr: [
            "Détection de fraude sur 2 M de transactions, supervisée et non supervisée (**PR-AUC de 0,87**) : elle retrouve les alertes des règles métier et détecte les fraudes qu'elles ne couvrent pas.",
            "Seuil d'alerte fixé par un coût financier (fraudes manquées vs transactions légitimes bloquées), évalué sur l'historique.",
            "Un système d'agents IA (LangGraph, MCP) qui assiste les auditeurs dans le tri et l'investigation des alertes.",
            'Ingestion des données : historique 2010–2026, puis temps réel via CDC SQL Server, Debezium et Kafka.',
            'Cycle de vie des modèles : suivi et versionnage (MLflow, DVC), détection de drift (Evidently), Docker.',
          ],
        },
      },
    ],
    stack: [
      'Python', 'SQL', 'scikit-learn', 'PyTorch', 'Optuna', 'LangChain', 'LangGraph', 'MCP', 'Kafka', 'Redis',
      'Airflow', 'PostgreSQL', 'AWS S3', 'MLflow', 'DVC', 'Evidently', 'Prometheus', 'Grafana', 'Docker', 'GitHub Actions',
    ],
    client: {
      note: { en: 'Confidential, no public code.', fr: 'Confidentielle, pas de code public.' },
      reconstructionSlug: 'fraudguard',
    },
  },
  {
    id: 'ircica',
    org: {
      en: 'IRCICA · CRIStAL (UMR 9189, CNRS, University of Lille)',
      fr: 'IRCICA · CRIStAL (UMR 9189, CNRS, Université de Lille)',
    },
    place: { en: 'Lille', fr: 'Lille' },
    roles: [
      {
        title: {
          en: 'AI Researcher — end-of-studies internship, spiking neural networks',
          fr: "AI Researcher — stage de fin d'études, réseaux de neurones à impulsions",
        },
        start: '2026-06',
        end: '2026-09',
        bullets: {
          en: [
            'Designed a new spiking-transformer architecture: softmax-free attention, contrastive learning, LoRA fine-tuning.',
            'Reduced attention complexity from quadratic to linear in sequence length (two variants).',
            '**81.75 % on CIFAR-10-DVS** (+0.65 pt over the best spiking network compared); also evaluated on CIFAR-10/100 and N-Caltech101.',
            'First author of a **paper submitted to CVPR 2027**, under review.',
          ],
          fr: [
            "Conception d'une nouvelle architecture de spiking transformer : attention sans softmax, apprentissage contrastif, fine-tuning par LoRA.",
            "Complexité de l'attention réduite de quadratique à linéaire en la longueur de séquence (deux variantes).",
            '**81,75 % sur CIFAR-10-DVS** (+0,65 pt par rapport au meilleur réseau à impulsions comparé) ; évalué aussi sur CIFAR-10/100 et N-Caltech101.',
            "Premier auteur d'un **article soumis à CVPR 2027**, en cours d'évaluation.",
          ],
        },
        highlight: {
          en: 'Linear-complexity attention for spiking transformers. Details after the double-blind review.',
          fr: 'Une attention de complexité linéaire pour les spiking transformers. Détails après la relecture en double aveugle.',
        },
      },
      {
        title: {
          en: 'Computer Vision Engineer — M1 internship, room occupancy estimation',
          fr: "Computer Vision Engineer — stage de M1, estimation d'occupation",
        },
        start: '2025-05',
        end: '2025-08',
        bullets: {
          en: [
            'A room-occupancy estimation system designed to run without cameras in operation: vision provides the ground truth, sensors do the job.',
            'Annotated ~28,000 images (CVAT); coded YOLOv1/v3, R-CNN, Fast and Faster R-CNN from scratch; fine-tuned recent YOLO models.',
            'Compressed YOLOv7 into a tiny model without degrading detection: **COCO AP@[0.50:0.95] of 0.92** on the test set.',
            'Estimated occupancy from sensors (CO_{2}, temperature, pressure…) with the vision counts as ground truth.',
          ],
          fr: [
            "Un système d'estimation de l'occupation des salles conçu pour fonctionner sans caméra en exploitation : la vision fournit la vérité terrain, les capteurs font le travail.",
            '~28 000 images annotées (CVAT) ; YOLOv1/v3, R-CNN, Fast et Faster R-CNN codés from scratch ; YOLO récents fine-tunés.',
            'YOLOv7 allégé en modèle tiny sans dégrader la détection : **AP COCO@[0.50:0.95] de 0,92** sur le jeu de test.',
            'Occupation estimée à partir de capteurs (CO_{2}, température, pression…), avec les comptages vision comme vérité terrain.',
          ],
        },
      },
    ],
    stack: ['Python', 'PyTorch', 'Optuna', 'MLflow', 'Pandas', 'scikit-learn', 'OpenCV', 'CVAT', 'Git'],
  },
  {
    id: 'stellantis',
    org: { en: 'Stellantis', fr: 'Stellantis' },
    place: { en: 'Casablanca, Morocco', fr: 'Casablanca, Maroc' },
    roles: [
      {
        title: {
          en: 'AI Engineer — internship, gap year, then fixed-term contract',
          fr: 'AI Engineer — stage, césure puis CDD',
        },
        start: '2023-06',
        end: '2024-08',
        bullets: {
          en: [
            'Deployed a RAG assistant (embeddings, FAISS) for the finance and accounting team: **15+ users**.',
            'Designed a pipeline that extracts customer-invoice information automatically (OCR, NLP, LLM).',
            'Prepared multi-source data and built time-series sales-forecasting models.',
            'Automated multi-site reporting (Power BI, DAX), in production with the business teams.',
          ],
          fr: [
            "Déploiement d'un assistant RAG (embeddings, FAISS) pour l'équipe finance et comptabilité : **plus de 15 utilisateurs**.",
            "Conception d'un pipeline d'extraction automatique des informations des factures clients (OCR, NLP, LLM).",
            'Préparation de données multi-sources et modèles de séries temporelles pour la prévision des ventes.',
            'Automatisation du reporting multi-sites (Power BI, DAX), en production auprès des équipes métier.',
          ],
        },
      },
    ],
    stack: ['Python', 'SQL', 'PyTorch', 'LangChain', 'FAISS', 'FastAPI', 'Django', 'Git', 'Power BI', 'SAP'],
  },
  {
    id: 'idus',
    org: { en: 'Idus Capital — private-equity fund', fr: 'Idus Capital — fonds de capital-investissement' },
    place: { en: 'Casablanca, Morocco', fr: 'Casablanca, Maroc' },
    roles: [
      {
        title: { en: 'Data Scientist — internship', fr: 'Data Scientist — stage' },
        start: '2022-06',
        end: '2022-08',
        bullets: {
          en: [
            'Screened investment targets among ~500 companies (Python, SQL) on revenue growth, EBITDA, debt and reputation.',
            'Due-diligence analysis of sales, churn, margins and costs; a Power BI dashboard to monitor the portfolio.',
          ],
          fr: [
            "Présélection de cibles d'investissement parmi ~500 entreprises (Python, SQL) selon la croissance du CA, l'EBITDA, l'endettement et la réputation.",
            'Analyse des ventes, du churn, des marges et des coûts en due diligence ; tableau de bord Power BI de suivi du portefeuille.',
          ],
        },
      },
    ],
    stack: ['Python', 'pandas', 'SQL', 'Excel', 'Power BI'],
  },
]

// Source: claude-code/cv/sections/education.tex
export const education: Education[] = [
  {
    school: 'École Centrale de Lille',
    degree: { en: 'MSc Data Science & AI (taught in English)', fr: 'Master Data Science & IA (enseigné en anglais)' },
    place: { en: 'Lille, France', fr: 'Lille, France' },
    start: '2024',
    end: '2026-10',
    endMonth: true,
  },
  {
    school: 'École Centrale Casablanca',
    degree: {
      en: 'Engineering degree, AI specialisation (double degree)',
      fr: "Diplôme d'ingénieur, spécialité IA (double diplôme)",
    },
    place: { en: 'Casablanca, Morocco', fr: 'Casablanca, Maroc' },
    start: '2021',
    end: '2026-10',
    endMonth: true,
  },
  {
    school: 'INP-HB',
    degree: {
      en: 'Preparatory classes for the grandes écoles (MPSI / MP)',
      fr: 'Classes préparatoires aux grandes écoles (MPSI / MP)',
    },
    place: { en: "Yamoussoukro, Côte d'Ivoire", fr: "Yamoussoukro, Côte d'Ivoire" },
    start: '2019',
    end: '2021-07',
    endMonth: true,
  },
]

// Source: claude-code/cv/sections/skills.tex, regrouped into the brief's six categories. Levels carried over.
export const skills: SkillGroup[] = [
  {
    title: { en: 'ML & Deep Learning', fr: 'ML & deep learning' },
    items: [
      'scikit-learn', 'LightGBM', 'PyTorch', 'Hugging Face Transformers', { en: 'anomaly detection', fr: "détection d'anomalies" }, { en: 'time series', fr: 'séries temporelles' },
      'ranking', 'SHAP', { en: 'self-supervised learning', fr: 'apprentissage auto-supervisé' }, 'NLP', 'OCR',
    ],
    notions: ['differential privacy'],
  },
  {
    title: { en: 'Generative AI & LLM Engineering', fr: 'IA générative & LLM' },
    items: [
      'LLMs (OpenAI, Mistral, open source)', { en: 'hybrid RAG (BM25, reranker)', fr: 'RAG hybride (BM25, reranker)' }, 'embeddings', 'fine-tuning (LoRA, PEFT)',
      'prompt engineering', 'LangChain', 'LangGraph', { en: 'AI agents', fr: 'agents IA' }, 'tool calling', 'MCP', 'FAISS', 'Chroma', 'pgvector',
      'guardrails', 'RAGAS', 'LangSmith', 'LLM-as-a-judge',
    ],
  },
  {
    title: { en: 'Computer Vision', fr: 'Computer vision' },
    items: [{ en: 'object detection', fr: "détection d'objets" }, 'PyTorch', 'OpenCV', 'CVAT', { en: 'self-supervised learning', fr: 'apprentissage auto-supervisé' }],
  },
  {
    title: { en: 'Data Engineering', fr: 'Data engineering' },
    items: ['Databricks', 'Spark (PySpark, Spark SQL)', 'Kafka', 'CDC (Debezium)', 'Airflow', 'PostgreSQL', 'Redis', 'ETL / ELT', 'SQL', 'Pandas', 'Polars'],
  },
  {
    title: { en: 'MLOps & DevOps', fr: 'MLOps & DevOps' },
    items: [
      'MLflow', 'DVC', 'Docker', 'CI/CD (GitHub Actions)', 'pytest', 'Optuna', 'Evidently', 'Prometheus', 'Grafana',
      'AWS (S3, EC2, SageMaker)',
    ],
    notions: ['Azure', 'GCP'],
    inTraining: ['Kubernetes'],
  },
  {
    title: { en: 'Backend & Software Engineering', fr: 'Backend & génie logiciel' },
    items: [
      { en: 'Python (async, asyncio)', fr: 'Python (asynchrone, asyncio)' }, 'FastAPI', 'Pydantic', { en: 'REST APIs', fr: 'API REST' }, 'C++', 'Linux / Bash', 'Git', 'Gradio', 'Streamlit',
      'Power BI',
    ],
    notions: ['Tableau', 'Qlik'],
  },
]
