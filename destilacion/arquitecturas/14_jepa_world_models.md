# JEPA y World Models: De LeCun a V-JEPA 2

> Papers clave: [LeCun 2022](../../jepa/core/2022_lecun_path_autonomous_intelligence.pdf) · [JEPA + Slow Features](../../jepa/core/2022_jepa_slow_features.pdf) · [I-JEPA](../../jepa/core/2023_ijepa.pdf) · [IWM](../../jepa/core/2024_iwm.pdf) · [V-JEPA](../../jepa/core/2024_vjepa.pdf) · [V-JEPA 2](../../jepa/core/2025_vjepa2.pdf)

---

## ¿Qué es?

**JEPA** (Joint-Embedding Predictive Architecture) es un framework de aprendizaje auto-supervisado propuesto por Yann LeCun como parte de su visión para la "inteligencia autónoma" (2022). A diferencia de los modelos generativos que predicen directamente en el espacio de entrada (píxeles, tokens), JEPA predice en el **espacio latente**: dado el encoding de una parte visible de la entrada, predice el encoding de una parte oculta.

La ventaja fundamental de JEPA sobre métodos generativos como MAE es que **no necesita reconstruir detalles irrelevantes** (texturas, iluminación, ruido de fondo). Al predecir en el espacio de representación, el modelo puede aprender estructuras semánticas de alto nivel directamente. Esto lo hace más eficiente y produce representaciones más transferibles.

El framework JEPA está también fundamentado en la teoría de **energy-based models (EBM)**: asigna energía baja a pares (contexto, objetivo) consistentes, y energía alta a pares inconsistentes. La predicción en el espacio latente es el mecanismo que evita el colapso de representaciones — el problema que afecta a muchos EBMs donde el modelo aprende a asignar energía baja a todo.

---

## Mecanismo central

**Arquitectura JEPA (I-JEPA):**

```
Contexto x → Encoder f_θ → z_x (representación contexto)
Objetivo y  → Encoder f_θ → z_y (representación objetivo, EMA)
                              ↑
Predictor s_θ(z_x, pos_y) → ẑ_y
```

**Objetivo de entrenamiento:**

$$\mathcal{L} = \mathbb{E}\left[\|s_\theta(\bar{z}_x, p_y) - \text{sg}(z_y)\|^2\right]$$

- $\bar{z}_x$: encoding del contexto (regiones visibles de la imagen)
- $p_y$: posición/tamaño de las regiones objetivo (mascaradas)
- $z_y$: encoding del objetivo via **EMA encoder** (sin gradiente)
- $s_\theta$: predictor (Transformer más pequeño)
- sg: stop-gradient — crítico para prevenir el colapso

**¿Por qué el EMA evita el colapso?**

Si el encoder objetivo recibiera gradientes directos, colapsaría hacia la solución trivial donde $z_x = z_y = \text{constante}$. El EMA actualiza lentamente el encoder objetivo con promedio exponencial de los pesos del encoder principal:

$$\theta_{\text{EMA}} \leftarrow \tau \theta_{\text{EMA}} + (1-\tau)\theta, \quad \tau \approx 0.996$$

**I-JEPA — detalles de masking:**

- Backbone: ViT-H/14 (632M params)
- Masking: múltiples bloques rectangulares (objetivo), región central (contexto)
- El predictor recibe posiciones como positional embeddings adicionales
- Input: 224×224 imagen, output: 16×16 embeddings (patches 14px)

**V-JEPA — extensión a video:**

$$\mathcal{L}_{\text{V-JEPA}} = \mathbb{E}\left[\sum_{b} \|s_\theta(\bar{z}_{\text{ctx}}, p_b) - \text{sg}(z_b)\|^2\right]$$

Masking espacio-temporal: tubes (regiones rectangulares a lo largo del tiempo). El predictor recibe posiciones espacio-temporales como embeddings.

**V-JEPA 2 — world model + planning:**

V-JEPA 2 extiende la predicción a trayectorias condicionadas por acciones:

$$\hat{z}_{t+1:t+H} = s_\theta(z_t, a_{t:t+H})$$

