# RAG y Retrieval Augmented Generation

> Papers clave: [RAG original](../../rag/2020_rag_original.pdf) · [REALM](../../rag/2020_realm.pdf) · [HyDE](../../rag/2022_hyde.pdf) · [Self-RAG](../../rag/2023_self_rag.pdf) · [RAG Survey](../../rag/2023_rag_survey.pdf) · [CRAG](../../rag/2024_corrective_rag.pdf)

---

## ¿Qué es?

**Retrieval-Augmented Generation (RAG)** es el paradigma que combina recuperación de documentos relevantes con generación de lenguaje, permitiendo a los LLMs responder preguntas con información actualizada o específica que no está en sus parámetros. En lugar de almacenar todo el conocimiento en los pesos del modelo (memoria paramétrica), RAG mantiene una base de conocimiento externa (memoria no paramétrica) que se consulta en tiempo de inferencia.

El problema fundamental que RAG resuelve es el de la **knowledge cutoff y la factualidad**: los LLMs tienen conocimiento hasta su fecha de entrenamiento y pueden alucinar hechos. Al recuperar documentos relevantes y usarlos como contexto en el prompt, el modelo puede generar respuestas fundamentadas en fuentes verificables.

La evolución de RAG va desde el sistema simple "embed-retrieve-generate" hasta arquitecturas sofisticadas con recuperación iterativa, auto-crítica, corrección de recuperación y alineación del retriever con el LLM. Este proyecto UPAO RAG implementa varios de estos principios: two-stage retrieval con reranking, diversificación de fuentes, y un ciclo de reflexión inspirado en Self-RAG.

---

## Mecanismo central

**Pipeline RAG básico (Lewis et al., 2020):**

1. **Index**: Fragmentar documentos en chunks, embeddear con $f_\theta$, almacenar en índice vectorial
2. **Retrieve**: Para query $q$, obtener top-$k$ chunks por similitud coseno:
   $$\text{chunks} = \text{TopK}_k\left(\{c : \text{sim}(f_\theta(q), f_\theta(c))\}\right)$$
3. **Generate**: Pasar query + chunks al LLM como contexto:
   $$p(a | q, \text{chunks}) = \text{LLM}(a | \text{prompt}(q, \text{chunks}))$$

**RAG-Token vs RAG-Sequence:**

En el paper original:
- **RAG-Sequence**: Usa el mismo documento para todos los tokens del output
- **RAG-Token**: Marginaliza sobre diferentes documentos por token (más flexible, más costoso)

**REALM — retriever aprendido:**

$$p(y | x) = \sum_{z \in \mathcal{Z}} p(y | x, z) p(z | x)$$

$$p(z | x) = \frac{\exp(f(x)^\top g(z))}{\sum_{z'} \exp(f(x)^\top g(z'))}$$

El retriever se entrena end-to-end con el LM mediante MIPS (Maximum Inner Product Search) aproximado con FAISS.

**HyDE — Hypothetical Document Embedding:**

En vez de embeddear la query directamente:

1. LLM genera un documento hipotético $d_{\text{hyp}}$ que respondería la query
2. Embeddear $d_{\text{hyp}}$ y usarlo para la recuperación

$$z_{\text{retrieve}} = f_\theta(d_{\text{hyp}}) \quad \text{donde} \quad d_{\text{hyp}} = \text{LLM}(q)$$

La intuición: la distribución de embeddings de documentos reales es diferente a la de queries; un documento hipotético vive en el mismo espacio que los documentos indexados.

**Self-RAG — tokens de reflexión:**

El modelo aprende a insertar tokens de control en su generación:
- `[Retrieve]` → ¿necesito recuperar más contexto?
- `[IsREL]` → ¿el chunk es relevante para la query?
- `[IsSUP]` → ¿la respuesta está soportada por el chunk?
- `[IsUSE]` → ¿es útil la respuesta generada?

El modelo decide adaptativamente cuándo recuperar y evalúa la calidad de su propia generación.

