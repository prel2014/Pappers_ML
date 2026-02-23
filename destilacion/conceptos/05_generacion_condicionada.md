# Generación Condicionada

> Papers clave: [CFG](../../difusion/fundamentos/2022_classifier_free_guidance.pdf) · [DALL-E 2](../../difusion/variantes/2022_dalle2.pdf) · [ControlNet](../../difusion/finetuning/2023_controlnet.pdf) · [IP-Adapter](../../difusion/finetuning/2023_ip_adapter.pdf) · [InstructPix2Pix](../../difusion/finetuning/2023_instructpix2pix.pdf) · [LLaVA](../../multimodal/2023_llava.pdf)

---

## ¿Qué es?

La **generación condicionada** es la capacidad de un modelo generativo de producir outputs dirigidos por una señal adicional — texto, imagen, clase, pose, profundidad u otro modal. Sin condicionamiento, un modelo genera muestras del prior no estructurado; con condicionamiento, la generación se orienta hacia un subespacio específico de la distribución de datos.

El condicionamiento es el núcleo de la usabilidad de los modelos generativos: es lo que convierte DDPM (generador de ruido gaussiano) en Stable Diffusion (generador text-to-image de alta calidad), y lo que convierte un LLM autoregresivo en un asistente útil. Los mecanismos varían desde inyección directa de embeddings hasta cross-attention con el condicionamiento, pasando por adaptadores externos (ControlNet, IP-Adapter) que permiten nuevas formas de control sin reentrenar el modelo base.

Una distinción crucial: el condicionamiento puede ser **clasificador-guiado** (requiere un clasificador externo) o **libre de clasificador** (classifier-free guidance, CFG), que es el estándar en modelos modernos por su simplicidad y calidad.

---

## Mecanismo central

**Cross-attention con texto (U-Net/DiT condicionados):**

$$\text{Attention}(Q, K_{\text{text}}, V_{\text{text}}) = \text{softmax}\!\left(\frac{Q K_{\text{text}}^\top}{\sqrt{d}}\right) V_{\text{text}}$$

La feature map de imagen se proyecta como query; los tokens de texto como keys y values. Cada posición espacial puede "preguntar" qué texto es relevante para ella.

**Classifier-Free Guidance (CFG):**

$$\tilde{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \varnothing) + w \cdot \left(\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \varnothing)\right)$$

donde $c$ es la condición (texto), $\varnothing$ es la condición nula (CFG dropout durante entrenamiento), y $w$ es la escala de guidance (típicamente 7-12). Durante entrenamiento, el 10-20% de los ejemplos se entrena sin condición para aprender $\epsilon_\theta(x_t, \varnothing)$.

**Classifier guidance (obsoleto, histórico):**

$$\tilde{\epsilon} = \epsilon_\theta(x_t, c) - \sigma_t \nabla_{x_t} \log p_\phi(c \mid x_t)$$

Requiere un clasificador $p_\phi$ entrenado en imágenes ruidosas; más costoso y frágil que CFG.

**ControlNet — condicionamiento espacial:**

$$y = \mathcal{F}(x; \Theta) + \mathcal{Z}(\mathcal{F}(x + \mathcal{Z}(c_f; \Theta_{z1}); \Theta_c); \Theta_{z2})$$

Copia los pesos del encoder de U-Net en un módulo entrenado por separado. Zero convolutions ($\mathcal{Z}$) inicializadas en cero garantizan que al inicio el output es idéntico al modelo base.

**IP-Adapter — condicionamiento por imagen:**

Los embeddings de imagen (CLIP ViT) se inyectan mediante una capa de cross-attention desacoplada paralela al cross-attention original de texto, sin modificar los pesos del modelo base.

---

## Evolución cronológica

| Año | Técnica | Paper | Mecanismo |
|-----|---------|-------|-----------|
| 2021 | Classifier guidance | ADM (Diffusion Beat GANs) | Gradiente de clasificador externo |
| 2021 | GLIDE | GLIDE | Cross-attention texto en U-Net |
| 2022 | CFG | Ho & Salimans | Guidance sin clasificador; un solo modelo |
| 2022 | DALL-E 2 | Ramesh et al. | CLIP image embeddings como condición |
| 2022 | Imagen | Saharia et al. | T5-XXL text encoder para mejor semántica |
| 2022 | SDEdit | Meng et al. | Edición por adición de ruido parcial y denoising |
| 2022 | Textual Inversion | Gal et al. | Nueva condición aprendida como token de texto |
| 2022 | DreamBooth | Ruiz et al. | Fine-tuning con prior preservation loss |
| 2023 | ControlNet | Zhang et al. | Control espacial (pose, depth, canny) |
| 2023 | IP-Adapter | Ye et al. | Condición de imagen con cross-attention desacoplado |
| 2023 | InstructPix2Pix | Brooks et al. | Edición por instrucción en lenguaje natural |

---

## Variantes y comparativa

| Método | Señal de control | Modifica pesos base | Casos de uso |
|--------|-----------------|---------------------|--------------|
| CFG (texto) | Prompt de texto | No (inference only) | T2I estándar |
| ControlNet | Imagen (pose, depth, canny) | No (módulo paralelo) | Control estructural |
| IP-Adapter | Imagen de referencia | No (cross-attn desacoplado) | Consistencia visual |
| DreamBooth | Imágenes de sujeto específico | Sí (fine-tune completo) | Personalización |
| Textual Inversion | Imágenes de concepto | No (solo el embedding) | Concepto nuevo en texto |
| InstructPix2Pix | Instrucción texto + imagen | Sí (dos CFG stacked) | Edición by instruction |
| Prefix tuning | Tokens prefijo aprendidos | No (solo prefijo) | LLMs: task conditioning |
| LoRA | Adaptadores de rango bajo | No (modifica proyections) | LLMs + difusión |

---

## Conexiones con otros conceptos

→ Ver también: [03 — Representaciones](03_representaciones.md) (CLIP embeddings como condición)
→ Ver también: [07 — Fine-tuning eficiente](../tecnicas/07_fine_tuning_eficiente.md) (DreamBooth, ControlNet, IP-Adapter)
→ Ver también: [13 — Modelos difusión](../arquitecturas/13_modelos_difusion.md) (CFG es parte del pipeline de difusión)
→ Ver también: [17 — Visión-Lenguaje](../dominios/17_vision_lenguaje.md) (LLaVA: instrucción condiciona respuesta visual)
→ Ver también: [11 — RLHF](../tecnicas/11_rlhf_y_alineacion.md) (instrucción como condicionamiento en LLMs)

---

## Puntos clave para recordar

- CFG interpola entre la generación condicionada e incondicionada; escala $w$ controla el trade-off calidad/diversidad
- CFG no requiere clasificador externo: durante el entrenamiento, el 10-20% de los ejemplos se entrena sin condición
- ControlNet copia los pesos del encoder de U-Net y agrega zero convolutions; así empieza idéntico al modelo base
- IP-Adapter añade cross-attention para imagen en paralelo al de texto, sin tocar los pesos originales
- DreamBooth usa una "rare token" (<sks>) y prior preservation loss para no olvidar el dominio general
- El cross-attention es el mecanismo central de casi todo condicionamiento en difusión y LLMs multimodales
- $w \approx 7.5$ es el valor típico de CFG; valores más altos dan más fidelidad al texto pero menos diversidad
