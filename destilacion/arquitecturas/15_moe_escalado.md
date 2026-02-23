# Mixture of Experts y Escalado Eficiente

> Papers clave: [Switch Transformer](../../arquitecturas/2021_switch_transformer.pdf) · [Mixtral](../../arquitecturas/2024_mixtral.pdf) · [M3-JEPA](../../jepa/variantes/2024_m3_jepa.pdf)

---

## ¿Qué es?

**Mixture of Experts (MoE)** es una técnica arquitectónica donde el modelo contiene múltiples "expertos" especializados (sub-redes), pero solo un subconjunto de ellos procesa cada token. Esto permite escalar el número de parámetros totales sin escalar proporcionalmente el compute de inferencia: un modelo con 100B parámetros MoE puede tener el mismo costo de inferencia que un modelo denso de 20B si activa solo 2 de 10 expertos por token.

La motivación conceptual viene del campo cognitivo: así como los humanos tenemos áreas cerebrales especializadas que se activan según el contexto, un modelo MoE puede desarrollar expertos especializados para diferentes tipos de contenido (idiomas, dominios temáticos, tipos de razonamiento). El **routing** determina qué expertos procesar cada token, y su diseño es crítico para la eficiencia y calidad.

El Switch Transformer (2021, Google) demostró que incluso con un solo experto activo por token (routing hard), los modelos MoE escalan mejor que los modelos densos bajo el mismo presupuesto de compute. Mixtral (2024, Mistral AI) llevó esto a la práctica con un modelo open-source de 8 expertos que activa 2 por token, superando a Llama 2-70B con la eficiencia de compute de un modelo 13B.

---

## Mecanismo central

**Router (top-k softmax):**

Para un token $x$, el router asigna probabilidades a $E$ expertos:

$$p_i(x) = \frac{e^{h_i(x)}}{\sum_{j=1}^{E} e^{h_j(x)}}$$

donde $h(x) = W_r x + \text{noise}$ (noise para exploración durante entrenamiento).

**Top-k selection:**

$$\text{TopK}(p(x), k) = \{(i, p_i) : i \in \text{top-}k\text{ indices}\}$$

**Output combinado:**

$$\text{MoE}(x) = \sum_{i \in \text{TopK}} p_i(x) \cdot E_i(x)$$

En Switch Transformer: $k=1$ (un solo experto activo).
En Mixtral: $k=2$ de $E=8$ expertos.

**Load balancing loss:**

Para evitar que todos los tokens sean asignados a los mismos expertos (colapso del routing):

$$\mathcal{L}_{\text{aux}} = \alpha \cdot E \sum_{i=1}^{E} f_i \cdot P_i$$

donde $f_i$ = fracción de tokens asignados al experto $i$, $P_i$ = fracción de probabilidad del router asignada al experto $i$. Se minimiza cuando $f_i = 1/E$ para todos los expertos (carga uniforme).

**Mixtral — Sparse MoE con GQA:**

Mixtral 8×7B (46.7B parámetros total, 12.9B activos por token):
- 32 capas Transformer
- Cada capa FFN reemplazada por 8 expertos × 14336 dims
- Router selecciona 2 expertos por token
- GQA (8 KV heads, 32 Q heads) para eficiencia en el KV-cache
- Sliding Window Attention (4096 de ventana)

Dado que solo 2/8 expertos se activan por token, el FLOP count de inferencia equivale a un modelo ~13B denso, pero los 46.7B parámetros totales dan mucha más capacidad.

**M3-JEPA — MoE para predicción multimodal:**

En M3-JEPA, el predictor de JEPA usa expertos especializados por modalidad:

$$\hat{z}_y = \text{MoE-Predictor}(\bar{z}_x, \text{modalidad}) = \sum_i g_i \cdot E_i(\bar{z}_x)$$

El router aprende implícitamente a especializar expertos por tipo de contenido visual.

---

## Evolución cronológica

| Año | Modelo | Expertos | Activos/token | Params total |
|-----|--------|----------|---------------|-------------|
| 1991 | MoE original (Jacobs) | N expertos | Todos (soft) | — |
| 2017 | Sparsely-Gated MoE (Shazeer) | 2048 | Top-2 | 137B |
| 2021 | Switch Transformer | 64-2048 | Top-1 | 1.6T |
| 2022 | GLaM (Google) | 64 | Top-2 | 1.2T |
| 2024 | Mixtral 8×7B | 8 | Top-2 | 46.7B (12.9B activo) |
| 2024 | Mixtral 8×22B | 8 | Top-2 | 141B (39B activo) |

---

## Variantes y comparativa

| Aspecto | Switch (k=1) | Mixtral (k=2) | GLaM (k=2) |
|---------|-------------|---------------|------------|
| Activos/token | 1 experto | 2 expertos | 2 expertos |
| Stabilidad | Menor (k=1 más ruidoso) | Mayor | Mayor |
| Especialización | Alta | Alta | Alta |
| Load balancing | Crítico | Importante | Importante |
| Uso práctico | Investigación | Open-source | Cerrado |

---

## Conexiones con otros conceptos

→ Ver también: [06 — Scaling](../conceptos/06_scaling_emergencia.md) (MoE escala params sin escalar compute)
→ Ver también: [12 — Transformer y variantes](12_transformer_y_variantes.md) (Mixtral = Transformer + MoE)
→ Ver también: [14 — JEPA](14_jepa_world_models.md) (M3-JEPA usa MoE en el predictor)
→ Ver también: [10 — Inferencia rápida](../tecnicas/10_inferencia_rapida.md) (MoE: más params, mismo FLOP = inferencia eficiente)

---

## Puntos clave para recordar

- MoE: $E$ expertos, solo $k$ activos por token; compute de inferencia proporcional a $k$, no a $E$
- La dificultad principal es el **load balancing**: sin regularización, el router colapsa hacia 1-2 expertos
- Switch Transformer usa $k=1$ (un experto); suficiente para escalar bien, más simple de implementar
- Mixtral 8×7B: 46.7B params totales, pero solo 12.9B activos → velocidad de un 13B con calidad de un 70B
- El routing es "sparse" y diferenciable solo aproximadamente (top-k no es diferenciable, se usa straight-through)
- En la práctica, los expertos de Mixtral no se especializan perfectamente por dominio, pero hay tendencias claras
- MoE permite que el modelo "memorice" más sin más compute de inferencia — trade-off memoria vs. velocidad
