# Generación Visual: Video Diffusion, 3D y JEPA Visual

> Papers clave: [Video Diffusion](../../difusion/video/2022_video_diffusion.pdf) · [Make-A-Video](../../difusion/video/2022_make_a_video.pdf) · [Imagen Video](../../difusion/video/2022_imagen_video.pdf) · [SVD](../../difusion/video/2023_svd.pdf) · [Video LDM](../../difusion/video/2023_video_ldm.pdf) · [CogVideoX](../../difusion/video/2024_cogvideox.pdf) · [DreamFusion](../../difusion/multimodal/2022_dreamfusion.pdf) · [Zero-1-to-3](../../difusion/multimodal/2023_zero123.pdf) · [V-JEPA 2](../../jepa/core/2025_vjepa2.pdf)

---

## ¿Qué es?

La **generación visual** extiende los modelos de difusión e imagen más allá de las imágenes estáticas hacia dominios más ricos: video (secuencias temporales coherentes), objetos 3D (geometría y apariencia desde múltiples vistas), y predicción activa del mundo (V-JEPA 2).

El **video** introduce el desafío de la coherencia temporal: los frames consecutivos deben ser visualmente consistentes (sin parpadeo, sin objetos que aparezcan y desaparezcan), mientras que el movimiento global y los detalles locales deben mantenerse. La solución dominante es extender la atención espacial de las U-Nets a la dimensión temporal (Temporal U-Nets) o usar modelos Transformer que tratan frames como tokens adicionales.

La generación **3D** plantea un problema diferente: sintetizar un objeto 3D completo a partir de una descripción de texto o una imagen 2D. DreamFusion (2022) demostró que una difusión 2D preentrenada puede servir como prior para optimizar representaciones NeRF mediante Score Distillation Sampling (SDS). Zero-1-to-3 mostró que se puede entrenar un modelo de difusión condicionado en el ángulo de cámara para generar vistas novedosas.

---

## Mecanismo central

**Temporal U-Net (Video Diffusion Models):**

Extiende los módulos de atención de U-Net para incluir atención temporal:

$$h_{B,T,H,W} \to \text{reshape} \to h_{B \cdot H \cdot W, T, C} \to \text{Temporal Attention} \to \text{reshape} \to h_{B,T,H,W}$$

Los pesos de la temporal attention se inicializan desde la spatial attention (para aprovechar el preentrenamiento de imagen), y se añade el eje temporal como dimensión adicional de secuencia.

**Make-A-Video — extending T2I to T2V without T2V data:**

Make-A-Video parte de un modelo T2I (DALL-E 2 based) y lo extiende a video sin necesitar pares texto-video:
1. Aprende movimiento de datos de video sin texto (VLP — Video Language Pretraining separado)
2. Combina los pesos en un modelo que entiende texto (del T2I) y movimiento (del video no anotado)

$$p_{\text{video}}(v | \text{text}) \approx p_{\text{image}}(I | \text{text}) \cdot p_{\text{motion}}(v | I)$$

**Imagen Video — cascaded T2V:**

Sistema en cascada: 40 frames base (16fps) → spatial super-resolution → temporal super-resolution → frames adicionales interpolados. Cada etapa usa una U-Net de difusión condicionada.

**SVD (Stable Video Diffusion):**

Adapta Stable Diffusion 2.1 para generar video de imagen a video (I2V):
1. Encoder CLIP para la imagen de condicionamiento
2. Fine-tuning en 3 fases: image pretraining → video pretraining (24fps, 25 frames) → high-quality video fine-tuning
3. Condicionamiento por motion bucket (cuánto movimiento) y fps

**CogVideoX — Expert Transformer para video:**

Usa un DiT con procesamiento temporal explícito:
- Parche 3D: aplica patches sobre el espacio **y** el tiempo simultáneamente
- Expert Transformer: diferentes cabezas de atención para diferentes intervalos temporales
- 3D rotary position embeddings para coherencia espacio-temporal

**DreamFusion — Text-to-3D via SDS:**

$$\theta^* = \arg\min_\theta \mathbb{E}_{t, \epsilon, c}\left[w(t) \|\epsilon_\phi(z_t; y, t) - \epsilon\|^2\right] \quad \text{donde} \quad z = \text{render}(\theta, c)$$

