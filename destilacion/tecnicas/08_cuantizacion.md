# Cuantización de Modelos: GPTQ, LLM.int8(), QLoRA y AWQ

> Papers clave: [GPTQ](../../optimizacion/2022_gptq.pdf) · [LLM.int8()](../../optimizacion/2022_llm_int8.pdf) · [QLoRA](../../entrenamiento/2023_qlora.pdf)

---

## ¿Qué es?

La **cuantización** reduce la precisión numérica de los pesos (y opcionalmente activaciones) de un modelo de float32 o bfloat16 a enteros de 8, 4, o incluso 2 bits. El objetivo es reducir el footprint de memoria y acelerar la inferencia, idealmente sin degradación significativa de calidad.

Para los LLMs, la cuantización es esencial para democratizar el acceso: un modelo Llama-3-70B en float16 necesita ~140 GB de VRAM, mientras que en 4-bit necesita ~35 GB — la diferencia entre requerir 8 A100s o un solo H100 consumer-grade. En la práctica, los métodos GPTQ, GGUF y AWQ permiten correr modelos de 70B en una A6000 (48GB) o en una 4090 con CPU offloading.

Los desafíos de la cuantización en LLMs surgen de la presencia de **valores atípicos (outliers)** en las activaciones de capas de atención: un pequeño número de canales tiene magnitudes 100x mayores que la media. Redondear estos outliers introduce errores que se propagan y degradan el rendimiento. LLM.int8() y GPTQ abordan este problema de maneras distintas.

---

## Mecanismo central

**Cuantización uniforme (naïve):**

$$\hat{w} = \text{clamp}\left(\text{round}\left(\frac{w}{s}\right), q_{\text{min}}, q_{\text{max}}\right) \cdot s$$

donde $s = (\max(w) - \min(w)) / (2^b - 1)$ es el paso de cuantización para $b$ bits.

**LLM.int8() — descomposición de outliers:**

$$Y = X_{\text{outlier}} W_{\text{outlier}} + X_{\text{normal}}^{\text{int8}} W_{\text{normal}}^{\text{int8}} / s$$

Separa los ~0.1% de canales con outliers y los mantiene en float16; el resto se cuantiza a int8. La multiplicación int8 se delega a instrucciones CUDA optimizadas (CUTLASS).

**GPTQ — Optimal Brain Quantization:**

$$\min_{\hat{W}} \|W X - \hat{W} X\|_F^2$$

Cuantiza columna por columna usando la inversa de la Hessian de la función objetivo (aprox. con el dataset de calibración). Compensa el error de cuantizar $w_q$ actualizando las columnas restantes:

$$\delta W_{:,j:} = -\frac{w_q - \hat{w}_q}{H_{qq}^{-1}} (H^{-1})_{q, j:}$$

Este error compensation permite 4-bit con pérdida de calidad mínima.

**NF4 — Normal Float 4 (QLoRA):**

Los 16 niveles de cuantización se distribuyen siguiendo los cuantiles de una gaussiana estándar $\mathcal{N}(0,1)$:

$$q_i = \Phi^{-1}\!\left(\frac{i}{2^b}\right)$$

Esto es óptimo para pesos de redes neurales, que siguen distribuciones aproximadamente gaussianas. Comparado con int4 uniforme, NF4 reduce el error de cuantización ~20%.

**Double quantization (QLoRA):**

Las constantes de cuantización $s$ también se cuantizan (de float32 a float8), ahorrando ~0.5 bits adicionales por parámetro.

---

## Evolución cronológica

| Año | Método | Bits | Técnica clave |
|-----|--------|------|---------------|
| 2022 | LLM.int8() | 8-bit | Decomposición de outliers por canal |
| 2022 | GPTQ | 4-bit (post-training) | OBQ con compensación de error layer-by-layer |
| 2023 | QLoRA | 4-bit (NF4) + LoRA | NF4 + double quantization + paged optimizers |
| 2023 | GGUF/GGML | 2-8 bit | Cuantización flexible para CPU/Metal |
| 2023 | AWQ | 4-bit | Activación-aware: protege canales importantes según activaciones |
| 2024 | QuIP# | 2-bit | Lattice codebooks para cuantización extrema |

---

## Variantes y comparativa

| Método | Bits | Velocidad inference | Calidad relativa | Requiere GPU |
|--------|------|--------------------|--------------------|--------------|
| float16 (base) | 16 | 1× | 100% | Sí |
| LLM.int8() | 8 | ~0.8× | ~100% | Sí |
| GPTQ 4-bit | 4 | ~1.2× | ~99% | Sí (con exllama) |
| QLoRA NF4 | 4 | ~0.8× (sin optimización) | ~99% | Sí |
| AWQ 4-bit | 4 | ~1.3× | ~99.5% | Sí |
| GGUF Q4_K_M | 4-bit variable | variable | ~99% | CPU/GPU/Metal |

---

## Conexiones con otros conceptos

→ Ver también: [07 — Fine-tuning eficiente](07_fine_tuning_eficiente.md) (QLoRA combina cuantización + LoRA)
→ Ver también: [10 — Inferencia rápida](10_inferencia_rapida.md) (cuantización + Flash Attention para máxima velocidad)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md) (LLMs que se cuantizan)

---

## Puntos clave para recordar

- Los outliers en activaciones de LLMs (~0.1% de canales, 100x magnitud) son el principal desafío de cuantización
- LLM.int8() resuelve outliers con descomposición: outliers en fp16, resto en int8
- GPTQ cuantiza con compensación de error capa a capa usando la Hessian del dataset de calibración
- QLoRA = modelo base en NF4 (4-bit gaussiano-óptimo) + adaptadores LoRA en bf16; permite fine-tuning de 65B en 48GB
- NF4 es mejor que int4 porque los pesos de redes neurales son aproximadamente gaussianos
- AWQ prioriza canales más importantes según magnitud de activaciones (no de pesos)
- 4-bit es el sweet spot práctico: 2-bit degrada demasiado; 8-bit usa mucha memoria; 4-bit mantiene calidad
