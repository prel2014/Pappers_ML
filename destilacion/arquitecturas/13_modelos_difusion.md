# Modelos de Difusión: DDPM → LDM → DiT → SD3

> Papers clave: [DDPM](../../difusion/fundamentos/2020_ddpm.pdf) · [DDIM](../../difusion/fundamentos/2020_ddim.pdf) · [Score-SDE](../../difusion/fundamentos/2021_score_sde.pdf) · [ADM](../../difusion/fundamentos/2021_diffusion_beat_gans.pdf) · [LDM/SD](../../difusion/variantes/2022_ldm_stable_diffusion.pdf) · [DiT](../../difusion/arquitecturas/2023_dit.pdf) · [Flow Matching](../../difusion/variantes/2022_flow_matching.pdf) · [Rectified Flow](../../difusion/variantes/2022_rectified_flow.pdf) · [SD3/MM-DiT](../../difusion/arquitecturas/2024_sd3_mmdit.pdf)

---

## ¿Qué es?

Los **modelos de difusión** son modelos generativos que aprenden a revertir un proceso de adición progresiva de ruido gaussiano. Dado que añadir ruido gradualmente destruye la estructura de los datos de manera controlada, el modelo aprende a reconstruir esa estructura invirtiendo el proceso paso a paso.

La secuencia histórica es clara: Sohl-Dickstein (2015) propuso la idea teórica; DDPM (Ho et al., 2020) demostró calidad fotorrealista con una simplificación del objetivo; DDIM (Song et al., 2020) convirtió el proceso en una ODE determinista; ADM (Dhariwal et al., 2021) superó a las GANs; LDM/Stable Diffusion (Rombach et al., 2022) llevó la difusión al espacio latente, haciendo factible la generación en alta resolución; DiT (Peebles et al., 2023) reemplazó la U-Net con un Transformer puro; Flow Matching y Rectified Flow simplificaron el proceso teórico; y SD3/MM-DiT (2024) combinó todo esto para el estado del arte actual.

---

## Mecanismo central

**Proceso forward (adición de ruido):**

$$q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) I)$$

$$x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

donde $\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s$ y $\alpha_t = 1 - \beta_t$ con noise schedule $\beta_t$.

**Proceso reverse (denoising):**

$$p_\theta(x_{t-1} | x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x_t, t), \Sigma_\theta(x_t, t))$$

**Objetivo de entrenamiento (simplificado DDPM):**

$$\mathcal{L}_{\text{simple}} = \mathbb{E}_{t, x_0, \epsilon} \left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right]$$

Predecir $\epsilon$ (el ruido) es equivalente a predecir $x_0$ (la imagen limpia) dado que $x_0 = (x_t - \sqrt{1-\bar\alpha_t}\epsilon)/\sqrt{\bar\alpha_t}$.

**Score-SDE — formulación continua:**

$$dx = f(x, t)dt + g(t)dw, \quad \text{(forward SDE)}$$

$$dx = \left[f(x, t) - g(t)^2 \nabla_x \log p_t(x)\right] dt + g(t)d\bar{w}, \quad \text{(reverse SDE)}$$

El score $\nabla_x \log p_t(x) \approx -\epsilon_\theta(x_t, t) / \sqrt{1-\bar\alpha_t}$.

**Latent Diffusion Model (LDM/SD):**

$$z = \mathcal{E}(x), \quad \hat{x} = \mathcal{D}(z)$$
$$\mathcal{L}_{\text{LDM}} = \mathbb{E}_{z, \epsilon, t}\left[\|\epsilon - \epsilon_\theta(z_t, t, \tau_\theta(y))\|^2\right]$$

El encoder $\mathcal{E}$ comprime la imagen 8× o 4× antes de difundir. Reducción de 64× en dimensionalidad.

**DiT — Transformer como denoiser:**

Reemplaza la U-Net con bloques Transformer. Condicionamiento temporal y de clase/texto via **AdaLN-Zero**:

$$h = \text{LayerNorm}(x) \cdot (1 + \text{scale}_t) + \text{shift}_t$$

donde scale y shift son predichos desde el embedding de $t$ y clase $c$.

**Flow Matching:**

En vez de ruido gaussiano progresivo, define trayectorias rectas entre la distribución de datos y la gaussiana:

