# Proteínas: Predicción de Estructura con IA

Colección de papers sobre predicción de estructura de proteínas con deep learning, centrada en AlphaFold2 y su ecosistema derivado.

---

## Nivel 1 — Fundamentos (`fundamentos/`)

Papers seminales que establecen las arquitecturas y enfoques base.

| Paper | Año | Clave |
|-------|-----|-------|
| AlphaFold2 — Jumper et al. | 2021 | Evoformer + Structure Module, CASP14 winner |
| RoseTTAFold — Baek et al. | 2021 | Three-track network, competidor directo de AF2 |

**Descargar:**
- AlphaFold2: https://www.nature.com/articles/s41586-021-03819-2
- RoseTTAFold: https://www.science.org/doi/10.1126/science.abj8754

---

## Nivel 2 — Implementaciones y Eficiencia (`implementaciones/`)

Reimplementaciones, aceleraciones y adaptaciones de AlphaFold2.

| Paper | Año | Clave |
|-------|-----|-------|
| ColabFold — Mirdita et al. | 2022 | MMseqs2 + AF2, 40-60x más rápido, accesible |
| OpenFold — Ahdritz et al. | 2022 | Reimplementación PyTorch entrenable desde cero |
| HelixFold — Wang et al. | 2022 | Implementación PaddlePaddle, arxiv:2207.05477 |
| UniFold | 2022 | PyTorch, soporta monómero y multímero |
| FastFold | 2022 | Dynamic Axial Parallelism, optimización Evoformer |

**Descargar:**
- ColabFold: https://www.nature.com/articles/s41592-022-01488-1
- OpenFold: https://arxiv.org/abs/2211.12453
- HelixFold: https://arxiv.org/abs/2207.05477

---

## Nivel 3 — Language Models para Proteínas (`language_models/`)

Modelos que reemplazan el MSA con protein language models (PLMs).

| Paper | Año | Clave |
|-------|-----|-------|
| ESMFold — Lin et al. | 2023 | ESM-2 LM, predicción en segundos sin MSA |
| OmegaFold — Wu et al. | 2022 | Primer método LM-only de alta resolución |

**Descargar:**
- ESMFold: https://www.science.org/doi/10.1126/science.ade2574
- OmegaFold: https://www.biorxiv.org/content/10.1101/2022.07.21.500999

---

## Nivel 4 — Variantes y Extensiones (`variantes/`)

Modelos que extienden AF2 a nuevos dominios o capacidades.

| Paper | Año | Clave |
|-------|-----|-------|
| AlphaFold3 — Abramson et al. | 2024 | Proteínas + ADN/ARN + moléculas pequeñas, diffusion |
| RoseTTAFold All-Atom (RFAA) | 2023 | Asambleas biológicas completas |
| AlphaFold2-RAVE | 2024 | Drug discovery, conformaciones selectivas |
| HelixFold-Multimer | 2024 | Complejos proteína-proteína, arxiv:2404.10260 |

**Descargar:**
- AlphaFold3: https://www.nature.com/articles/s41586-024-07487-w
- RFAA: https://www.biorxiv.org/content/10.1101/2023.10.09.561603
- AlphaFold2-RAVE: https://arxiv.org/abs/2404.07102

---

## Conexiones con otros temas del repositorio

| Concepto | Dónde aparece en este repo |
|----------|---------------------------|
| Atención / Transformer | `fundamentos/`, `destilacion/01_atencion_mecanismos.md` |
| Self-supervised pretraining | ESMFold usa BERT-style; ver `destilacion/02_ssl_contrastivo.md` |
| Diffusion models | AlphaFold3 usa diffusion; ver `difusion/fundamentos/` |
| Scaling laws | `destilacion/06_scaling_laws.md` |
