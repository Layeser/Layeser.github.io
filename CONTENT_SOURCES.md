# Content sources

Every factual claim on the site, mapped to its source. Two sources only:
**CV** = the validated CV (LaTeX sections, kept private; line numbers as of 2026-11-24) and
**README** = `github.com/Layeser/ai-portfolio/<project>/README.md` (line numbers as of 2026-11-24).
The English and French texts state the same facts; each row covers both.

## Identity and hero (`src/content/en.ts`, `fr.ts`, `site.ts`)
| Claim | Source |
|---|---|
| Sekou Kaba, AI Engineer / Machine Learning Engineer | CV header l.1 |
| Open to a permanent role, available now | CV header l.1 ("Recherche CDI — disponible immédiatement") |
| Lille / Paris | CV header l.4 (Lille) and l.10 (mobility Hauts-de-France and Île-de-France); only "Lille, France" is published as a location |
| Email, LinkedIn, GitHub | CV header l.6–9 |
| 1st / 13 teams, Kaggle text-to-motion retrieval | CV projects l.3; README text-to-motion-retrieval l.7–10 |
| CVPR 2027, first-author paper under review | CV experience l.20 |
| 2 M transactions, fraud detection for a microfinance institution | CV experience l.3, l.6 |
| Hero line (option a) | Derived from CV profile l.2 ("de la donnée au déploiement et au suivi en production"); validated by Sekou on 2026-11-24 |

## Experience (`src/content/career.ts`)
| Claim | Source |
|---|---|
| PropulsAI for Crédit Rural de Guinée, Data & AI Engineer, freelance part-time, Jan–Sep 2026, remote | CV experience l.3–4 |
| PR-AUC 0.87 on 2 M transactions; rule alerts recovered, uncovered fraud found | CV experience l.6 |
| Cost-based alert threshold | CV experience l.7 |
| LangGraph / MCP agents for auditors | CV experience l.8 |
| Ingestion 2010–2026, SQL Server CDC, Debezium, Kafka | CV experience l.9 |
| MLflow, DVC, Evidently, Docker; stack list | CV experience l.10, l.12 |
| "Confidential, no public code" | Client work: no repository exists (brief §4.2) |
| IRCICA · CRIStAL (UMR 9189, CNRS, Université de Lille), Lille | CV experience l.14 |
| AI Researcher, end-of-studies internship, Jun–Sep 2026, four bullets (architecture, linear attention, 81.75 % CIFAR-10-DVS +0.65 pt, CVPR 2027) | CV experience l.15–20 |
| Research highlight "linear-complexity attention" | CV experience l.18; no title, method name or figure published (double-blind review) |
| Computer Vision Engineer, M1 internship, May–Aug 2025, four bullets (no cameras in operation, ~28,000 images, YOLOv7 tiny AP 0.92, sensors) | CV experience l.22–27; stack l.29 |
| Stellantis, AI Engineer, internship / gap year / fixed-term contract, Jun 2023–Aug 2024, Casablanca | CV experience l.31–32 |
| RAG 15+ users; hybrid TF-IDF + vector retrieval; role-based access; evaluation (92 % on 200 real questions, 96 % on 1,000 synthetic, 100 % refusal on 200 out-of-corpus); invoice extraction 93 % exact on 500; sales forecasting; Power BI reporting; stack incl. FAISS, Docker | CV experience (Stellantis bullets) + details confirmed by Sekou on 2026-11-24 (evaluation protocol; vector store FAISS) |
| Idus Capital, private-equity fund, Data Scientist internship, Jun–Aug 2022; ~500 companies; due diligence; Power BI | CV experience l.41–45 |

## Education and skills (`src/content/career.ts`)
| Claim | Source |
|---|---|
| École Centrale de Lille, MSc Data Science & AI, taught in English, 2024 – Oct 2026 | CV education l.3 |
| École Centrale Casablanca, engineering degree, AI, double degree, 2021 – Oct 2026 | CV education l.4 |
| INP-HB, CPGE MPSI / MP, Yamoussoukro, 2019 – Jul 2021 | CV education l.5 |
| Every skill, and the "Notions" / "In training" levels | CV skills l.4–10 (Spark: used with PySpark and Spark SQL on Databricks, confirmed by Sekou on 2026-11-24) |
| Languages | CV skills l.13 |

## About (`en.ts`, `fr.ts`)
| Claim | Source |
|---|---|
| Preparatory classes in Côte d'Ivoire, Centrale Casablanca, Centrale Lille, AI specialisation | CV education l.3–5 |
| RAG for a finance team; fraud detection for a microfinance institution; attention mechanism under review at CVPR | CV experience l.34, l.3–6, l.17–20 |
| Validation leak found in the winning Kaggle model | README text-to-motion-retrieval l.15–19 |