**CRAG — Corrective RAG:**

Agrega un módulo evaluador que clasifica los documentos recuperados en tres categorías:
- **Correct**: el documento es relevante → usar directamente
- **Ambiguous**: relevancia incierta → refinar con búsqueda web
- **Incorrect**: no relevante → descartar y buscar en web

La corrección puede incluir búsqueda web en tiempo real para documentos frescos.

---

## Evolución cronológica

| Año | Sistema | Innovación clave |
|-----|---------|------------------|
| 2020 | REALM | Retriever aprendido end-to-end con MIPS |
| 2020 | RAG (Lewis et al.) | Dense retriever + seq2seq; primero en escala |
| 2022 | HyDE | Generación de documento hipotético para mejorar embedding de query |
| 2023 | Self-RAG | Reflexión adaptativa; tokens de control para recuperación y verificación |
| 2023 | RAG Survey (Gao et al.) | Taxonomía: Naive RAG → Advanced RAG → Modular RAG |
| 2024 | CRAG | Evaluación de calidad del retrieval; corrección con búsqueda web |

---

## Variantes y comparativa

| Sistema | Retrieval | Generación | Reflexión | Cuando usar |
|---------|-----------|------------|-----------|-------------|
| Naive RAG | Dense, once | Directa | No | Prototipado rápido |
| RAG + Reranker | Dense + cross-encoder | Directa | No | Producción básica |
| HyDE | Dense de doc hipotético | Directa | No | Queries abstractas |
| Self-RAG | Adaptativo (decide cuándo) | Con auto-crítica | Sí | Alta factualidad |
| CRAG | Dense + evaluación + web | Corregida | Sí | Información reciente |
| Iterative RAG | Multi-paso | Iterativa | Sí | Razonamiento complejo |

---

## Implementación en UPAO RAG

Este proyecto implementa un **Advanced RAG** con las siguientes características:

1. **Two-stage retrieval** (`app/rag/reranker.py`):
   - Stage 1: candidatos amplios con threshold reducido (`score_threshold * 0.70`, mínimo 0.20) y `top_k * 4` candidatos
   - Stage 2: diversificación por documento — máximo `RAG_MAX_CHUNKS_PER_DOC = 2` chunks por documento

2. **Deduplicación de fuentes** (`app/rag/retriever.py`): por `{document_id}_{page}`

3. **Reflexión Self-RAG** (`app/rag/chain.py`): cuando `RAG_ENABLE_REFLECTION=true`, clasifica contexto como `SUFICIENTE/PARCIAL/INSUFICIENTE` antes de generar respuesta

4. **Historial conversacional**: últimos 6 mensajes del chat incluidos en el prompt

5. **SSE streaming**: `{type: 'sources'}` → `{type: 'token'}` → `{type: 'done'}`

---

## Conexiones con otros conceptos

→ Ver también: [02 — SSL](../conceptos/02_self_supervised_learning.md) (embeddings de query/documento son SSL)
→ Ver también: [03 — Representaciones](../conceptos/03_representaciones.md) (nomic-embed-text: 768 dims para RAG)
→ Ver también: [11 — RLHF](../tecnicas/11_rlhf_y_alineacion.md) (Self-RAG: auto-crítica como alineación)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md) (LLM que genera la respuesta)

---

## Puntos clave para recordar

- RAG = dense retrieval + in-context generation; resuelve knowledge cutoff y alucinaciones
- La calidad del retrieval es el cuello de botella: si se recupera basura, el LLM genera basura
- HyDE mejora el recall generando un documento hipotético; útil cuando la query es abstracta o corta
- Self-RAG decide adaptativamente cuándo recuperar; el modelo aprende los tokens de reflexión durante SFT
- CRAG evalúa la calidad de los documentos recuperados y puede recurrir a búsqueda web
- nomic-embed-text (768 dims, cosine) es el embedding usado en este proyecto para UPAO RAG
- Two-stage retrieval (este proyecto): candidatos amplios → filtrado por diversidad de documentos
