# Fine-Tuning Eficiente: LoRA, QLoRA, Adapters y DreamBooth

> Papers clave: [LoRA](../../entrenamiento/2021_lora.pdf) · [QLoRA](../../entrenamiento/2023_qlora.pdf) · [DreamBooth](../../difusion/finetuning/2022_dreambooth.pdf) · [Textual Inversion](../../difusion/finetuning/2022_textual_inversion.pdf) · [ControlNet](../../difusion/finetuning/2023_controlnet.pdf) · [IP-Adapter](../../difusion/finetuning/2023_ip_adapter.pdf)

---

## ¿Qué es?

El **fine-tuning eficiente** (PEFT — Parameter-Efficient Fine-Tuning) aborda el problema de adaptar modelos preentrenados masivos a tareas específicas sin reentrenar todos sus parámetros. El fine-tuning completo de un LLM de 70B requeriría ~140 GB de VRAM solo para los gradientes; los métodos PEFT lo reducen a <10 GB sin pérdida significativa de calidad.

La intuición central de LoRA es que las actualizaciones de pesos durante el fine-tuning tienen **rango intrínseco bajo**: el cambio de pesos $\Delta W$ puede aproximarse como el producto de dos matrices pequeñas $\Delta W = BA$ con $r \ll \min(d_{\text{in}}, d_{\text{out}})$. En la práctica, $r = 8$ o $r = 16$ captura la mayoría de la información necesaria para adaptar un LLM a una nueva tarea.

En difusión, los métodos de fine-tuning eficiente toman otra forma: DreamBooth y Textual Inversion personalizan el modelo para conceptos específicos (una mascota, un estilo artístico) con solo 3-25 imágenes, sin necesitar grandes datasets. ControlNet y IP-Adapter añaden nuevas modalidades de control (pose, profundidad, imagen de referencia) mediante módulos adicionales que no modifican el modelo base.

---

## Mecanismo central

**LoRA (Low-Rank Adaptation):**

Para una capa de proyección $W_0 \in \mathbb{R}^{d \times k}$, en vez de actualizar $W_0$:

$$h = (W_0 + \Delta W)x = W_0 x + BA x$$

donde $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, $r \ll \min(d, k)$.

$A$ se inicializa con distribución gaussiana, $B$ con ceros (para que $\Delta W = 0$ al inicio).

Número de parámetros trainables: $r(d + k)$ en vez de $dk$. Para $d=k=4096$, $r=8$: $8 \times 8192 = 65536$ vs $16M$ parámetros.

El escalado por $\alpha/r$ permite un learning rate consistente independientemente de $r$.

**QLoRA — Quantized LoRA:**

$$W_0^{\text{NF4}} = \text{quantize}_{\text{NF4}}(W_0), \quad \text{trainable: } A, B \text{ en bfloat16}$$

QLoRA cuantiza el modelo base a 4 bits (NF4 — Normal Float 4, adaptado a distribución gaussiana de pesos) y aplica LoRA sobre los adaptadores. Permite fine-tuning de un modelo de 65B en un GPU de 48 GB.

**DreamBooth — prior preservation:**

$$\mathcal{L} = \mathbb{E}\left[\|\epsilon - \epsilon_\theta(x_t^{\text{subj}}, c_{\text{subj}})\|^2\right] + \lambda \cdot \mathbb{E}\left[\|\epsilon - \epsilon_\theta(x_t^{\text{prior}}, c_{\text{prior}})\|^2\right]$$

El primer término es la loss en las imágenes del sujeto; el segundo (prior preservation) entrena también con imágenes generadas por el modelo original para no olvidar el dominio general.

**Textual Inversion:**

En vez de fine-tunear el modelo, aprende un nuevo token embedding $v^*$:

$$v^* = \arg\min_{v} \mathbb{E}_{z, c, \epsilon, t}\left[\|\epsilon - \epsilon_\theta(z_t, [c; v])\|^2\right]$$

Solo $v^*$ (un vector de ~768 dims) es trainable. Los pesos del modelo permanecen congelados.

---

## Evolución cronológica

| Año | Método | Parámetros entrenados | Dataset necesario |
|-----|--------|----------------------|-------------------|
| 2021 | LoRA | ~0.1-1% (rank-r matrices) | Cientos de ejemplos |
| 2022 | Textual Inversion | ~0.001% (1 embedding) | 3-5 imágenes |
| 2022 | DreamBooth | ~100% con prior loss | 3-25 imágenes |
| 2023 | ControlNet | ~50% (encoder copy) | Miles de pares |
| 2023 | IP-Adapter | ~22M (cross-attn nuevo) | Miles de pares imagen |
| 2023 | QLoRA | ~0.1-1% (sobre NF4) | Igual que LoRA |
| 2023 | LyCORIS | ~0.1-5% (variantes LoRA) | Igual que LoRA |

---

## Variantes y comparativa

| Método | VRAM aprox | Calidad | Velocidad adaptación |
|--------|-----------|---------|---------------------|
| Full fine-tune | muy alta | máxima | lenta |
| LoRA (r=8) | baja | ~full | rápida |
| QLoRA (4-bit + LoRA) | mínima | ≈LoRA | rápida |
| Textual Inversion | mínima (1 vec) | limitada | muy rápida |
| DreamBooth | alta (full tune) | alta para sujeto | lenta |
| ControlNet | media (encoder copy) | excelente control | media |
| IP-Adapter | baja (sólo cross-attn) | buena consistencia | rápida |

---

## Conexiones con otros conceptos

→ Ver también: [05 — Generación condicionada](../conceptos/05_generacion_condicionada.md) (ControlNet, IP-Adapter como condicionamiento)
→ Ver también: [08 — Cuantización](08_cuantizacion.md) (QLoRA combina ambas técnicas)
→ Ver también: [11 — RLHF](11_rlhf_y_alineacion.md) (LoRA se usa en el SFT step de RLHF)
→ Ver también: [12 — Transformer y variantes](../arquitecturas/12_transformer_y_variantes.md) (LoRA en LLMs)

---

## Puntos clave para recordar

- LoRA descompone $\Delta W = BA$ con rango $r$ bajo; solo entrena $A$ y $B$, congelando $W_0$
- $r=8$ es suficiente para la mayoría de tareas; $r=64$ para tareas muy específicas o complejas
- QLoRA cuantiza $W_0$ a NF4 (4-bit), reduciendo memoria 4x, y entrena los adaptadores LoRA en bfloat16
- La cuantización NF4 es óptima para distribuciones gaussianas de pesos — que es exactamente lo que tienen los modelos preentrenados
- Textual Inversion aprende solo 1 vector; DreamBooth fine-tunea todo el modelo + prior preservation loss
- ControlNet copia el encoder completo de U-Net y lo conecta con zero convolutions (inicializadas en 0 → sin efecto al inicio)
- IP-Adapter añade un cross-attention paralelo para imágenes; los pesos del modelo base no se modifican
