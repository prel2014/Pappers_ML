# SSMs y Mamba: Modelos de Estado para Secuencias Largas

> Papers clave: [Mamba](../../arquitecturas/2023_mamba.pdf) · [Mamba-2](../../arquitecturas/2024_mamba2.pdf)

---

## ¿Qué es?

Los **State Space Models (SSMs)** son una alternativa al mecanismo de atención para modelado de secuencias. Mientras la atención tiene complejidad $O(n^2)$ en longitud de secuencia (cuadrática), los SSMs son $O(n)$ — lineales — en teoría, lo que los hace atractivos para secuencias muy largas (genómica, audio crudo, contextos de millones de tokens).

Los SSMs se basan en la idea de un **sistema dinámico lineal**: hay un estado oculto $h$ que se actualiza continuamente conforme llega información nueva, y se comprime para producir el output. En la práctica, la formulación discreta de estos sistemas puede computarse eficientemente con convoluciones (en entrenamiento) o como recurrencias (en inferencia).

**Mamba** (Gu & Dao, 2023) es el SSM que demostró por primera vez rendimiento competitivo con Transformers en tareas de lenguaje a escala. El avance clave es hacer los parámetros del SSM **dependientes de la entrada** (selective SSM), rompiendo la limitación de los SSMs clásicos que no podían ignorar información irrelevante. **Mamba-2** (2024) mostró la conexión matemática formal entre SSMs y atención, unificando ambos frameworks.

---

## Mecanismo central

**Sistema dinámico lineal continuo:**

$$h'(t) = Ah(t) + Bx(t)$$
$$y(t) = Ch(t) + Dx(t)$$

donde $h(t) \in \mathbb{R}^N$ es el estado, $x(t) \in \mathbb{R}$ es la entrada, $A \in \mathbb{R}^{N \times N}$, $B \in \mathbb{R}^{N \times 1}$, $C \in \mathbb{R}^{1 \times N}$.

**Discretización (ZOH):**

$$\bar{A} = e^{\Delta A}, \quad \bar{B} = (\Delta A)^{-1}(e^{\Delta A} - I) \cdot \Delta B$$

$$h_t = \bar{A} h_{t-1} + \bar{B} x_t, \quad y_t = C h_t$$

donde $\Delta$ es el parámetro de discretización (tamaño del paso temporal).

**HiPPO — inicialización de A:**

La matrix $A$ se inicializa con la matriz HiPPO (High-order Polynomial Projection Operators) para memorización óptima de historias:

$$A_{nk} = -\begin{cases} (2n+1)^{1/2}(2k+1)^{1/2} & n > k \\ n+1 & n = k \\ 0 & n < k \end{cases}$$

Esta inicialización permite que el estado $h_t$ mantenga proyecciones de la historia completa de la entrada.

**Computación eficiente — SSM global:**

En entrenamiento, los SSMs pueden computarse como convoluciones 1D sobre la secuencia:

$$y = \bar{K} * x, \quad \bar{K} = (C\bar{B}, C\bar{A}\bar{B}, C\bar{A}^2\bar{B}, \ldots)$$

usando FFT: $O(n \log n)$. En inferencia, se usa la recurrencia: $O(n \cdot N)$ donde $N$ es la dimensión del estado.

**Selective SSM (Mamba):**

El avance crítico de Mamba: hacer $B$, $C$, y $\Delta$ dependientes de la entrada:

$$B_t = \text{Linear}_B(x_t), \quad C_t = \text{Linear}_C(x_t), \quad \Delta_t = \text{softplus}(\text{Linear}_\Delta(x_t))$$

Esto permite al modelo "seleccionar" qué información retener en el estado y qué ignorar — capacidad fundamental que los SSMs clásicos (fijos) no tenían.

**Hardware-aware scan (Mamba):**

El scan selectivo no puede computarse como convolución (porque los parámetros cambian por paso). Mamba implementa un kernel CUDA personalizado que procesa la recurrencia en bloques para aprovechar la SRAM (análogo a Flash Attention).

**Mamba-2 — conexión con atención:**

Mamba-2 muestra que los SSMs selectivos son un caso especial de **Structured State Space Duality (SSD)**:

$$Y = (L \odot CB^\top) X$$

donde $L$ es una matriz de mascara semicausal. Esto unifica SSMs y atención: la atención es un SSM con $A$ degenerado, y el SSM es una atención con estructura de bajo rango.

---

## Evolución cronológica

| Año | Modelo | Innovación |
|-----|--------|------------|
| 2021 | S4 (Gu et al.) | Primer SSM eficiente con HiPPO; rendimiento en audio largo |
| 2022 | H3 | SSM híbrido con atención local; mejor en lenguaje |
| 2022 | Hyena | Convoluciones implícitas como alternativa a atención |
| 2023 | Mamba | SSM selectivo; hardware-aware scan; competitivo con Transformer |
| 2024 | Mamba-2 | Dualidad SSM-atención; más rápido, más escalable |
| 2024 | Jamba | Híbrido Mamba+Transformer; equilibrio eficiencia/calidad |

---

## Variantes y comparativa

| Aspecto | Transformer | Mamba (SSM) | Híbrido |
|---------|-------------|-------------|---------|
| Complejidad entrenamiento | $O(n^2 d)$ | $O(n \cdot dN)$ | Variable |
| Complejidad inferencia | $O(n \cdot d)$ per step | $O(dN)$ per step | Variable |
| KV-cache | Crece con $n$ | Estado fijo ($O(dN)$) | Mixto |
| Recall (copiar información) | Excelente | Limitado | Bueno |
| Contextos muy largos | Caro ($O(n^2)$) | Eficiente ($O(n)$) | Variable |
| Madurez / ecosistema | Muy maduro | Emergente | Emergente |

---

## Conexiones con otros conceptos

→ Ver también: [01 — Atención](../conceptos/01_atencion_transformers.md) (Mamba-2 muestra que SSM y atención son duales)
→ Ver también: [06 — Scaling](../conceptos/06_scaling_emergencia.md) (Mamba escala linealmente con longitud)
→ Ver también: [12 — Transformer y variantes](12_transformer_y_variantes.md) (Mamba como alternativa al Transformer)

---

## Puntos clave para recordar

- SSMs clásicos son lineales en longitud de secuencia ($O(n)$) pero tienen parámetros fijos que no pueden ignorar información
- Mamba hace los parámetros $B$, $C$, $\Delta$ dependientes de la entrada — "selecciona" qué retener en el estado
- En entrenamiento: SSMs se computan como convoluciones con FFT ($O(n \log n)$); en inferencia: recurrencia $O(1)$ por paso
- La inicialización HiPPO de $A$ permite retener proyecciones de la historia completa en el estado $h$
- Mamba-2 muestra la dualidad matemática con atención: SSD unifica ambos frameworks
- Para secuencias cortas: Transformer suele ser mejor; para secuencias muy largas ($n > 100K$): Mamba es más eficiente
- El estado de Mamba tiene tamaño fijo $dN$ independientemente de la longitud — el KV-cache del Transformer crece con $n$