$$x_t = (1-t)x_0 + t\epsilon, \quad t \in [0,1]$$

El objetivo es aprender el campo vectorial $v_\theta(x_t, t) = \epsilon - x_0$ (la velocidad de la trayectoria).

**Rectified Flow:** Idéntico a flow matching pero con la observación de que las trayectorias rectas son óptimas en transport.

---

## Evolución cronológica

| Año | Modelo | Contribución clave |
|-----|--------|--------------------|
| 2015 | Sohl-Dickstein et al. | Idea teórica: difusión como proceso de destrucción/reconstrucción |
| 2019 | NCSN | Score matching para generación; Langevin sampling |
| 2020 | DDPM | Simplificación: predecir $\epsilon$; calidad fotorrealista |
| 2020 | DDIM | ODE determinista; 50 pasos ≈ 1000 DDPM |
| 2021 | Score-SDE | Framework unificado SDE; predicción de $x_0$, $\epsilon$ o $v$ |
| 2021 | ADM | Classifier guidance; U-Net mejorada; supera GANs |
| 2021 | Improved DDPM | Variance learning; cosine schedule |
| 2022 | CFG | Guidance sin clasificador; calidad + adherencia al texto |
| 2022 | LDM/Stable Diffusion | Difusión en espacio latente VAE; text-to-image asequible |
| 2022 | Flow Matching | Trayectorias rectas; más fácil de integrar |
| 2022 | Rectified Flow | Formalización del transporte óptimo con flujos rectificados |
| 2023 | DiT | Transformer puro en difusión; escala con Gflops |
| 2023 | SDXL | LDM mejorado; dual text encoder; refinement stage |
| 2023 | Consistency Models | 1-2 pasos; self-consistency en la ODE |
| 2024 | SD3/MM-DiT | Multi-Modal DiT; texto y latente de imagen como tokens iguales |

---

## Variantes y comparativa

| Modelo | Backbone | Espacio | Condicionamiento | Velocidad |
|--------|----------|---------|------------------|-----------|
| DDPM | U-Net | Píxel | Clase | 1000 pasos |
| LDM/SD 1.5 | U-Net | Latente 4×64×64 | CLIP ViT-L/14 | 50 pasos |
| SDXL | U-Net dual | Latente 4×128×128 | CLIP dual | 30-50 pasos |
| DiT-XL/2 | Transformer | Píxel (patchify) | AdaLN clase | 250 pasos |
| SD3/MM-DiT | MM-DiT | Latente 16-ch | T5+CLIP dual | 28 pasos |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](../conceptos/01_atencion_transformers.md) (DiT usa Transformer puro)
→ Ver también: [04 — Objetivos](../conceptos/04_objetivos_entrenamiento.md) (ELBO, score matching, flow matching)
→ Ver también: [05 — Generación condicionada](../conceptos/05_generacion_condicionada.md) (CFG, ControlNet, IP-Adapter)
→ Ver también: [09 — Destilación](../tecnicas/09_destilacion_conocimiento.md) (LCM, Progressive Distillation)
→ Ver también: [10 — Inferencia rápida](../tecnicas/10_inferencia_rapida.md) (DDIM, DPM-Solver)
→ Ver también: [19 — Generación visual](../dominios/19_generacion_visual.md) (video, 3D)

---

## Puntos clave para recordar

- Forward: añade ruido gaussiano gradualmente hasta $x_T \sim \mathcal{N}(0, I)$; reverse: denoising paso a paso
- DDPM simplifica el objetivo a $\|\epsilon - \epsilon_\theta(x_t, t)\|^2$; basta con predecir el ruido añadido
- LDM/SD opera en espacio latente 64× comprimido → feasible para imágenes 512-1024px
- CFG combina generación condicionada e incondicionada; $w \approx 7.5$ es el trade-off calidad/diversidad
- DiT reemplaza U-Net con Transformer; el rendimiento (FID) escala suavemente con Gflops
- Flow Matching define trayectorias rectas $x_t = (1-t)x_0 + t\epsilon$; más fácil de integrar que SDEs
- SD3/MM-DiT trata texto e imagen como tokens iguales en el Transformer; mejor coherencia texto-imagen
