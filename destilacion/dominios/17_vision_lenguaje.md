# Visión-Lenguaje: CLIP, Flamingo, BLIP-2, LLaVA

> Papers clave: [CLIP](../../multimodal/2021_clip.pdf) · [Flamingo](../../multimodal/2022_flamingo.pdf) · [BLIP-2](../../multimodal/2023_blip2.pdf) · [LLaVA](../../multimodal/2023_llava.pdf) · [LLaVA-NeXT](../../multimodal/2024_llava_next.pdf) · [GPT-4](../../multimodal/2023_gpt4.pdf) · [Gemini](../../multimodal/2023_gemini.pdf)

---

## ¿Qué es?

Los **modelos visión-lenguaje (VLMs)** aprenden a razonar sobre imágenes usando lenguaje y viceversa. Son el puente entre la percepción visual y el razonamiento lingüístico, y representan uno de los avances más impactantes de la IA moderna: con un solo modelo, es posible describir imágenes, responder preguntas visuales, generar imágenes desde texto, y razonar sobre escenas complejas.

La evolución de VLMs sigue una curva clara de complejidad decreciente con calidad creciente. CLIP (2021) aprendió representaciones visuales alineadas con texto de manera contrastiva a escala masiva, sin supervisión visual explícita. Flamingo (2022) conectó un encoder visual congelado con un LLM mediante cross-attention, demostrando few-shot VQA. BLIP-2 (2023) introdujo el Q-Former como puente eficiente para combinar encoders y LLMs congelados. LLaVA (2023) demostró que incluso una proyección lineal simple puede alinear visión y lenguaje cuando se tiene el dataset de instrucción correcto generado por GPT-4.

---

## Mecanismo central

**CLIP — contrastive pretraining:**

Para un batch de $N$ pares (imagen $I_i$, texto $T_i$):

$$\mathcal{L}_{\text{CLIP}} = -\frac{1}{2N}\sum_{i=1}^{N}\left[\log\frac{e^{s_{ii}/\tau}}{\sum_j e^{s_{ij}/\tau}} + \log\frac{e^{s_{ii}/\tau}}{\sum_j e^{s_{ji}/\tau}}\right]$$

donde $s_{ij} = f_I(I_i)^\top f_T(T_j)$ es el producto escalar entre embeddings imagen-texto.

CLIP aprende a alinear los espacios de embedding de imagen y texto: imágenes y sus descripciones quedan cerca en el espacio compartido.

**Flamingo — gated cross-attention:**

Intercala capas de cross-attention entre el LLM y los features visuales:

$$y_l = \text{LM}_l(y_{l-1}) + \tanh(\alpha_l) \cdot \text{CrossAttn}_l(y_{l-1}, x_{\text{visual}})$$

donde $\alpha_l$ es un parámetro de gate inicializado en 0 (el LLM no cambia al inicio). Solo se entrenan las capas de cross-attention y los embeddings de percepción; el LLM y el encoder visual permanecen congelados.

**BLIP-2 — Q-Former como bridge:**

El Q-Former es un Transformer de 2 etapas con 32 query tokens aprendidos:

1. **Self-attention + cross-attention con imagen** (encoder congelado): 32 queries atienden a los features visuales
2. **Self-attention** con tokens de texto: los queries se informan del contexto textual

Output: 32 vectores de dimensión 768 — la "representación visual comprimida" que se pasa al LLM.

El Q-Former desacopla completamente el encoder visual del LLM: cualquier combinación funciona.

**LLaVA — linear projection:**

Arquitectura sorprendentemente simple:

$$H_v = W \cdot Z_v$$

donde $Z_v$ son los features del encoder CLIP ViT-L/14 y $W$ es una matriz de proyección lineal. Los tokens visuales resultantes $H_v$ se concatenan con los tokens de texto y se pasan al LLM (Llama 2).

El secreto de LLaVA no es la arquitectura sino los **datos**: el paper usa GPT-4 para generar 150K instrucciones de seguimiento multimodal (descripciones, QA, razonamiento) a partir de captions de COCO.

**LLaVA-NeXT — mejoras:**

- Aumenta la resolución a 672×672 (4× patches)
- Usa Llama 2-13B/70B y Mistral 7B como LLM
- Mejor curación de datos: más diversidad de razonamiento

---

## Evolución cronológica

| Año | Modelo | Arquitectura | Pretraining | Parámetros |
|-----|--------|-------------|-------------|-----------|
| 2021 | CLIP | ViT + Transformer texto | Contrastive (400M pares) | 400M |
| 2021 | ALIGN | EfficientNet + BERT | Contrastive (1.8B pares) | — |
| 2022 | Flamingo | Perceiver + Chinchilla | Cross-attention (multimodal web) | 80B |
| 2023 | BLIP-2 | ViT + Q-Former + FlanT5/Vicuna | Bootstrapping 3 stages | ~4-12B activos |
| 2023 | LLaVA | CLIP ViT-L/14 + Linear + Llama2 | GPT-4 instruct data | 13B |
| 2023 | GPT-4V | — (cerrado) | — | — |
| 2023 | Gemini | — (native multimodal) | Texto+imagen+video+audio | — |
| 2024 | LLaVA-NeXT | CLIP + MLP + Llama2/Mistral | Más datos, mayor res | 7-34B |

---

## Variantes y comparativa

| Modelo | Encoder visual | LLM | Conector | Zero-shot VQA |
|--------|--------------|-----|----------|---------------|
| CLIP | ViT-L/14 | Transformer texto | N/A (solo repr.) | Muy bueno |
| Flamingo-80B | Perceiver | Chinchilla 70B | Gated cross-attn | Excelente |
| BLIP-2 (FlanT5-XL) | ViT-G/14 | FlanT5-XL | Q-Former | Excelente |
| LLaVA-1.5 (13B) | CLIP ViT-L/14 | Vicuna 13B | MLP 2 capas | Muy bueno |
| LLaVA-NeXT (34B) | CLIP ViT-L/14 | Hermes-34B | MLP 2 capas | Excelente |

---

## Conexiones con otros conceptos

→ Ver también: [02 — SSL](../conceptos/02_self_supervised_learning.md) (CLIP como contrastive SSL)
→ Ver también: [03 — Representaciones](../conceptos/03_representaciones.md) (espacio conjunto imagen-texto)
→ Ver también: [05 — Generación condicionada](../conceptos/05_generacion_condicionada.md) (CLIP como encoder de condicionamiento en difusión)
→ Ver también: [11 — RLHF](../tecnicas/11_rlhf_y_alineacion.md) (LLaVA-NeXT usa instrucción tuning)
→ Ver también: [14 — JEPA](../arquitecturas/14_jepa_world_models.md) (VL-JEPA extiende JEPA a visión-lenguaje)

---

## Puntos clave para recordar

- CLIP aprende a alinear imagen y texto en un espacio compartido de 512-1024 dims mediante InfoNCE contrastivo
- CLIP permite zero-shot classification: comparar embedding de imagen con embeddings de textos de clases
- Flamingo congela tanto el encoder visual como el LLM y solo entrena las capas de cross-attention (gateadas)
- El Q-Former de BLIP-2 usa 32 queries aprendidos para extraer la representación visual más relevante para el LLM
- LLaVA usa solo una proyección lineal, pero con datos de instrucción de alta calidad generados por GPT-4
- La "magia" de LLaVA está en los datos, no en la arquitectura — 150K pares de instrucción de seguimiento visual
- GPT-4V y Gemini son natively multimodal (no concatenan visión+texto), lo que les da ventajas de coherencia
