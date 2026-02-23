# Representaciones: Latent Spaces, Embeddings y Jerarquías

> Papers clave: [CLIP](../../multimodal/2021_clip.pdf) · [Flamingo](../../multimodal/2022_flamingo.pdf) · [BLIP-2](../../multimodal/2023_blip2.pdf) · [I-JEPA](../../jepa/core/2023_ijepa.pdf) · [Textual Inversion](../../difusion/finetuning/2022_textual_inversion.pdf) · [LDM](../../difusion/variantes/2022_ldm_stable_diffusion.pdf)

---

## ¿Qué es?

Una **representación** es la codificación interna que un modelo construye de su entrada. Todo en deep learning — clasificación, generación, recuperación, razonamiento — se apoya en la calidad de las representaciones aprendidas. El objetivo fundamental del preentrenamiento es aprender representaciones que capturen estructura semántica de alto nivel, invariante a variaciones superficiales irrelevantes.

El concepto de **latent space** (espacio latente) se refiere al espacio vectorial donde viven estas representaciones. En un buen espacio latente, conceptos similares están cerca (según alguna métrica, usualmente coseno o L2), y operaciones aritméticas tienen sentido semántico ("rey" − "hombre" + "mujer" ≈ "reina" en Word2Vec; interpolación de estilo en GAN/difusión).

Las representaciones pueden ser **densas** (un vector continuo por token o imagen, como en BERT y CLIP) o pueden estructurarse jerárquicamente: capas bajas capturan texturas y bordes, capas medias formas y partes, capas altas conceptos y categorías. Esta jerarquía emerge naturalmente del entrenamiento sin ser diseñada explícitamente.

---

## Mecanismo central

**Embedding como función de proyección:**

$$z = f_\theta(x) \in \mathbb{R}^d$$

donde $f_\theta$ es una red profunda (Transformer, CNN) y $d$ es la dimensión del espacio latente (768 para BERT-base, 1024 para CLIP ViT-L/14, 768 para nomic-embed-text).

**Similitud coseno:**

$$\text{sim}(z_1, z_2) = \frac{z_1 \cdot z_2}{\|z_1\| \|z_2\|}$$

Invariante a la escala, ampliamente usada para recuperación semántica (RAG, CLIP zero-shot).

**Espacio latente de difusión (LDM):**

$$z = \mathcal{E}(x), \quad \hat{x} = \mathcal{D}(z)$$

El encoder $\mathcal{E}$ (VQ-VAE o KL-VAE) comprime imágenes 512×512 a 64×64×4, reduciendo la dimensionalidad 64x. El proceso de difusión opera sobre $z$, no sobre píxeles — crucial para eficiencia.

**Q-Former (BLIP-2) como puente de representación:**

$$z_{\text{visual}} = \text{QFormer}(f_{\text{vision}}(I), z_{\text{query}})$$

32 learned query vectors atienden a la imagen a través de cross-attention, generando una representación compacta que el LLM puede consumir. Desacopla el encoder visual congelado del LLM congelado.

---

## Evolución cronológica

| Año | Paper / Técnica | Contribución a representaciones |
|-----|----------------|---------------------------------|
| 2013 | Word2Vec | Embeddings densos distribuidos; aritmética semántica |
| 2018 | BERT | Embeddings contextuales; misma palabra = distinta repr. según contexto |
| 2021 | CLIP | Espacio compartido imagen-texto; transferencia zero-shot |
| 2021 | DINO | Atención viT aprende a segmentar sin supervisión |
| 2022 | LDM | Espacio latente perceptual 64x comprimido; difusión en latentes |
| 2022 | Textual Inversion | Aprender embeddings de texto que representan conceptos nuevos |
| 2023 | BLIP-2 | Q-Former: bridge representation entre visión y lenguaje |
| 2023 | I-JEPA | Representaciones densas sin reconstrucción de píxeles |
| 2024 | IWM | Qué hace que las representaciones JEPA sean buenas world models |

---

## Variantes y comparativa

| Tipo | Dimensión | Cómo se aprende | Uso principal |
|------|-----------|-----------------|---------------|
| Word embeddings (Word2Vec, GloVe) | 100-300 | Skip-gram, co-ocurrencia | NLP básico |
| Embeddings contextuales (BERT) | 768-1024 | MLM bidireccional | NLU, QA |
| Embeddings multimodales (CLIP) | 512-1024 | Contrastive imagen-texto | Retrieval, zero-shot |
| Latentes de difusión (LDM VAE) | 4×64×64 | Reconstrucción + KL | Generación de imágenes |
| Embeddings de predicción (JEPA) | 768 (ViT-H) | Predictive SSL | Representación visual |
| Embeddings de documentos (nomic-embed) | 768 | Contrastive + MAE | RAG, semantic search |

---

## Conexiones con otros conceptos

→ Ver también: [02 — SSL](02_self_supervised_learning.md) (cómo se aprenden las representaciones)
→ Ver también: [04 — Objetivos](04_objetivos_entrenamiento.md) (qué función de pérdida forma el espacio latente)
→ Ver también: [07 — Fine-tuning eficiente](../tecnicas/07_fine_tuning_eficiente.md) (adaptar representaciones a tareas)
→ Ver también: [17 — Visión-Lenguaje](../dominios/17_vision_lenguaje.md) (espacios conjuntos imagen-texto)
→ Ver también: [18 — RAG](../dominios/18_rag_retrieval.md) (embeddings para recuperación semántica)

---

## Puntos clave para recordar

- Una representación es buena si es invariante a variaciones irrelevantes y sensible a variaciones semánticas
- CLIP aprende un espacio compartido imagen-texto donde imagen y descripción del mismo objeto están cerca
- LDM opera sobre latentes 64x comprimidos, no sobre píxeles — esto es lo que hace feasible la difusión en alta res
- Textual Inversion demuestra que conceptos nuevos (una mascota, un estilo) pueden representarse como vectores en el espacio de texto
- BLIP-2 usa Q-Former (32 queries aprendidos) como adaptador entre encoder visual congelado y LLM congelado
- JEPA aprende representaciones que son mejores world models que MAE porque no reconstituye detalles de bajo nivel
- El espacio latente de nomic-embed-text (768 dims) es el que usa este proyecto para RAG semántico
