# Atención y Transformers

> Papers clave: [Attention Is All You Need](../../fundamentos/2017_attention_is_all_you_need.pdf) · [BERT](../../fundamentos/2018_bert.pdf) · [GPT-3](../../fundamentos/2020_gpt3.pdf) · [Llama 2](../../fundamentos/2023_llama2.pdf) · [Llama 3](../../fundamentos/2024_llama3.pdf) · [DiT](../../difusion/arquitecturas/2023_dit.pdf) · [BLIP-2](../../multimodal/2023_blip2.pdf) · [I-JEPA](../../jepa/core/2023_ijepa.pdf)

---

## ¿Qué es?

El mecanismo de **atención** es la operación fundamental que permite a los modelos relacionar dinámicamente cualquier par de posiciones en una secuencia. A diferencia de las RNNs, que procesan tokens secuencialmente, la atención calcula relaciones entre todos los pares en paralelo, resolviendo el problema del gradiente desvaneciente en secuencias largas.

La arquitectura **Transformer** (Vaswani et al., 2017) combina Multi-Head Attention con capas feed-forward, normalización de capas y conexiones residuales. Su diseño completamente paralelo y su capacidad de capturar dependencias de largo alcance la convirtieron en el backbone dominante de prácticamente toda la IA moderna, desde modelos de lenguaje hasta generación de imágenes y video.

El impacto del Transformer trasciende el NLP: DiT (2023) reemplaza la U-Net por bloques Transformer en modelos de difusión, I-JEPA y V-JEPA utilizan ViT como codificador, y modelos multimodales como BLIP-2 y Flamingo usan cross-attention para conectar modalidades.

---

## Mecanismo central

**Atención escalada producto-punto (Scaled Dot-Product Attention):**

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V$$

donde $Q \in \mathbb{R}^{n \times d_k}$, $K \in \mathbb{R}^{m \times d_k}$, $V \in \mathbb{R}^{m \times d_v}$.

El factor $1/\sqrt{d_k}$ estabiliza los gradientes evitando que el producto interno crezca con la dimensión.

**Multi-Head Attention (MHA):**

$$\text{MHA}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

$$\text{head}_i = \text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$

Cada cabeza aprende subespacios de atención distintos, capturando diferentes tipos de relaciones (sintácticas, semánticas, posicionales).

**Positional encoding sinusoidal:**

$$PE_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d}}\right), \quad PE_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d}}\right)$$

Los modelos modernos (Llama, Mistral) reemplazaron esto por **RoPE** (Rotary Position Embedding), que codifica posiciones relativas multiplicando la query y key por matrices de rotación, mejorando la extrapolación a longitudes no vistas.

**Transformador encoder-decoder (original):**

$$\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2$$

Cada sub-capa usa normalización pre-LN o post-LN y conexión residual: $x \leftarrow x + \text{SubLayer}(\text{LayerNorm}(x))$.

---

## Evolución cronológica

| Año | Paper | Contribución clave |
|-----|-------|--------------------|
| 2017 | Attention Is All You Need | Arquitectura Transformer original; eliminación de recurrencia |
| 2018 | BERT | Pre-entrenamiento bidireccional con MLM; representaciones contextuales |
| 2019 | GPT-2 | Escalado del decoder-only; capacidades zero-shot emergentes |
| 2020 | GPT-3 | 175B params; few-shot learning sin fine-tuning |
| 2021 | ViT | Patches de imagen como tokens; Transformer puro para visión |
| 2022 | Flash Attention | IO-aware attention: O(N) memoria, mismo resultado matemático |
| 2023 | Llama 2 | RoPE, GQA, SwiGLU, RMSNorm; efficient open-source LLM |
| 2023 | DiT | Transformer sustituye U-Net en difusión; escala con Gflops |
| 2024 | Llama 3 | Tokenizer 128k, GQA en todos los tamaños, mejor RLHF |
| 2024 | Flash Attention 3 | Exploits Hopper GPU (H100) para mayor throughput |

---

## Variantes y comparativa

| Variante | Descripción | Uso principal |
|----------|-------------|---------------|
| **Encoder-only (BERT)** | Atención bidireccional, MLM | Clasificación, NER, QA extractivo |
| **Decoder-only (GPT)** | Atención causal (autoregresiva) | Generación de texto, chat |
| **Encoder-decoder (T5)** | Cross-attention entre enc y dec | Traducción, resumen, seq2seq |
| **ViT** | Tokens = patches de imagen | Clasificación, backbone visual |
| **DiT** | Transformer + AdaLN para difusión | Generación de imágenes/video |
| **GQA** | Grouped Query Attention | Reducción de KV-cache; Llama 2-70B |
| **MQA** | Multi-Query Attention | KV-cache mínimo; inferencia rápida |
| **Sparse Attention** | Solo ventana local + global | Secuencias muy largas (Longformer) |

---

## Conexiones con otros conceptos

→ Ver también: [02 — Self-Supervised Learning](02_self_supervised_learning.md) (BERT=SSL con Transformer)
→ Ver también: [03 — Representaciones](03_representaciones.md) (qué codifican las capas de atención)
→ Ver también: [06 — Scaling y emergencia](06_scaling_emergencia.md) (Transformers + más params = emergencia)
→ Ver también: [10 — Inferencia rápida](../tecnicas/10_inferencia_rapida.md) (Flash Attention, GQA)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md)
→ Ver también: [13 — Modelos de difusión](../arquitecturas/13_modelos_difusion.md) (DiT)
→ Ver también: [14 — JEPA](../arquitecturas/14_jepa_world_models.md) (ViT backbone)

---

## Puntos clave para recordar

- La atención calcula similitudes Q·K, las normaliza con softmax y las usa para ponderar V; es $O(n^2 d)$ en tiempo
- El escalado por $1/\sqrt{d_k}$ previene saturación del softmax en dimensiones altas
- Multi-Head permite múltiples "perspectivas" de la misma secuencia en paralelo
- RoPE codifica posición relativa multiplicativamente, facilitando extrapolación de contexto
- El Transformer es el backbone universal: LLMs, difusión (DiT), visión (ViT), multimodal (BLIP-2), JEPA
- Flash Attention no cambia el resultado matemático pero reduce la memoria de $O(n^2)$ a $O(n)$ mediante tiling
- GQA/MQA reducen el KV-cache compartiendo keys/values entre grupos de heads