$\theta$ son los parámetros del NeRF, $c$ es la pose de cámara, $\text{render}$ es el renderizado diferenciable. El gradiente de la difusión 2D congelada guía la optimización del NeRF 3D.

**Zero-1-to-3 — Novel View Synthesis:**

Fine-tunes Stable Diffusion para condicionarse en la imagen de entrada + cambio de pose relativo $(\Delta\text{elevation}, \Delta\text{azimuth}, \Delta\text{distance})$:

$$p(I_{\text{novel view}} | I_{\text{input}}, \Delta R, \Delta T)$$

---

## Evolución cronológica

### Video Diffusion

| Año | Modelo | Resolución | Duración | Innovación |
|-----|--------|-----------|---------|------------|
| 2022 | Video Diffusion Models | 64×64 | 16 frames | Primer modelo de difusión para video |
| 2022 | Make-A-Video | 256×256 | 16 frames | T2V sin datos texto-video |
| 2022 | Imagen Video | 128×128 | 128 frames | Cascada temporal; mayor coherencia |
| 2023 | Video LDM | 512×320 | 1-2 seg | LDM extendido a video; latente temporal |
| 2023 | SVD | 1024×576 | 25 frames | I2V estable; motion bucket |
| 2024 | CogVideoX | 720×480 | 6 seg | Expert Transformer; 3D RoPE |

### 3D Generativo

| Año | Modelo | Método | Calidad |
|-----|--------|--------|---------|
| 2022 | DreamFusion | SDS + NeRF | Media (saturado, falta detalle) |
| 2023 | ProlificDreamer (VSD) | Variational SDS | Alta (más detallado) |
| 2023 | Zero-1-to-3 | Difusión condicionada en pose | Buena para novelas vistas |
| 2023 | MVDiffusion | Multi-view consistente | Muy buena |

---

## Variantes y comparativa

### Video

| Aspecto | Video Diffusion | Make-A-Video | SVD | CogVideoX |
|---------|----------------|-------------|-----|-----------|
| Condicionamiento | Texto | Texto | Imagen | Texto |
| Coherencia temporal | Media | Buena | Muy buena | Excelente |
| Resolución | Baja | Media | Alta | Alta |
| Open-source | Sí | No | Sí | Sí |

### 3D

| Método | Datos necesarios | Geometría | Detalle textural |
|--------|-----------------|-----------|-----------------|
| DreamFusion | Solo difusión 2D | Media | Media |
| VSD | Solo difusión 2D | Buena | Alta |
| Zero-1-to-3 | Vistas múltiples | Buena | Buena |
| 3D-JEPA | Nube de puntos | Buena | — |

---

## Conexiones con otros conceptos

→ Ver también: [04 — Objetivos](../conceptos/04_objetivos_entrenamiento.md) (SDS para 3D)
→ Ver también: [05 — Generación condicionada](../conceptos/05_generacion_condicionada.md) (SVD condicionado en imagen)
→ Ver también: [13 — Modelos difusión](../arquitecturas/13_modelos_difusion.md) (base de todos los modelos de video y 3D)
→ Ver también: [14 — JEPA](../arquitecturas/14_jepa_world_models.md) (V-JEPA 2: comprensión y predicción de video)
→ Ver también: [09 — Destilación](../tecnicas/09_destilacion_conocimiento.md) (Progressive Distillation para video rápido)

---

## Puntos clave para recordar

- Video diffusion extiende U-Nets/DiTs con un eje temporal: atención espacio-temporal sobre frames
- Make-A-Video no usa datos texto-video: combina T2I (comprende texto) con movimiento aprendido de video sin etiquetas
- SVD es un modelo image-to-video (I2V): dado un frame inicial, genera el video subsiguiente
- DreamFusion usa SDS para optimizar un NeRF 3D guiado por difusión 2D; no necesita datos 3D
- El problema de DreamFusion ("Janus problem"): la cara aparece en múltiples lados del objeto; VSD lo mejora
- Zero-1-to-3 aprende a sintetizar vistas novedosas condicionando en la imagen + cambio de pose relativo
- V-JEPA 2 no genera video pero comprende y predice trayectorias en el espacio latente → planning físico
- 3D RoPE en CogVideoX extiende el positional encoding rotacional a 3 dimensiones: alto, ancho y tiempo
