# Transformer y Variantes: BERT, GPT, Llama, Mistral

> Papers clave: [Attention Is All You Need](../../fundamentos/2017_attention_is_all_you_need.pdf) · [BERT](../../fundamentos/2018_bert.pdf) · [GPT-3](../../fundamentos/2020_gpt3.pdf) · [Llama 2](../../fundamentos/2023_llama2.pdf) · [Llama 3](../../fundamentos/2024_llama3.pdf) · [Mistral 7B](../../entrenamiento/2023_mistral.pdf)

---

## ¿Qué es?

La familia **Transformer** es la arquitectura dominante en IA desde 2017. El paper original propuso una arquitectura encoder-decoder para traducción automática, pero el campo rápidamente exploró variantes especializadas: encoders bidireccionales (BERT), decoders autoregresivos (GPT), y arquitecturas mixtas.

La genealogía de LLMs sigue una línea clara: GPT-3 demostró la emergencia de few-shot learning a escala; InstructGPT (ChatGPT) añadió alineación; Llama demostró que modelos más pequeños entrenados con más datos eran competitivos; Llama 2 añadió RLHF y contextos más largos; Mistral 7B introdujo Sliding Window Attention y GQA para eficiencia; Llama 3 escaló a 15T tokens con un tokenizer más grande.

Cada generación introduce optimizaciones arquitectónicas que se han vuelto estándar: **RoPE** para posiciones relativas, **RMSNorm** en lugar de LayerNorm, **SwiGLU** en lugar de ReLU, **GQA** para reducir el KV-cache, y **Flash Attention** para reducir la memoria de atención.

---

## Mecanismo central

**Bloque Transformer estándar (Pre-LN):**

```
x_1 = x + MHA(RMSNorm(x))
x_2 = x_1 + FFN(RMSNorm(x_1))
```

**SwiGLU (FFN moderno):**

$$\text{FFN}_{\text{SwiGLU}}(x) = \left(\text{SiLU}(xW_1) \odot xW_3\right) W_2$$

donde $\text{SiLU}(x) = x \cdot \sigma(x)$ es la Sigmoid-weighted Linear Unit. Requiere 3 proyecciones vs. 2 en el FFN estándar, pero con dimensión interna reducida para isoflops.

**RMSNorm:**

$$\text{RMSNorm}(x) = \frac{x}{\text{RMS}(x)} \cdot g, \quad \text{RMS}(x) = \sqrt{\frac{1}{n}\sum_i x_i^2}$$

Sin centrado (resta de media), solo re-escalado. 10-15% más rápida que LayerNorm.

**RoPE (Rotary Position Embedding):**

Para queries y keys en la posición $m$, $n$:

$$q_m^\top k_n = \text{Re}\!\left[(W_q x_m) \odot \exp(im\theta) \cdot \overline{(W_k x_n) \odot \exp(in\theta)}\right]$$

La atención resultante depende solo de $m - n$ (posición relativa), no de posiciones absolutas.

**Grouped Query Attention (GQA):**

En MHA estándar: $h$ cabezas de Q, $h$ de K, $h$ de V.
En GQA: $h$ cabezas de Q, $g < h$ grupos de K/V compartidos. Las cabezas dentro del mismo grupo comparten K y V.
Reducción de KV-cache: factor $h/g$.

---

## Evolución cronológica

| Año | Modelo | Params | Innovaciones arquitectónicas |
|-----|--------|--------|------------------------------|
| 2017 | Transformer (original) | — | Self-attention, positional encoding sinusoidal |
| 2018 | BERT-base/large | 110M/340M | Encoder bidireccional, MLM, NSP |
| 2020 | GPT-3 | 175B | Decoder-only masivo; few-shot emergente |
| 2022 | PaLM | 540B | Parallel residuals, multi-query attention |
| 2023 | Llama 1 | 7-65B | RoPE, RMSNorm, SwiGLU; open-source |
| 2023 | Llama 2 | 7-70B | GQA en 34B/70B, contexto 4096, RLHF |
| 2023 | Mistral 7B | 7B | Sliding Window Attention, GQA, grouped byte-pair |
| 2024 | Llama 3 | 8-405B | Tokenizer 128k vocab, GQA en todos, 15T tokens |

---

## Variantes y comparativa

| Variante | Arquitectura | Pretraining | Fortaleza |
|----------|-------------|-------------|-----------|
| BERT | Encoder-only (bidireccional) | MLM + NSP | Comprensión, clasificación, NER |
| GPT | Decoder-only (causal) | LM (siguiente token) | Generación, completion |
| T5 | Encoder-decoder | Span corruption | Seq2seq, traducción, QA generativo |
| Llama 2-7B | Decoder-only + RoPE/GQA | LM (2T tokens) | Balance eficiencia/calidad |
| Mistral 7B | Decoder-only + SWA/GQA | LM | Eficiencia en contextos largos |
| Llama 3-70B | Decoder-only + RoPE/GQA | LM (15T tokens) | Estado del arte open-source |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](../conceptos/01_atencion_transformers.md) (mecanismo base de todos estos modelos)
→ Ver también: [06 — Scaling](../conceptos/06_scaling_emergencia.md) (por qué Llama 3 es tan bueno con 70B)
→ Ver también: [07 — Fine-tuning eficiente](../tecnicas/07_fine_tuning_eficiente.md) (LoRA sobre estos modelos)
→ Ver también: [11 — RLHF](../tecnicas/11_rlhf_y_alineacion.md) (Llama 2-Chat = Llama 2 + RLHF)
→ Ver también: [15 — MoE](15_moe_escalado.md) (Mixtral como Transformer + MoE)
→ Ver también: [16 — SSM/Mamba](16_ssm_mamba.md) (alternativa a Transformer para secuencias largas)

---

## Puntos clave para recordar

- Pre-LN (LayerNorm antes de la sub-capa) es más estable para entrenamiento que Post-LN
- RMSNorm = LayerNorm sin centrado; 10-15% más rápida; estándar en Llama, Mistral
- SwiGLU tiene una "gate" multiplicativa que mejora la capacidad expressiva del FFN
- RoPE codifica posiciones relativas; permite extrapolación a contextos más largos que los entrenados
- GQA reduce el KV-cache compartiendo K y V entre grupos de heads; crucial para inferencia de batches grandes
- Llama 3 vs Llama 2: tokenizer 4× más grande (128k), 7.5× más datos, GQA en todos los tamaños
- Mistral 7B usa Sliding Window Attention: cada token solo atiende los últimos $w = 4096$ tokens; $O(n \cdot w)$ en vez de $O(n^2)$
