# Objetivos de Entrenamiento

> Papers clave: [DDPM](../../difusion/fundamentos/2020_ddpm.pdf) · [Score-SDE](../../difusion/fundamentos/2021_score_sde.pdf) · [CLIP](../../multimodal/2021_clip.pdf) · [NCSN](../../difusion/fundamentos/2019_ncsn_score_matching.pdf) · [DPO](../../entrenamiento/2023_dpo.pdf) · [DreamFusion](../../difusion/multimodal/2022_dreamfusion.pdf)

---

## ¿Qué es?

La **función objetivo** (loss function) es la señal de entrenamiento que orienta al modelo hacia representaciones o comportamientos deseados. La elección del objetivo es quizás la decisión más importante en el diseño de un modelo de IA: diferentes objetivos producen modelos con propiedades muy distintas, aunque la arquitectura sea la misma.

Los objetivos de los papers de estas tres colecciones forman un espectro: desde los clásicos cross-entropy (clasificación) y MSE (regresión) hasta objetivos sofisticados como el ELBO de los modelos generativos latentes, el score matching de los modelos de difusión, el InfoNCE contrastivo de CLIP, y el novedoso SDS de DreamFusion para síntesis 3D. Entender estos objetivos es entender por qué cada familia de modelos se comporta como lo hace.

Un hilo conductor importante: muchos objetivos modernos pueden derivarse como aproximaciones o relajaciones del mismo principio bayesiano de maximizar la log-verosimilitud de los datos $\log p(x)$, que es intratable y debe aproximarse.

---

## Mecanismo central

**Cross-Entropy (clasificación y generación de texto):**

$$\mathcal{L}_{\text{CE}} = -\sum_{i} y_i \log \hat{y}_i = -\log P_\theta(x_t \mid x_{<t})$$

**MSE / L2 (regresión, predicción de ruido):**

$$\mathcal{L}_{\text{MSE}} = \mathbb{E}\left[\|y - f_\theta(x)\|^2\right]$$

DDPM minimiza $\|\epsilon - \epsilon_\theta(x_t, t)\|^2$, una forma de MSE donde el target es el ruido $\epsilon$.

**ELBO — Evidence Lower Bound (VAE, LDM):**

$$\mathcal{L}_{\text{ELBO}} = \mathbb{E}_{q(z|x)}\left[\log p(x|z)\right] - D_{\text{KL}}(q(z|x) \| p(z))$$

El primer término es reconstrucción; el segundo regulariza el espacio latente hacia una gaussiana.

**Score matching (NCSN, Score-SDE):**

$$\mathcal{L}_{\text{SM}} = \mathbb{E}_{x \sim p_\sigma}\left[\|\nabla_{x} \log p_\sigma(x) - s_\theta(x)\|^2\right]$$

El score $\nabla_x \log p(x)$ indica la dirección de mayor densidad. Aprenderlo permite generar muestras con Langevin dynamics.

**Denoising Score Matching (DDPM connection):**

$$\mathcal{L}_{\text{DSM}} = \mathbb{E}_{x_0, \epsilon, t}\left[\|\epsilon_\theta(x_t, t) - \epsilon\|^2\right]$$

Equivalente al score matching: $s_\theta(x_t) \approx -\epsilon / \sigma_t$.

**InfoNCE (CLIP):**

$$\mathcal{L}_{\text{InfoNCE}} = -\frac{1}{N}\sum_{i=1}^{N} \log \frac{e^{s(z_i^I, z_i^T)/\tau}}{\sum_{j=1}^{N} e^{s(z_i^I, z_j^T)/\tau}}$$

**Score Distillation Sampling — SDS (DreamFusion):**

$$\nabla_\theta \mathcal{L}_{\text{SDS}} = \mathbb{E}_{t, \epsilon}\left[w(t)\left(\epsilon_\phi(z_t, y, t) - \epsilon\right)\frac{\partial z}{\partial \theta}\right]$$

El gradiente de la red de difusión (congelada) guía la optimización de una representación NeRF 3D.

**DPO — Direct Preference Optimization:**

$$\mathcal{L}_{\text{DPO}} = -\mathbb{E}_{(x, y_w, y_l)}\left[\log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

Aprende preferencias directamente sin un reward model explícito.

---

## Evolución cronológica

| Año | Objetivo | Paper | Novedad |
|-----|----------|-------|---------|
| 2013 | Word2Vec skip-gram | Mikolov et al. | Negative sampling como proxy para log-likelihood |
| 2014 | ELBO | VAE (Kingma & Welling) | Variational bound tratable para modelos latentes |
| 2018 | MLM + NSP | BERT | SSL con masked cross-entropy |
| 2019 | Denoising score matching | NCSN | Estimar gradiente del log-density |
| 2020 | $\|\epsilon - \epsilon_\theta\|^2$ | DDPM | Simplificación del ELBO difuso; funciona mejor en práctica |
| 2021 | InfoNCE contrastivo | CLIP | Contrastive a escala masiva para alineamiento imagen-texto |
| 2021 | Weighted ELBO continuo | Score-SDE | Difusión como SDE; score matching continuo |
| 2022 | SDS | DreamFusion | Usar difusión como prior para optimización 3D |
| 2023 | DPO | Rafailov et al. | Eliminar el reward model de RLHF |
| 2023 | Consistency loss | Consistency Models | $f_\theta(x_t, t) = f_\theta(x_{t'}, t')$ para cualquier $t, t'$ en la misma trayectoria |

---

## Variantes y comparativa

| Objetivo | Familia | Propiedad principal |
|----------|---------|---------------------|
| Cross-entropy | Discriminativo / generativo texto | Simple, escala bien |
| ELBO | Modelos latentes (VAE) | Incluye regularización KL |
| Denoising / Score matching | Difusión | Equivale a estimar el score |
| InfoNCE | Contrastivo | Maximiza MI entre pares positivos |
| SDS | Text-to-3D | Distilación desde difusión 2D |
| DPO | Alineación LLM | Sin RM, más estable que RLHF |
| Consistency loss | Distilación difusión | Single-step generation |

---

## Conexiones con otros conceptos

→ Ver también: [02 — SSL](02_self_supervised_learning.md) (MLM, InfoNCE son objetivos SSL)
→ Ver también: [09 — Destilación](../tecnicas/09_destilacion_conocimiento.md) (SDS, progressive distillation)
→ Ver también: [11 — RLHF](../tecnicas/11_rlhf_y_alineacion.md) (DPO como alternativa a RLHF)
→ Ver también: [13 — Modelos difusión](../arquitecturas/13_modelos_difusion.md) (DDPM, Score-SDE, ELBO)
→ Ver también: [19 — Generación visual](../dominios/19_generacion_visual.md) (SDS en DreamFusion)

---

## Puntos clave para recordar

- El ELBO es la cota inferior del log-likelihood; términos = reconstrucción + regularización KL
- DDPM simplifica el ELBO prediciendo directamente el ruido $\epsilon$; el resultado matemático es el mismo pero funciona mejor
- Score matching aprende $\nabla_x \log p(x)$ — el gradiente de la log-densidad — para muestreo con Langevin
- InfoNCE maximiza la información mutua entre pares positivos; la temperatura $\tau$ controla la "dureza" de los negativos
- SDS usa el gradiente de una difusión 2D congelada para guiar la optimización de una representación 3D
- DPO reemplaza el reward model explícito de RLHF derivando el óptimo analíticamente
- El denoising score matching conecta DDPM y NCSN: predecir $\epsilon$ es equivalente a estimar el score
