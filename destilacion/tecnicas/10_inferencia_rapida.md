# Inferencia Rápida: Flash Attention, Speculative Decoding, DDIM y DPM-Solver

> Papers clave: [Flash Attention](../../optimizacion/2022_flash_attention.pdf) · [Flash Attention 2](../../optimizacion/2023_flash_attention2.pdf) · [Speculative Decoding](../../optimizacion/2022_speculative_decoding.pdf) · [DDIM](../../difusion/fundamentos/2020_ddim.pdf) · [DPM-Solver](../../difusion/optimizacion/2022_dpm_solver.pdf) · [DPM-Solver++](../../difusion/optimizacion/2022_dpm_solver_pp.pdf) · [UniPC](../../difusion/optimizacion/2023_unipc.pdf)

---

## ¿Qué es?

La **inferencia rápida** abarca todas las técnicas que aceleran el proceso de generar outputs de un modelo preentrenado sin (o con mínima) degradación de calidad. Es crucial en producción donde la latencia afecta directamente la experiencia del usuario.

Para LLMs, el cuello de botella es la **autoregresión**: cada token requiere un forward pass completo. Flash Attention reduce el tiempo de atención (que escala cuadráticamente) con tiling eficiente en memoria. El decoding especulativo paraleliza la generación usando un modelo pequeño rápido para proponer tokens y el modelo grande para verificarlos.

Para modelos de difusión, el cuello de botella son los **múltiples pasos de denoising**: DDPM necesita 1000 pasos, cada uno requiriendo un forward pass por la U-Net o DiT. DDIM re-interpreta el proceso como una ODE determinista que puede integrarse con solvers de mayor orden en 50, 20 o incluso 5 pasos sin destilación.

---

## Mecanismo central

**Flash Attention — IO-aware attention:**

Estándar: $O(n^2 d)$ en tiempo, $O(n^2)$ en HBM (High Bandwidth Memory).

Flash Attention tileiza el cómputo para que los bloques de $Q$, $K$, $V$ quepan en SRAM (mucho más rápida):

$$O_i = \text{softmax}\!\left(\frac{Q_i K^\top}{\sqrt{d}}\right) V = \sum_j \exp\!\left(\frac{q_i \cdot k_j}{\sqrt{d}} - m_i\right) v_j / \ell_i$$

Calcula el max $m_i$ y suma de exponenciales $\ell_i$ de forma incremental (online softmax). La atención completa se calcula en un solo pass GPU sin materializar la matriz $n \times n$:

- Memoria: $O(n)$ en HBM (no $O(n^2)$)
- Velocidad: 2-4× más rápida que la implementación estándar de PyTorch

Flash Attention 2 mejora el paralelismo entre bloques de queries (reduce syncs) y optimiza el caso de cabezas con tamaños no estándar.

**Speculative Decoding:**

El modelo grande $M_p$ (target) y el modelo pequeño $M_q$ (draft, mucho más rápido):

1. $M_q$ genera $\gamma$ tokens candidatos $x_1', ..., x_\gamma'$ en paralelo
2. $M_p$ evalúa todos los $\gamma$ tokens en una sola pasada forward (paralelizable)
3. Aceptar $x_i'$ con probabilidad $\min(1, p(x_i|x_{<i}) / q(x_i|x_{<i}))$; rechazar y resamplear si no

El throughput mejora si $\gamma \cdot \alpha > 1$ donde $\alpha$ es la tasa de aceptación (típicamente 0.7-0.9 para modelos bien elegidos).

**DDIM — Denoising Diffusion Implicit Models:**

Reinterpreta el proceso de difusión como una ODE determinista:

$$x_{t-1} = \sqrt{\bar{\alpha}_{t-1}} \underbrace{\left(\frac{x_t - \sqrt{1-\bar{\alpha}_t} \epsilon_\theta(x_t, t)}{\sqrt{\bar{\alpha}_t}}\right)}_{\text{predicted } x_0} + \underbrace{\sqrt{1-\bar{\alpha}_{t-1}} \epsilon_\theta(x_t, t)}_{\text{direction pointing to } x_t}$$

Este muestreador es determinístico (misma latente inicial → misma imagen) y permite 50 pasos con calidad comparable a 1000 pasos DDPM.

**DPM-Solver — ODE de alta precisión:**

Los modelos de difusión definen un semi-lineal ODE:

$$\frac{dx}{dt} = f(t)x + g(t) \epsilon_\theta(x, t)$$

La solución exacta tiene parte lineal integrable analíticamente y parte no-lineal que puede aproximarse con Taylor expansion. DPM-Solver-3 usa integración de orden 3, logrando calidad comparable a 50 pasos en solo 20 pasos.

DPM-Solver++ mejora el comportamiento para guidance $w > 1$ (CFG), prediciendo $x_0$ directamente en vez de $\epsilon$.

**UniPC — Unified Predictor-Corrector:**

Combina predictor (extrapola el siguiente estado) y corrector (refina con evaluación adicional) en un framework unificado. Permite hasta 5-10 pasos de alta calidad.

---

## Evolución cronológica

| Año | Método | Pasos / Velocidad | Para |
|-----|--------|--------------------|------|
| 2020 | DDIM | 50 (vs. 1000 DDPM) | Difusión |
| 2022 | DPM-Solver | 20 (vs. 50 DDIM) | Difusión |
| 2022 | DPM-Solver++ | 20, mejor con CFG | Difusión |
| 2022 | PLMS | 20-50 pasos | Difusión |
| 2022 | Flash Attention | 2-4× faster | LLMs |
| 2022 | Speculative Decoding | 2-3× throughput | LLMs |
| 2023 | Flash Attention 2 | +20% vs FA1 | LLMs |
| 2023 | UniPC | 5-10 pasos | Difusión |

---

## Variantes y comparativa

### Samplers de difusión

| Sampler | Pasos mínimos | Determinístico | Soporte CFG |
|---------|--------------|----------------|-------------|
| DDPM | 1000 | No | Sí |
| DDIM | 50 | Sí | Sí |
| DPM-Solver | 20 | Sí | Limitado |
| DPM-Solver++ | 20 | Sí | Excelente |
| PLMS | 20-50 | Sí | Sí |
| UniPC | 5-10 | Sí | Sí |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](../conceptos/01_atencion_transformers.md) (Flash Attention optimiza la atención del Transformer)
→ Ver también: [09 — Destilación](09_destilacion_conocimiento.md) (LCM, Progressive Distillation: reducir pasos via distilación)
→ Ver también: [08 — Cuantización](08_cuantizacion.md) (cuantización + Flash Attention = máxima velocidad)
→ Ver también: [13 — Modelos difusión](../arquitecturas/13_modelos_difusion.md) (DDIM/DPM-Solver en el pipeline LDM)

---

## Puntos clave para recordar

- Flash Attention no cambia el resultado matemático; solo cambia el orden de cómputo para minimizar accesos a HBM
- Flash Attention reduce la memoria de atención de $O(n^2)$ a $O(n)$ usando tiling y recompute
- Speculative decoding funciona mejor cuando el draft model es ~10× más pequeño y el acceptance rate es >0.7
- DDIM reinterpreta DDPM como ODE determinista; misma latente = misma imagen; 50 pasos ≈ 1000 pasos DDPM
- DPM-Solver usa la estructura semi-lineal de la ODE para integration exacta de la parte lineal
- DPM-Solver++ es preferido cuando se usa CFG (guidance fuerte); predice $x_0$ en vez de $\epsilon$
- UniPC es el solver más moderno; 5 pasos ya da resultados comparables a DDIM-50
