# Scaling Laws y Capacidades Emergentes

> Papers clave: [GPT-3](../../fundamentos/2020_gpt3.pdf) · [Llama 2](../../fundamentos/2023_llama2.pdf) · [Llama 3](../../fundamentos/2024_llama3.pdf) · [DiT](../../difusion/arquitecturas/2023_dit.pdf) · [Switch Transformer](../../arquitecturas/2021_switch_transformer.pdf) · [Mixtral](../../arquitecturas/2024_mixtral.pdf)

---

## ¿Qué es?

Las **scaling laws** son relaciones empíricas que predicen el rendimiento de un modelo en función de tres variables: número de parámetros $N$, tamaño del dataset $D$, y compute $C$. La ley de Kaplan et al. (2020) mostró que la loss de validación decrece como una ley de potencia en estas variables, lo que permite optimizar el compute budget antes de entrenar.

Las **capacidades emergentes** son habilidades que los modelos adquieren abruptamente al superar ciertos umbrales de escala, sin que hayan sido entrenadas explícitamente. GPT-3 con 175B parámetros mostró capacidad de few-shot learning que modelos más pequeños no poseían; modelos más grandes muestran razonamiento en cadena (chain-of-thought) que emerge sin fine-tuning.

El fenómeno del escalado no es exclusivo de LLMs: DiT mostró que modelos de difusión basados en Transformer también escalan suavemente con compute (Gflops), y los modelos JEPA siguen mejorando con más datos y parámetros. Esto sugiere que el escalado es una propiedad del aprendizaje profundo en general, no de arquitecturas específicas.

---

## Mecanismo central

**Scaling law de Kaplan et al. (2020):**

$$L(N) \approx \left(\frac{N_c}{N}\right)^{\alpha_N}, \quad L(D) \approx \left(\frac{D_c}{D}\right)^{\alpha_D}$$

con $\alpha_N \approx 0.076$, $\alpha_D \approx 0.095$ para modelos de lenguaje.

**Chinchilla compute-optimal:**

$$N_{\text{opt}} \propto C^{0.5}, \quad D_{\text{opt}} \propto C^{0.5}$$

La ley de Hoffmann et al. (2022, "Chinchilla") mostró que los modelos anteriores (GPT-3, Gopher) usaban demasiados parámetros y pocos datos para el mismo compute. El óptimo es escalar $N$ y $D$ en proporción igual: ~20 tokens por parámetro.

Llama 2 y Llama 3 aplican esta idea entrenando con 2T y 15T tokens respectivamente, lo que permite modelos más pequeños (7B-70B) con rendimiento comparable a modelos 10x más grandes entrenados con menos datos.

**DiT scaling (Gflops):**

$$L \approx f(\text{Gflops}), \quad \text{con } \text{DiT-XL/2} > \text{DiT-L/4} > \ldots$$

El rendimiento (FID) mejora monotónicamente con los Gflops de denoising, independientemente de cómo se distribuyan (más patches pequeños vs. menos patches grandes).

**Emergencia (Wei et al., 2022):**

Una capacidad es "emergente" si existe un umbral de escala por debajo del cual el rendimiento es aleatorio y por encima del cual es consistentemente bueno. Ejemplos: arithmetic (4-digit addition), chain-of-thought prompting, BIG-Bench tasks.

---

## Evolución cronológica

| Año | Trabajo | Contribución a scaling |
|-----|---------|------------------------|
| 2020 | GPT-3 (175B) | Demostración de emergencia: few-shot learning sin fine-tuning |
| 2020 | Scaling Laws (Kaplan et al.) | Primera cuantificación de N, D, C como leyes de potencia |
| 2022 | Chinchilla (Hoffmann et al.) | Compute-optimal: N y D en igual proporción |
| 2022 | Wei et al. | Formalización de "emergencia" como umbral |
| 2023 | DiT | Escalado en difusión: Gflops predice FID |
| 2023 | Llama 2 | Modelo pequeño + muchos tokens = competitivo con GPT-3.5 |
| 2024 | Llama 3 | 15T tokens, técnicas modernas, 405B parámetros |
| 2024 | Mixtral | Escalado de MoE: activa solo 2/8 expertos; 45B params, 12B activos |

---

## Variantes y comparativa

| Modelo | Parámetros | Tokens entrenamiento | Compute (PF-days) |
|--------|-----------|---------------------|-------------------|
| GPT-3 | 175B | 300B | ~3640 |
| Chinchilla | 70B | 1.4T | ~3640 (mismo C) |
| Llama 2-70B | 70B | 2T | ~6900 |
| Llama 3-70B | 70B | 15T | ~52000 |
| Mixtral-8x7B | 46.7B total (12.9B activos) | — | Eficiente en inference |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](01_atencion_transformers.md) (Transformer es la arquitectura que escala)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md) (evolución Llama)
→ Ver también: [15 — MoE](../arquitecturas/15_moe_escalado.md) (MoE como forma de escalar parámetros sin más compute)
→ Ver también: [13 — Difusión](../arquitecturas/13_modelos_difusion.md) (DiT escala suavemente)

---

## Puntos clave para recordar

- Scaling laws: loss $\propto N^{-\alpha_N}$, $D^{-\alpha_D}$, $C^{-\alpha_C}$ como leyes de potencia
- Chinchilla: el compute óptimo requiere ~20 tokens por parámetro; modelos anteriores estaban "undertrained"
- Llama 2/3 corrigen este error entrenando modelos más pequeños con muchos más datos
- Las capacidades emergentes aparecen abruptamente en umbrales de escala, no gradualmente
- DiT demuestra que el escalado también funciona en difusión: más Gflops = mejor FID sistemáticamente
- MoE (Mixtral, Switch Transformer) escala parámetros sin escalar compute de inferencia proporcionalmente
- El compute de pre-entrenamiento domina el total; la ley de potencia predice 6ND flops para un entrenamiento typical