El modelo predice estados latentes futuros condicionados por una secuencia de acciones propuestas, permitiendo planning sin necesidad de reconstruir frames.

---

## Evolución cronológica

| Año | Paper | Contribución |
|-----|-------|-------------|
| 2022 | LeCun — Path towards Autonomous Intelligence | Propone JEPA como framework para IA de propósito general |
| 2022 | JEPA + Slow Feature Analysis | Conexión teórica con slow features, análisis de estabilidad |
| 2023 | I-JEPA | Primera implementación: imágenes, ViT-H, supera MAE en linprobe |
| 2024 | IWM (Image World Models) | Ablaciones extensas: qué hace que JEPA sea buen world model |
| 2024 | V-JEPA | Extensión a video; masking espacio-temporal; 16 frames |
| 2025 | V-JEPA 2 | Action-conditioned prediction; planning; robótica |

---

## Variantes del ecosistema JEPA

| Variante | Modalidad | Paper | Especialización |
|----------|-----------|-------|-----------------|
| I-JEPA | Imágenes | 2023 | Backbone ViT, masking espacial |
| A-JEPA | Audio | 2023 | Espectrogramas como imágenes |
| MC-JEPA | Multi-componente | 2023 | Movimiento + apariencia separados |
| V-JEPA | Video | 2024 | Masking espacio-temporal |
| D-JEPA | Discreto | 2024 | Tokens VQ como objetivos |
| 3D-JEPA | Nube de puntos | 2024 | Geometría 3D |
| M3-JEPA | Multimodal + MoE | 2024 | Expertos por modalidad |
| VL-JEPA | Visión-Lenguaje | 2025 | Predicción conjunta imagen-texto |
| LLM-JEPA | Lenguaje | 2025 | Predicción de representaciones de texto |
| Audio-JEPA | Audio ondas | 2025 | Señal de audio bruta |

---

## Comparativa JEPA vs métodos relacionados

| Método | Predice en | Negatives | Colapso | Semántica |
|--------|-----------|-----------|---------|-----------|
| MAE | Espacio píxel | No | No aplica | Media |
| SimCLR | Espacio latente | Sí (contrastive) | Prevenido | Alta |
| BYOL/DINO | Espacio latente | No (EMA) | Prevenido (EMA) | Alta |
| I-JEPA | Espacio latente | No (EMA) | Prevenido (EMA+predictor) | Muy alta |
| V-JEPA | Espacio latente espacio-temporal | No (EMA) | Prevenido | Muy alta |

---

## Conexiones con otros conceptos

→ Ver también: [02 — SSL](../conceptos/02_self_supervised_learning.md) (JEPA como paradigma SSL predictivo)
→ Ver también: [03 — Representaciones](../conceptos/03_representaciones.md) (qué aprende JEPA en el espacio latente)
→ Ver también: [01 — Atención](../conceptos/01_atencion_transformers.md) (ViT como backbone de I-JEPA)
→ Ver también: [15 — MoE](15_moe_escalado.md) (M3-JEPA usa MoE para múltiples modalidades)
→ Ver también: [19 — Generación visual](../dominios/19_generacion_visual.md) (V-JEPA 2 para video comprensión/planning)
→ Ver también: [17 — Visión-Lenguaje](../dominios/17_vision_lenguaje.md) (VL-JEPA, TI-JEPA)

---

## Puntos clave para recordar

- JEPA predice representaciones de regiones ocultas dado el contexto visible — no reconstituye píxeles
- El stop-gradient en el EMA encoder es **crítico** para evitar el colapso a soluciones triviales
- El predictor recibe posiciones de las regiones objetivo como embeddings adicionales, permitiendo predicción posición-específica
- I-JEPA supera a MAE en linear probing (transferencia con cabeza lineal) con igual compute
- V-JEPA usa masking espacio-temporal (tubes); el predictor aprende regularidades físicas de movimiento
- V-JEPA 2 es un world model completo: puede predecir trayectorias condicionadas por acciones → planning
- La colección de variantes JEPA muestra que el framework es altamente generalizable: audio, 3D, grafos, señales, telecomunicaciones
