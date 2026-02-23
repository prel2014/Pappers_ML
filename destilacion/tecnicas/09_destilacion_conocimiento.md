# Destilación del Conocimiento

> Papers clave: [Knowledge Distillation Survey](../../optimizacion/2023_knowledge_distillation.pdf) · [Progressive Distillation](../../difusion/optimizacion/2022_progressive_distillation.pdf) · [LCM](../../difusion/optimizacion/2023_lcm_latent_consistency.pdf) · [Guided Distillation](../../difusion/optimizacion/2023_distillation_guided.pdf) · [Consistency Models](../../difusion/variantes/2023_consistency_models.pdf)

---

## ¿Qué es?

La **destilación del conocimiento** (Knowledge Distillation, KD) es la técnica de entrenar un modelo "estudiante" más pequeño para imitar el comportamiento de un modelo "maestro" más grande, transfiriendo su conocimiento a través de los outputs suaves (soft targets) en lugar de solo las etiquetas duras (hard labels).

La idea de Hinton et al. (2015) es que los soft targets del maestro contienen información rica: las probabilidades de clases incorrectas revelan relaciones semánticas entre conceptos. Un modelo que predice "gato" con alta probabilidad pero también asigna algo de probabilidad a "perro" y "tigre" transmite más información que simplemente la etiqueta "gato".

En el contexto de modelos de difusión, la destilación toma un significado distinto: los modelos de difusión necesitan típicamente 50-1000 pasos de denoising para generar una imagen, lo cual es lento. La destilación progresiva y la destilación de consistencia permiten reducir este número a 2-8 o incluso 1 paso, sin reentrenar el modelo desde cero.

---

## Mecanismo central

**KD clásica (Hinton et al., 2015):**

$$\mathcal{L}_{\text{KD}} = (1 - \alpha) \mathcal{L}_{\text{CE}}(y, \hat{y}) + \alpha T^2 \mathcal{L}_{\text{CE}}(p_\text{teacher}^T, p_\text{student}^T)$$

donde $p^T_i = \text{softmax}(z_i / T)$ son los logits suavizados con temperatura $T > 1$.

**Feature-level distillation:**

$$\mathcal{L}_{\text{feature}} = \sum_l \|f_l^{\text{teacher}}(x) - g_l(f_l^{\text{student}}(x))\|^2$$

$g_l$ es una proyección lineal si las dimensiones difieren. Supervisa representaciones intermedias, no solo outputs.

**Progressive Distillation (Salimans & Ho, 2022):**

Dado un modelo DDPM con $N$ pasos, el estudiante aprende a hacer en 1 paso lo que el maestro hace en 2 pasos:

$$\mathcal{L} = \mathbb{E}\left[\|x_\theta(x_{t_1}, t_1) - \tilde{x}^{\text{teacher}}_{t_1 \to t_0}\|^2\right]$$

donde $\tilde{x}^{\text{teacher}}$ es el resultado de 2 pasos de denoising del maestro. Se itera: N → N/2 → N/4 → ... → 4 → 2 → 1 paso. Cada destilación entrena hasta que el estudiante iguala al maestro.

**Latent Consistency Models (LCM):**

LCM combina la idea de consistencia con el espacio latente de LDM. Define la **consistency function** $f_\theta$ tal que para cualquier punto en la trayectoria de ODE:

$$f_\theta(x_t, t) \approx x_0 \quad \forall t$$

La loss de destilación de consistencia:

$$\mathcal{L}_{\text{LCD}} = \mathbb{E}\left[d\!\left(f_\theta(x_{t_{n+1}}, t_{n+1}), f_{\theta^-}(\hat{x}_{t_n}^{\phi}, t_n)\right)\right]$$

donde $\hat{x}_{t_n}^{\phi}$ es un paso de solver ODE (e.g., DDIM) usando el maestro $\phi$, y $\theta^-$ es el EMA del estudiante.

**Score Distillation Sampling (SDS):**

Ver [04 — Objetivos de entrenamiento](../conceptos/04_objetivos_entrenamiento.md) para la derivación completa. En esencia, usa un modelo de difusión preentrenado como función de "reward" para guiar la optimización de otra representación.

---

## Evolución cronológica

| Año | Método | Steps inference | Contexto |
|-----|--------|----------------|----------|
| 2015 | KD (Hinton) | — (clasificación) | Modelos discriminativos |
| 2022 | Progressive Distillation | 64 → 4 pasos | DDPM score matching |
| 2022 | SDS (DreamFusion) | — (guidance, no sampling) | 3D optimization |
| 2023 | Consistency Models (Song et al.) | 1-2 pasos | Autoentrenamiento |
| 2023 | LCM | 4 pasos (latente) | LDM/Stable Diffusion |
| 2023 | Improved Consistency Training | 1-2 pasos (mejorado) | Mejor calidad que CM |
| 2023 | Guided Distillation | 4 pasos con guidance | CFG-aware distillation |

---

## Variantes y comparativa

| Método | Pasos inference | Calidad | Requiere maestro |
|--------|----------------|---------|-----------------|
| DDPM original | 1000 | base | — |
| DDIM | 50 | ~DDPM | — (mismo modelo) |
| Progressive Distillation | 4-8 | buena | Sí (DDPM teacher) |
| Consistency Models | 1-2 | buena | Autoentrenamiento |
| LCM | 4 | muy buena (latente) | Sí (LDM teacher) |
| Guided Distillation | 4 | excelente (con CFG) | Sí + CFG teacher |

---

## Conexiones con otros conceptos

→ Ver también: [04 — Objetivos](../conceptos/04_objetivos_entrenamiento.md) (SDS como destilación 3D)
→ Ver también: [10 — Inferencia rápida](10_inferencia_rapida.md) (DDIM, DPM-Solver como alternativas sin destilación)
→ Ver también: [13 — Modelos difusión](../arquitecturas/13_modelos_difusion.md) (LCM en el contexto LDM)
→ Ver también: [07 — Fine-tuning eficiente](07_fine_tuning_eficiente.md) (LCM-LoRA combina LCM + LoRA)

---

## Puntos clave para recordar

- KD clásica: el estudiante aprende de los soft targets del maestro (temperatura $T > 1$ suaviza los logits)
- Feature distillation: supervisar representaciones intermedias, no solo outputs finales
- Progressive Distillation: reduce pasos DDPM a la mitad iterativamente, cada ronda genera un estudiante más rápido
- Consistency Models: $f_\theta(x_t, t) = x_0$ para todo $t$ en la misma trayectoria ODE; permite 1-2 pasos
- LCM destila en el espacio latente de Stable Diffusion; compatible con ControlNet y LoRA ("LCM-LoRA")
- SDS usa el gradiente de una difusión 2D como señal de "qué tan buena" es una representación 3D
- La destilación en difusión resuelve el problema de muestreo lento sin reentrenar desde cero