## Projects (`src/content/projects.ts`)
| Project | Claims | Source |
|---|---|---|
| FraudGuard | 0.25 % fraud rate, synthetic data, public reconstruction of freelance work for a microfinance institution | README fraud-detection-platform l.7–11 |
| | Chronological split, days 30–90 / 90–105 / 105–120, 71k tx, 142 frauds; PR-AUC 0.905 / 0.644 / 0.426; ROC-AUC 0.994 | l.57–64, l.195 |
| | Block threshold P 0.92 / R 0.89; latency p50 28 ms, p95 32 ms | l.70, l.109 |
| | Drift: PSI 1.09, PR-AUC 0.905 → 0.721 | l.123, l.127 |
| | Agent: number-tracing guardrail (3.9× vs 2.8×), policy rules, 15 alerts, 13 decided, 0.85, 7/8, 2 stealth | l.148–154, l.174–179 |
| | Label leakage `FRAUD-xxxx`; online = offline test | l.189–199 |
| | Stealth fraud recall 20 %; limitations | l.78–81, l.251–260 |
| Atelier Nord assistant | Fictional 400-employee manufacturer, citations, refusal | README enterprise-rag-assistant l.3–6 |
| | Retrieval, guardrails, 66-question gold set | l.13–16 |
| | 0.983 (57/58), 1.000 / 0.929, citations 1.000, 0 %, 8/8, faithfulness 0.948 | l.48–53 |
| | Failures p06, p14 | l.58–61 |
| | BM25 0.91 → 0.36; embeddings 0.57 → 0.93; RRF 0.93 → 0.71; reranker +0.012 MRR, 10× latency; gate rejected 15 % | l.74–78, l.90–104 |
| | Prompt Guard 4/6, 6/6 optimistic; 10 documents, 52 chunks; judge spot-checked | l.82–86, l.153–156 |
| Text-to-motion | 6,018 motions; Kaggle challenge (Université de Lille, Centrale Lille, IMT Nord Europe); team of three Recall@1; 0.898 / 0.867 / 0.847; weighted Recall@1–10 | README text-to-motion-retrieval l.3–12 (team size confirmed by Sekou on 2026-11-24) |
| | Leak: R@1 0.933, 640/640 | l.17–19 |
| | Held-out 10 %, 601 motions, 1,803 descriptions; R@1 0.571 / 32, random 0.031; 0.119 / 601, median rank 10; plateau at epoch 20 | l.21–36 |
| | Model (dual encoder, 4-layer Transformer, 256-d, InfoNCE); 20 ms latency | l.54, l.58–68 |
| | Gallery R@1 0.12, next steps | l.98–99 |
| Sales forecasting | 28 days, 30,490 series, 3 states, 10 stores, 3,049 products; evaluation period never used for choices | README sales-forecasting l.3–6 |
| | WRMSSE 0.555 / 0.561 / 0.774 / 0.847 / winner 0.520 (5,558 teams); benchmarks reproduced (0.847, 1.752) | l.10–20 |
| | Features ≥ 28 days old; LightGBM Tweedie; TiDE (Das et al., TMLR 2023); blend weight on validation | l.26–42 |
| | RMSSE 0.2–0.4 vs 0.9–1.0; deep learning did not beat boosting; gap to winner | l.53–59 |
| LLM fine-tuning | CORD v2, 800 / 100 / 100; same prompt | README llm-finetuning l.3–7 |
| | F1 0.543 → 0.870; 0 % → 45 %; 99 %; 1.97 s → 0.45 s; 18.5 M = 1.2 % | l.10–19 |
| | LoRA r16, answer-only loss, epoch on validation, merged adapter, worker thread + lock | README "What was done" section |
| | Not comparable with Donut; sub-items recall 0.19; GPU crash, epoch-1 F1 0.833 not used for choices | l.48–55 |
| Product categorisation | 100 leaves, 184-node taxonomy; notebook → package | README hierarchical-product-nlp l.3–8 |
| | 0.869 / 0.839 / 0.932 / 82 % / 94.6 %; notebook 0.842; XLM-R 0.849 | l.12–17 |
| | Character n-grams; validation-based selection; 97.6 % / 96.5 %; 95 % routing | l.24–35 |
| | Leakage 131 products, 0.8693 vs 0.8691; GPU memory bug 33 vs 15 min | l.36–37, l.65–67 |
| | Private dataset, model on request | l.79–86 |
| Ranking bandits | Problem, cascade model, 100 items, top-5 | README ranking-bandits l.3–18 |
| | 20,000 users, 10 seeds; Thompson 718, 0.656, 99 %; random 0.216; KL-UCB 3.5×; ε-greedy +50 % | l.20–42 |
| | Negative result on discounting | l.44–47 |
| | API: replayed ids rejected, posterior checkpointed | l.60–62 |
| Visual search | CIFAR-10 gallery 50,000 / queries 10,000; labels only to score | README visual-search l.12–14 |
| | P@10 0.338 / 0.349 / 0.676 / 0.766; 26 min; latency 0.1–0.3 ms, ~13 ms | l.18–24, l.28–35 |
| | Per-image GPU augmentation | l.44–47 |
| | 32×32 limitation; class as proxy | l.87–89 |
| Two-stage detectors | 62.5 % / 67.2 % / 71.7 %; paper 69.9 %; 1.01 s, 0.08 s | README two-stage-detectors l.7–11 |
| | Same ResNet-50; VGG-16 explains part of the margin | l.19–20 |
| | 300-image holdout; 4,952 test images; oracle mAP 1.0; departures (softmax head, RoIAlign) | l.4–5, l.33–36, l.42, l.51–57 |
| ML from scratch | Algorithms implemented; 13 tests vs scikit-learn with tolerances; overfit checks | README ml-from-scratch l.10–57 |

## Figures (`public/figures/`)
Each figure is a file from `ai-portfolio/<project>/reports/figures/`, converted to WebP/PNG without editing.
Alt texts describe what the README says the figure shows.
