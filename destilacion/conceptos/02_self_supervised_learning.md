# Self-Supervised Learning

> Papers clave: [BERT](../../fundamentos/2018_bert.pdf) · [CLIP](../../multimodal/2021_clip.pdf) · [I-JEPA](../../jepa/core/2023_ijepa.pdf) · [V-JEPA](../../jepa/core/2024_vjepa.pdf) · [DDPM](../../difusion/fundamentos/2020_ddpm.pdf) · [NCSN](../../difusion/fundamentos/2019_ncsn_score_matching.pdf) · [REALM](../../rag/2020_realm.pdf)

---

## ¿Qué es?

**Self-supervised learning (SSL)** es el paradigma de aprendizaje que genera supervisión a partir de los propios datos, sin necesidad de etiquetas humanas. La idea central es ocultar o corromper parte de la información de entrada y entrenar el modelo para predecirla o reconstruirla, forzándolo a aprender representaciones semánticamente ricas.

SSL ha reemplazado al aprendizaje supervisado como paradigma dominante en modelos de fundación. La razón es simple: los datos etiquetados son escasos y costosos, mientras que los datos sin etiquetar son prácticamente ilimitados. Modelos preentrenados con SSL (BERT, GPT, CLIP, I-JEPA) pueden luego adaptarse con mínima supervisión a docenas de tareas downstream.

Existen tres familias conceptuales en SSL: **generativa** (reconstruir la entrada, como BERT con MLM o DDPM con denoising), **contrastiva** (atraer pares similares y repeler disimilares, como CLIP con InfoNCE), y **predictiva en espacio latente** (predecir representaciones de partes ocultas, como JEPA). Esta última familia evita la necesidad de reconstruir píxeles y aprende representaciones más abstractas y semánticas.

---

## Mecanismo central

**Masked Language Modeling (BERT):**

$$\mathcal{L}_{\text{MLM}} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid x_{\setminus \mathcal{M}})$$

Se enmascara el 15% de los tokens y se entrena para predecirlos dado el contexto bidireccional completo.

**Contrastive Loss (InfoNCE / CLIP):**

$$\mathcal{L}_{\text{InfoNCE}} = -\mathbb{E}\left[\log \frac{\exp(\text{sim}(z_i, z_j)/\tau)}{\sum_{k=1}^{N} \exp(\text{sim}(z_i, z_k)/\tau)}\right]$$

donde $\text{sim}(u,v) = u^\top v / (\|u\|\|v\|)$ es la similitud coseno y $\tau$ es la temperatura. CLIP optimiza simultáneamente imagen→texto y texto→imagen en un batch de $N$ pares.

**Denoising SSL (DDPM como SSL):**

$$\mathcal{L}_{\text{denoising}} = \mathbb{E}_{t, x_0, \epsilon}\left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right]$$

Predecir el ruido añadido es equivalente a predecir la señal original a partir de una versión corrompida — una forma de SSL generativo.

**JEPA (predictive SSL en espacio latente):**

$$\mathcal{L}_{\text{JEPA}} = \mathbb{E}\left[\|s_\theta(\bar{z}_x, p) - \text{sg}(z_y)\|^2\right]$$

donde $\bar{z}_x$ es el encoding del contexto visible, $p$ es la posición de la región objetivo, $z_y$ es el encoding del objetivo (de un encoder EMA sin gradiente), y $s_\theta$ es el predictor. El `stop_gradient` en el target previene el colapso.

---

## Evolución cronológica

| Año | Paper / Método | Contribución clave |
|-----|---------------|--------------------|
| 2018 | BERT | MLM bidireccional; primeros embeddings contextuales universales |
| 2018 | GPT | Autoregressive SSL (LM); generación como pretraining |
| 2020 | SimCLR | Contrastive con augmentaciones; batch negatives |
| 2020 | MoCo | Momentum encoder; dictionary de negativos eficiente |
| 2021 | DINO | Self-distillation sin negativos; ViT aprende segmentación emergente |
| 2021 | CLIP | Contrastive texto-imagen a escala (400M pares); cero-shot transfer |
| 2021 | MAE | Masked Autoencoder para imágenes; 75% masking; encoder ViT |
| 2022 | I-JEPA | Predicción en espacio latente; más eficiente que MAE |
| 2023 | V-JEPA | I-JEPA extendido a video; masking espacio-temporal |
| 2025 | V-JEPA 2 | Predicción + planning; action-conditioned world model |

---

## Variantes y comparativa

| Paradigma | Objetivo | Ejemplos | Pros | Contras |
|-----------|----------|----------|------|---------|
| **Generativo** | Reconstruir entrada | BERT, MAE, DDPM | Supervisión densa | Costo computacional alto |
| **Contrastivo** | Atraer/repeler pares | CLIP, SimCLR, MoCo | Representaciones alineadas | Necesita muchos negativos |
| **Predictivo latente** | Predecir representaciones | I-JEPA, V-JEPA | Sin colapso, sin píxeles | Requiere diseño cuidadoso |
| **Self-distillation** | Enseñarse a sí mismo | DINO, BYOL, JEPA | Sin negativos | EMA como regulación |
| **Autoregresivo** | Predecir siguiente token | GPT | Simple, escala bien | Solo causal |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](01_atencion_transformers.md) (Transformer es el backbone en todos los SSL modernos)
→ Ver también: [03 — Representaciones](03_representaciones.md) (SSL produce las representaciones)
→ Ver también: [04 — Objetivos de entrenamiento](04_objetivos_entrenamiento.md) (InfoNCE, ELBO, denoising)
→ Ver también: [14 — JEPA y world models](../arquitecturas/14_jepa_world_models.md)
→ Ver también: [17 — Visión-Lenguaje](../dominios/17_vision_lenguaje.md) (CLIP como SSL multimodal)

---

## Puntos clave para recordar

- SSL genera supervisión desde los datos mismos: masking, denoising, contrastive pairing
- BERT enmascara el 15% de tokens para preentrenamiento bidireccional; GPT predice el siguiente token (causal)
- CLIP alinea imagen y texto en un espacio compartido mediante InfoNCE con temperatura $\tau$
- DDPM puede verse como SSL denoising: predecir el ruido $\epsilon$ es reconstruir la señal
- JEPA predice en espacio latente (no en píxeles), evitando el colapso y aprendiendo semántica de alto nivel
- El stop_gradient en el target encoder (EMA) es crítico para prevenir el colapso trivial en JEPA y BYOL
- El denoising score matching conecta difusión con SSL: $\nabla_{x_t} \log p(x_t) \approx -\epsilon / \sigma_t$
