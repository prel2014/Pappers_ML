# RLHF y Alineación: InstructGPT, DPO y Feedback Humano

> Papers clave: [InstructGPT](../../entrenamiento/2022_instructgpt_rlhf.pdf) · [DPO](../../entrenamiento/2023_dpo.pdf) · [Self-RAG](../../rag/2023_self_rag.pdf) · [Consistency Models](../../difusion/variantes/2023_consistency_models.pdf)

---

## ¿Qué es?

La **alineación** es el problema de hacer que los modelos de lenguaje se comporten de acuerdo con las intenciones humanas: ser útiles, honestos e inofensivos. Los modelos preentrenados con SSL (GPT-3, Llama) generan texto plausible estadísticamente, pero no necesariamente respuestas útiles o alineadas con los valores humanos.

**RLHF** (Reinforcement Learning from Human Feedback) es el pipeline más influyente para alineación, introducido en InstructGPT (OpenAI, 2022). El proceso tiene tres etapas: (1) SFT (Supervised Fine-Tuning) en demostraciones humanas; (2) entrenamiento de un **reward model** a partir de comparaciones humanas; (3) optimización del LLM con PPO contra el reward model.

**DPO** (Direct Preference Optimization, 2023) simplifica drásticamente este pipeline eliminando el reward model explícito. Deriva analíticamente la solución óptima del RLHF y la convierte directamente en una función de pérdida supervisionada, haciendo el entrenamiento más estable y eficiente.

---

## Mecanismo central

**Pipeline RLHF (InstructGPT):**

**Etapa 1 — SFT:**
$$\mathcal{L}_{\text{SFT}} = -\mathbb{E}_{(x,y) \sim \mathcal{D}_{\text{demo}}} \log \pi_{\text{SFT}}(y \mid x)$$

**Etapa 2 — Reward Model:**
$$\mathcal{L}_{\text{RM}} = -\mathbb{E}_{(x, y_w, y_l)} \left[\log \sigma\!\left(r_\phi(x, y_w) - r_\phi(x, y_l)\right)\right]$$

donde $y_w \succ y_l$ indica que los humanos prefieren $y_w$ sobre $y_l$.

**Etapa 3 — PPO con KL penalty:**

$$\max_{\pi_\theta} \mathbb{E}_{(x,y) \sim \pi_\theta}\left[r_\phi(x, y)\right] - \beta D_{\text{KL}}\!\left(\pi_\theta \| \pi_{\text{ref}}\right)$$

La penalización KL previene que el modelo se aleje demasiado del modelo SFT de referencia (evita reward hacking).

**DPO — solución óptima analítica:**

La política óptima del objetivo RLHF tiene la forma:

$$\pi^*(y \mid x) \propto \pi_{\text{ref}}(y \mid x) \exp\!\left(\frac{1}{\beta} r(x, y)\right)$$

Despejando el reward:

$$r(x, y) = \beta \log \frac{\pi^*(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \beta \log Z(x)$$

Sustituyendo en la Bradley-Terry loss:

$$\mathcal{L}_{\text{DPO}} = -\mathbb{E}_{(x, y_w, y_l)} \left[\log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

**Self-RAG — auto-crítica como alineación:**

Self-RAG entrena el modelo para insertar tokens especiales de reflexión:
- `[Retrieve]` → ¿necesito recuperar más contexto?
- `[IsREL]` → ¿es relevante el chunk recuperado?
- `[IsSUP]` → ¿soporta el contexto la respuesta generada?
- `[IsUSE]` → ¿es útil la respuesta?

El modelo aprende a auto-criticar su propia generación, mejorando factualidad sin RLHF explícito.

---

## Evolución cronológica

| Año | Trabajo | Contribución |
|-----|---------|-------------|
| 2017 | RLHF (Christiano et al.) | Feedback humano para policies de RL |
| 2022 | InstructGPT | SFT + RM + PPO para LLMs; GPT-3 → ChatGPT-like |
| 2022 | Constitutional AI (Anthropic) | Critica y revisa con principios escritos; reduce supervisión humana |
| 2023 | Llama 2-Chat | RLHF con ghost attention para multi-turn |
| 2023 | DPO | Elimina reward model; loss directa sobre preferencias |
| 2023 | Self-RAG | Auto-crítica con tokens de reflexión en RAG |
| 2024 | ORPO | Alinea durante SFT con odds ratio; un solo stage |
| 2024 | SimPO | DPO simplificado sin modelo de referencia |

---

## Variantes y comparativa

| Método | Reward Model | # Etapas | Estabilidad | Facilidad |
|--------|-------------|----------|-------------|-----------|
| RLHF + PPO | Explícito | 3 | Media (reward hacking) | Compleja |
| DPO | Implícito | 2 (SFT + DPO) | Alta | Sencilla |
| ORPO | Implícito | 1 | Alta | Muy sencilla |
| SimPO | Implícito | 2 | Alta | Sencilla |
| Constitutional AI | Implícito (LLM) | 2 | Alta | Media |
| Self-RAG | Token de crítica | 1 (SFT especial) | Alta | Media |

---

## Conexiones con otros conceptos

→ Ver también: [04 — Objetivos](../conceptos/04_objetivos_entrenamiento.md) (DPO como objetivo derivado del óptimo RLHF)
→ Ver también: [07 — Fine-tuning eficiente](07_fine_tuning_eficiente.md) (LoRA se usa en el SFT y DPO stage)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md) (Llama 2-Chat = Llama 2 + RLHF)
→ Ver también: [18 — RAG](../dominios/18_rag_retrieval.md) (Self-RAG extiende RAG con alineación)

---

## Puntos clave para recordar

- RLHF tiene 3 etapas: SFT en demos → RM en comparaciones → PPO con KL penalty
- La penalización KL previene el reward hacking: el modelo optimizado no debe alejarse demasiado del modelo SFT
- DPO elimina el reward model explícito derivando el óptimo analíticamente e incorporándolo como loss directa
- En DPO, $\beta$ controla la fuerza de la penalización KL (típicamente 0.1-0.5)
- DPO necesita un "modelo de referencia" congelado ($\pi_{\text{ref}}$) que suele ser el modelo SFT
- Self-RAG entrena tokens especiales de reflexión; el modelo aprende cuándo recuperar y si el contexto es útil
- Constitutional AI usa el propio LLM para criticar y revisar respuestas según principios escritos, reduciendo anotación humana
