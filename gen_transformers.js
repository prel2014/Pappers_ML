const pptxgen = require("pptxgenjs");

// === PALETTE ===
const COLORS = {
  primary:   "1E2761",
  secondary: "CADCFC",
  accent:    "F96167",
  dark:      "0F1035",
  light:     "F0F4FF",
  white:     "FFFFFF",
  text:      "2D2D2D",
  muted:     "6B7280"
};

const FONTS = { title: "Georgia", body: "Calibri" };

const makeShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12
});

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Transformadores en Deep Learning";

// ─── 1. TITLE SLIDE ────────────────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.dark };

  // Left accent bar
  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: COLORS.accent }
  });

  // Neural-net decorative circles (top-right corner)
  [[8.2,0.3],[9.1,0.7],[8.7,1.2],[9.4,1.5],[8.4,1.6]].forEach(([cx,cy]) => {
    sl.addShape(pres.ShapeType.ellipse, {
      x: cx, y: cy, w: 0.22, h: 0.22,
      fill: { color: COLORS.primary, transparency: 40 },
      line: { color: COLORS.secondary, width: 0.5, transparency: 50 }
    });
  });

  sl.addText("Transformadores\nen Deep Learning", {
    x: 0.6, y: 0.9, w: 8.2, h: 2.2,
    fontSize: 44, fontFace: FONTS.title,
    color: COLORS.white, bold: true,
    align: "left", valign: "middle",
    lineSpacingMultiple: 1.15
  });

  sl.addText("Atención, arquitectura Transformer y sus variantes modernas", {
    x: 0.6, y: 3.2, w: 8.2, h: 0.65,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.secondary, align: "left"
  });

  sl.addText("Vaswani et al., 2017  ·  BERT  ·  GPT  ·  Llama  ·  Mistral", {
    x: 0.6, y: 3.85, w: 8.2, h: 0.4,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.muted, align: "left"
  });

  // Bottom bar
  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 5.1, w: 10, h: 0.525,
    fill: { color: COLORS.primary }
  });

  sl.addNotes("Slide de título. El Transformer (Vaswani et al., 2017) es la arquitectura dominante en IA moderna, usada en LLMs, visión, difusión y modelos multimodales.");
}

// ─── 2. AGENDA ─────────────────────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 1.05,
    fill: { color: COLORS.primary }
  });
  sl.addText("Contenido de la presentación", {
    x: 0.5, y: 0.15, w: 9, h: 0.75,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.white, bold: true, align: "left"
  });

  const items = [
    { n: "01", t: "Mecanismo de Atención",         d: "Scaled Dot-Product Attention y Multi-Head Attention" },
    { n: "02", t: "Arquitectura Transformer",       d: "Encoder, Decoder, FFN, Positional Encoding" },
    { n: "03", t: "Evolución cronológica",          d: "De 2017 hasta Llama 3 y Flash Attention 3" },
    { n: "04", t: "Variantes principales",          d: "BERT, GPT, T5, ViT, DiT, Sparse Attention" },
    { n: "05", t: "Optimizaciones modernas",        d: "RoPE, RMSNorm, SwiGLU, GQA, Flash Attention" },
  ];

  items.forEach((it, i) => {
    const y = 1.25 + i * 0.85;

    sl.addShape(pres.ShapeType.ellipse, {
      x: 0.5, y: y + 0.02, w: 0.6, h: 0.6,
      fill: { color: COLORS.primary }
    });
    sl.addText(it.n, {
      x: 0.5, y: y + 0.02, w: 0.6, h: 0.6,
      fontSize: 15, fontFace: FONTS.body,
      color: COLORS.white, align: "center", valign: "middle", bold: true
    });

    sl.addText(it.t, {
      x: 1.35, y: y, w: 8, h: 0.35,
      fontSize: 17, fontFace: FONTS.body,
      color: COLORS.text, bold: true, margin: 0
    });
    sl.addText(it.d, {
      x: 1.35, y: y + 0.35, w: 8, h: 0.28,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.muted, margin: 0
    });
  });

  sl.addNotes("Agenda: cubriremos el mecanismo de atención, la arquitectura completa, la evolución histórica, las variantes principales y las optimizaciones modernas.");
}

// ─── 3. ¿QUÉ ES LA ATENCIÓN? ──────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.white };

  sl.addText("¿Qué es el mecanismo de Atención?", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Left column - concept
  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 1.1, w: 4.3, h: 3.95,
    fill: { color: COLORS.light },
    shadow: makeShadow()
  });
  sl.addText([
    { text: "Problema que resuelve\n", options: { bold: true, color: COLORS.primary, fontSize: 15 } },
    { text: "Las RNNs procesan tokens secuencialmente y sufren de gradiente desvaneciente en secuencias largas. La atención calcula relaciones entre ", options: { color: COLORS.text, fontSize: 13 } },
    { text: "todos los pares en paralelo", options: { bold: true, color: COLORS.accent, fontSize: 13 } },
    { text: ".\n\n", options: { color: COLORS.text, fontSize: 13 } },
    { text: "Intuición\n", options: { bold: true, color: COLORS.primary, fontSize: 15 } },
    { text: "Cada token puede \"preguntar\" (Query) qué otros tokens son relevantes (Key) y tomar sus valores (Value) ponderados.\n\n", options: { color: COLORS.text, fontSize: 13 } },
    { text: "Complejidad\n", options: { bold: true, color: COLORS.primary, fontSize: 15 } },
    { text: "O(n² · d) en tiempo · O(n²) en memoria", options: { color: COLORS.text, fontSize: 13 } },
  ], {
    x: 0.75, y: 1.25, w: 3.8, h: 3.65,
    valign: "top", lineSpacingMultiple: 1.35
  });

  // Right column - QKV diagram
  sl.addShape(pres.ShapeType.rect, {
    x: 5.2, y: 1.1, w: 4.3, h: 3.95,
    fill: { color: COLORS.primary }
  });
  sl.addText("Q · K · V", {
    x: 5.2, y: 1.2, w: 4.3, h: 0.5,
    fontSize: 22, fontFace: FONTS.title,
    color: COLORS.secondary, bold: true, align: "center"
  });

  const qkv = [
    { label: "Q  Query", sub: "¿Qué busca este token?" },
    { label: "K  Key",   sub: "¿Qué ofrece cada token?" },
    { label: "V  Value", sub: "Información que se extrae" },
  ];
  qkv.forEach(({ label, sub }, i) => {
    const y = 1.9 + i * 1.0;
    sl.addShape(pres.ShapeType.rect, {
      x: 5.45, y, w: 3.8, h: 0.75,
      fill: { color: "FFFFFF", transparency: 88 },
      line: { color: COLORS.secondary, width: 0.5 }
    });
    sl.addText(label, {
      x: 5.65, y: y + 0.05, w: 3.4, h: 0.3,
      fontSize: 15, fontFace: FONTS.body,
      color: COLORS.white, bold: true, margin: 0
    });
    sl.addText(sub, {
      x: 5.65, y: y + 0.38, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONTS.body,
      color: COLORS.secondary, margin: 0
    });
  });

  sl.addNotes("La atención permite que cada token de la secuencia se relacione con todos los demás en paralelo. Q (query), K (key) y V (value) son proyecciones lineales del mismo input. El producto Q·Kᵀ mide similitudes y softmax normaliza los pesos.");
}

// ─── 4. SCALED DOT-PRODUCT ATTENTION ─────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addText("Scaled Dot-Product Attention", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Formula box
  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 1.0, w: 9, h: 1.35,
    fill: { color: COLORS.primary },
    shadow: makeShadow()
  });
  sl.addText("Attention(Q, K, V)  =  softmax( QKᵀ / √dₖ ) · V", {
    x: 0.7, y: 1.0, w: 8.6, h: 1.35,
    fontSize: 26, fontFace: "Courier New",
    color: COLORS.white, align: "center", valign: "middle", bold: true
  });

  // Steps
  const steps = [
    { num: "1", t: "Producto QKᵀ",   d: "Mide similitud entre cada par de tokens. Crece con dₖ." },
    { num: "2", t: "Escalado /√dₖ",  d: "Estabiliza gradientes; sin escalar, softmax se satura." },
    { num: "3", t: "Softmax",         d: "Normaliza a distribución de probabilidad → pesos de atención." },
    { num: "4", t: "Producto con V",  d: "Suma ponderada de valores. Resultado: representación contextual." },
  ];

  steps.forEach(({ num, t, d }, i) => {
    const x = 0.5 + i * 2.35;

    sl.addShape(pres.ShapeType.ellipse, {
      x: x + 0.75, y: 2.55, w: 0.65, h: 0.65,
      fill: { color: COLORS.accent }
    });
    sl.addText(num, {
      x: x + 0.75, y: 2.55, w: 0.65, h: 0.65,
      fontSize: 18, fontFace: FONTS.body,
      color: COLORS.white, align: "center", valign: "middle", bold: true
    });

    if (i < 3) {
      sl.addShape(pres.ShapeType.line, {
        x: x + 1.55, y: 2.875, w: 0.65, h: 0,
        line: { color: COLORS.muted, width: 1.5, dashType: "dash" }
      });
    }

    sl.addText(t, {
      x, y: 3.35, w: 2.15, h: 0.4,
      fontSize: 14, fontFace: FONTS.body,
      color: COLORS.text, bold: true, align: "center"
    });
    sl.addText(d, {
      x, y: 3.8, w: 2.15, h: 1.0,
      fontSize: 11, fontFace: FONTS.body,
      color: COLORS.muted, align: "center", valign: "top"
    });
  });

  sl.addNotes("La fórmula central: se calculan productos internos entre queries y keys, se divide por √dₖ para evitar saturación del softmax en dimensiones altas, se aplica softmax para obtener pesos y finalmente se pondera el tensor V.");
}

// ─── 5. MULTI-HEAD ATTENTION ──────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.white };

  sl.addText("Multi-Head Attention (MHA)", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  sl.addText("MHA(Q,K,V) = Concat(head₁, …, headₕ) · Wᴼ       headᵢ = Attention(Q·Wᵢᴼ, K·WᵢK, V·WᵢV)", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 13, fontFace: "Courier New",
    color: COLORS.primary, align: "center",
    fill: { color: COLORS.light }
  });

  // Head cards
  const heads = [
    { h: "Head 1", label: "Relaciones\nsintácticas",    col: COLORS.primary },
    { h: "Head 2", label: "Dependencias\nsemánticas",   col: "2666CF" },
    { h: "Head 3", label: "Posiciones\nrelativas",      col: "0D98BA" },
    { h: "Head h", label: "Patrones\nespecíficos",      col: COLORS.accent },
  ];

  heads.forEach(({ h, label, col }, i) => {
    const x = 0.6 + i * 2.3;
    sl.addShape(pres.ShapeType.rect, {
      x, y: 1.75, w: 2.0, h: 2.2,
      fill: { color: col, transparency: i === 3 ? 0 : 0 },
      shadow: makeShadow()
    });
    sl.addText(h, {
      x, y: 1.75, w: 2.0, h: 0.55,
      fontSize: 16, fontFace: FONTS.body,
      color: COLORS.white, bold: true,
      align: "center", valign: "middle"
    });
    sl.addText(label, {
      x, y: 2.4, w: 2.0, h: 1.3,
      fontSize: 13, fontFace: FONTS.body,
      color: "FFFFFF",
      align: "center", valign: "middle",
      lineSpacingMultiple: 1.3
    });
  });

  // Concat arrow
  sl.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 4.1, w: 8.8, h: 0.55,
    fill: { color: COLORS.secondary }
  });
  sl.addText("Concat → proyección lineal Wᴼ → representación multihead", {
    x: 0.6, y: 4.1, w: 8.8, h: 0.55,
    fontSize: 13, fontFace: FONTS.body,
    color: COLORS.primary, bold: true,
    align: "center", valign: "middle"
  });

  sl.addText("Cada cabeza aprende subespacios de atención distintos. Con h=8 y dₖ=64, el modelo captura relaciones sintácticas, semánticas y posicionales en paralelo.", {
    x: 0.5, y: 4.8, w: 9, h: 0.45,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.muted, align: "center"
  });

  sl.addNotes("Multi-Head Attention aplica h cabezas de atención en paralelo, cada una con sus propias proyecciones WᵢQ, WᵢK, WᵢV. Los resultados se concatenan y proyectan con Wᴼ. Cada cabeza captura diferentes tipos de relaciones.");
}

// ─── 6. POSITIONAL ENCODING ───────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addText("Positional Encoding: Sinusoidal vs RoPE", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Left: Sinusoidal
  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 1.05, w: 4.2, h: 4.15,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 1.05, w: 4.2, h: 0.6,
    fill: { color: COLORS.primary }
  });
  sl.addText("Sinusoidal (2017)", {
    x: 0.5, y: 1.05, w: 4.2, h: 0.6,
    fontSize: 17, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });
  const sinItems = [
    "PE(pos, 2i) = sin(pos / 10000^(2i/d))",
    "PE(pos, 2i+1) = cos(pos / 10000^(2i/d))",
    "─────────────────────",
    "✓ Sin parámetros entrenables",
    "✓ Permite secuencias más largas",
    "✗ No codifica posición relativa",
    "✗ Extrapolación limitada",
    "Usado en: Transformer original, T5",
  ];
  sinItems.forEach((txt, i) => {
    sl.addText(txt, {
      x: 0.75, y: 1.78 + i * 0.38,
      w: 3.7, h: 0.36,
      fontSize: i < 2 ? 10.5 : 13,
      fontFace: i < 2 ? "Courier New" : FONTS.body,
      color: i < 2 ? COLORS.primary : i >= 3 && i <=6 ? COLORS.text : COLORS.muted,
      bold: i >= 3 && i <= 6,
      margin: 0
    });
  });

  // Right: RoPE
  sl.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 1.05, w: 4.2, h: 4.15,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  sl.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 1.05, w: 4.2, h: 0.6,
    fill: { color: COLORS.accent }
  });
  sl.addText("RoPE (2023)", {
    x: 5.3, y: 1.05, w: 4.2, h: 0.6,
    fontSize: 17, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });
  const ropeItems = [
    "qₘᵀ kₙ ∝ función(m − n)",
    "Rotación de Q y K por exp(imθ)",
    "─────────────────────",
    "✓ Codifica posición relativa",
    "✓ Mejor extrapolación de contexto",
    "✓ Compatible con Flash Attention",
    "✗ Ligero overhead por rotaciones",
    "Usado en: Llama, Mistral, Phi",
  ];
  ropeItems.forEach((txt, i) => {
    sl.addText(txt, {
      x: 5.55, y: 1.78 + i * 0.38,
      w: 3.7, h: 0.36,
      fontSize: i < 2 ? 11 : 13,
      fontFace: i < 2 ? "Courier New" : FONTS.body,
      color: i < 2 ? COLORS.accent : i >= 3 && i <=6 ? COLORS.text : COLORS.muted,
      bold: i >= 3 && i <= 6,
      margin: 0
    });
  });

  sl.addNotes("El encoding posicional inyecta información de posición en los embeddings. El sinusoidal original usa funciones seno/coseno fijas. RoPE (Rotary Position Embedding) codifica posiciones relativas multiplicando Q y K por matrices de rotación, lo que mejora la extrapolación a contextos más largos. Es el estándar en modelos modernos como Llama y Mistral.");
}

// ─── 7. ARQUITECTURA TRANSFORMER ──────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.white };

  sl.addText("Arquitectura Transformer: Bloque Pre-LN", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const steps = [
    { n:"1", t:"Input\nEmbedding",  d:"Tokens → vectores de dimensión d" },
    { n:"2", t:"+ Positional\nEncoding", d:"Suma info de posición al embedding" },
    { n:"3", t:"RMSNorm\n+ MHA",   d:"Normalización → Multi-Head Attention" },
    { n:"4", t:"Residual\n+ RMSNorm", d:"x₁ = x + MHA(RMSNorm(x))" },
    { n:"5", t:"FFN\n(SwiGLU)",    d:"Red feed-forward con activación gated" },
  ];

  const stepW = 1.72;
  steps.forEach(({ n, t, d }, i) => {
    const x = 0.5 + i * 1.82;

    sl.addShape(pres.ShapeType.ellipse, {
      x: x + 0.5, y: 1.2, w: 0.72, h: 0.72,
      fill: { color: COLORS.primary }
    });
    sl.addText(n, {
      x: x + 0.5, y: 1.2, w: 0.72, h: 0.72,
      fontSize: 20, fontFace: FONTS.body,
      color: COLORS.white, align: "center", valign: "middle", bold: true
    });

    if (i < steps.length - 1) {
      sl.addShape(pres.ShapeType.line, {
        x: x + 1.32, y: 1.56, w: 0.38, h: 0,
        line: { color: COLORS.secondary, width: 2 }
      });
    }

    sl.addShape(pres.ShapeType.rect, {
      x, y: 2.1, w: stepW, h: 2.6,
      fill: { color: COLORS.light },
      shadow: makeShadow()
    });
    sl.addText(t, {
      x: x + 0.1, y: 2.18, w: stepW - 0.2, h: 0.8,
      fontSize: 14, fontFace: FONTS.body,
      color: COLORS.primary, bold: true,
      align: "center", lineSpacingMultiple: 1.2
    });
    sl.addText(d, {
      x: x + 0.1, y: 3.05, w: stepW - 0.2, h: 1.4,
      fontSize: 11.5, fontFace: FONTS.body,
      color: COLORS.muted, align: "center", valign: "top"
    });
  });

  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 4.85, w: 9, h: 0.5,
    fill: { color: COLORS.secondary }
  });
  sl.addText("Fórmula Pre-LN:   x₁ = x + MHA(RMSNorm(x))     x₂ = x₁ + FFN(RMSNorm(x₁))", {
    x: 0.5, y: 4.85, w: 9, h: 0.5,
    fontSize: 13, fontFace: "Courier New",
    color: COLORS.primary, align: "center", valign: "middle"
  });

  sl.addNotes("El bloque Transformer moderno (Pre-LN) aplica normalización ANTES de la sub-capa (más estable que Post-LN). La conexión residual suma la entrada original con la salida de cada sub-capa. SwiGLU en el FFN tiene una gate multiplicativa que aumenta la capacidad expresiva.");
}

// ─── 8. EVOLUCIÓN CRONOLÓGICA (CHART) ─────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addText("Evolución cronológica de los Transformers", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Bar chart: params in billions per model
  const chartData = [
    {
      name: "Parámetros (B)",
      labels: ["BERT\n(2018)", "GPT-3\n(2020)", "PaLM\n(2022)", "Llama2\n(2023)", "Mistral\n(2023)", "Llama3\n(2024)"],
      values: [0.34, 175, 540, 70, 7, 405]
    }
  ];

  sl.addChart(pres.ChartType.bar, chartData, {
    x: 0.5, y: 1.05, w: 6.3, h: 3.9,
    chartColors: [COLORS.primary],
    chartArea: { fill: { color: COLORS.white }, roundedCorners: true },
    catAxisLabelColor: COLORS.text,
    valAxisLabelColor: COLORS.muted,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: COLORS.white,
    dataLabelFontSize: 11,
    barDir: "col",
    barGrouping: "clustered",
    showLegend: false,
    valAxisTitle: "Parámetros (Billones)",
    showValAxisTitle: true
  });

  // Side panel with key milestones
  sl.addShape(pres.ShapeType.rect, {
    x: 7.1, y: 1.05, w: 2.4, h: 3.9,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  sl.addText("Hitos clave", {
    x: 7.1, y: 1.05, w: 2.4, h: 0.45,
    fontSize: 14, fontFace: FONTS.body,
    color: COLORS.primary, bold: true, align: "center"
  });

  const milestones = [
    "2017 · Self-Attention elimina recurrencia",
    "2018 · BERT: preentrenamiento bidireccional",
    "2020 · GPT-3: few-shot emergente",
    "2022 · Flash Attention: O(n) memoria",
    "2023 · Llama: open-source competitivo",
    "2024 · Llama 3: 15T tokens, 128k vocab",
  ];
  milestones.forEach((m, i) => {
    sl.addText(m, {
      x: 7.2, y: 1.58 + i * 0.54,
      w: 2.2, h: 0.45,
      fontSize: 10.5, fontFace: FONTS.body,
      color: COLORS.text, valign: "top",
      lineSpacingMultiple: 1.2
    });
  });

  sl.addNotes("La escala de parámetros creció dramáticamente: de 340M (BERT) a 540B (PaLM). Llama 3 con 405B y entrenado en 15 billones de tokens es el estado del arte open-source. Flash Attention (2022) cambió la eficiencia de memoria de O(n²) a O(n).");
}

// ─── 9. VARIANTES BERT vs GPT ─────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addText("Variantes principales del Transformer", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // BERT card
  sl.addShape(pres.ShapeType.rect, {
    x: 0.4, y: 1.0, w: 4.3, h: 4.25,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  sl.addShape(pres.ShapeType.rect, {
    x: 0.4, y: 1.0, w: 4.3, h: 0.65,
    fill: { color: COLORS.primary }
  });
  sl.addText("Encoder-only · BERT", {
    x: 0.4, y: 1.0, w: 4.3, h: 0.65,
    fontSize: 17, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });
  [
    ["Atención", "Bidireccional (ve todo el contexto)"],
    ["Pretraining", "MLM + Next Sentence Prediction"],
    ["Fortaleza", "Comprensión, clasificación, NER, QA extractivo"],
    ["Tamaño", "110M – 340M parámetros"],
    ["Variantes", "RoBERTa, DeBERTa, ALBERT"],
  ].forEach(([k, v], i) => {
    sl.addText(k + ":", {
      x: 0.65, y: 1.78 + i * 0.62, w: 1.2, h: 0.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.primary, bold: true, margin: 0
    });
    sl.addText(v, {
      x: 1.88, y: 1.78 + i * 0.62, w: 2.6, h: 0.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.text, margin: 0, valign: "top"
    });
  });

  // GPT card
  sl.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 1.0, w: 4.3, h: 4.25,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  sl.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 1.0, w: 4.3, h: 0.65,
    fill: { color: COLORS.accent }
  });
  sl.addText("Decoder-only · GPT", {
    x: 5.3, y: 1.0, w: 4.3, h: 0.65,
    fontSize: 17, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });
  [
    ["Atención", "Causal / Autoregresiva (solo pasado)"],
    ["Pretraining", "Language Modeling (siguiente token)"],
    ["Fortaleza", "Generación de texto, chat, razonamiento"],
    ["Tamaño", "1B – 405B+ parámetros"],
    ["Variantes", "GPT-3/4, Llama, Mistral, Phi, Falcon"],
  ].forEach(([k, v], i) => {
    sl.addText(k + ":", {
      x: 5.55, y: 1.78 + i * 0.62, w: 1.2, h: 0.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.accent, bold: true, margin: 0
    });
    sl.addText(v, {
      x: 6.78, y: 1.78 + i * 0.62, w: 2.6, h: 0.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.text, margin: 0, valign: "top"
    });
  });

  sl.addNotes("BERT (encoder-only) usa atención bidireccional: cada token ve todo el contexto. Ideal para tareas de comprensión. GPT (decoder-only) usa atención causal: solo mira tokens anteriores. Ideal para generación. T5 combina ambos (encoder-decoder) para tareas seq2seq como traducción.");
}

// ─── 10. MÁS ALLÁ DEL NLP ─────────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.white };

  sl.addText("El Transformer más allá del NLP", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const apps = [
    {
      title: "ViT — Vision Transformer",
      icon: "◉",
      col: COLORS.primary,
      desc: "Divide la imagen en patches de 16×16px. Cada patch = un token. Transformer puro para clasificación visual. Estándar en backbone de modelos multimodales."
    },
    {
      title: "DiT — Diffusion Transformer",
      icon: "⬡",
      col: "0D98BA",
      desc: "Reemplaza la U-Net por bloques Transformer en modelos de difusión. Usa AdaLN para condicionar timestep y clase. Escala mejor con GFlops que U-Net."
    },
    {
      title: "BLIP-2 / Flamingo",
      icon: "⟡",
      col: "2666CF",
      desc: "Cross-Attention conecta modalidades (imagen ↔ texto). Q-Former en BLIP-2 mapea features visuales al espacio del LLM. Base de modelos multimodales modernos."
    },
    {
      title: "I-JEPA / V-JEPA",
      icon: "⬟",
      col: COLORS.accent,
      desc: "ViT como codificador de contexto y objetivo. Predicción en espacio de representaciones (no píxeles). Self-supervised sin datos de texto."
    },
  ];

  apps.forEach(({ title, icon, col, desc }, i) => {
    const col_idx = i % 2;
    const row_idx = Math.floor(i / 2);
    const x = 0.5 + col_idx * 4.75;
    const y = 1.05 + row_idx * 2.2;

    sl.addShape(pres.ShapeType.rect, {
      x, y, w: 4.45, h: 2.0,
      fill: { color: COLORS.light },
      shadow: makeShadow()
    });
    sl.addShape(pres.ShapeType.rect, {
      x, y, w: 0.55, h: 2.0,
      fill: { color: col }
    });
    sl.addText(icon, {
      x, y: y + 0.65, w: 0.55, h: 0.7,
      fontSize: 20, color: COLORS.white,
      align: "center", valign: "middle"
    });
    sl.addText(title, {
      x: x + 0.65, y: y + 0.1, w: 3.65, h: 0.45,
      fontSize: 14, fontFace: FONTS.body,
      color: col, bold: true
    });
    sl.addText(desc, {
      x: x + 0.65, y: y + 0.55, w: 3.65, h: 1.3,
      fontSize: 11.5, fontFace: FONTS.body,
      color: COLORS.text, valign: "top",
      lineSpacingMultiple: 1.3
    });
  });

  sl.addNotes("El Transformer es la arquitectura universal: ViT aplica la atención a patches de imagen, DiT la usa para la difusión (reemplazando U-Net), BLIP-2/Flamingo usa cross-attention para conectar modalidades, y modelos JEPA usan ViT para aprendizaje autosupervisado en espacio latente.");
}

// ─── 11. OPTIMIZACIONES MODERNAS ──────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.light };

  sl.addText("Optimizaciones modernas del Transformer", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const opts = [
    {
      tag: "RMSNorm",
      sub: "Normalización",
      body: "Sin centrado (sin resta de media). Solo re-escalado. 10-15% más rápida que LayerNorm. Estándar en Llama, Mistral.",
      col: COLORS.primary
    },
    {
      tag: "SwiGLU",
      sub: "Activación FFN",
      body: "FFN(x) = (SiLU(xW₁) ⊙ xW₃)W₂. Gate multiplicativa → mayor capacidad expresiva. 3 proyecciones vs. 2 estándar.",
      col: "2666CF"
    },
    {
      tag: "GQA",
      sub: "Grouped Query Attention",
      body: "h heads de Q, g < h grupos de K/V. Reducción del KV-cache por factor h/g. Crucial para batches grandes en inferencia.",
      col: "0D98BA"
    },
    {
      tag: "Flash\nAttention",
      sub: "Atención eficiente",
      body: "Memoria O(N) en vez de O(N²) mediante tiling en SRAM. Mismo resultado matemático. FA3 optimiza para GPU H100.",
      col: COLORS.accent
    },
  ];

  opts.forEach(({ tag, sub, body, col }, i) => {
    const x = 0.5 + (i % 2) * 4.75;
    const y = 1.05 + Math.floor(i / 2) * 2.2;

    sl.addShape(pres.ShapeType.rect, {
      x, y, w: 4.45, h: 2.0,
      fill: { color: COLORS.white },
      shadow: makeShadow()
    });
    sl.addShape(pres.ShapeType.rect, {
      x, y, w: 4.45, h: 0.55,
      fill: { color: col }
    });
    sl.addText(tag + " — " + sub, {
      x: x + 0.15, y, w: 4.15, h: 0.55,
      fontSize: 14, fontFace: FONTS.body,
      color: COLORS.white, bold: true,
      valign: "middle"
    });
    sl.addText(body, {
      x: x + 0.2, y: y + 0.65, w: 4.05, h: 1.25,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.text, valign: "top",
      lineSpacingMultiple: 1.3
    });
  });

  sl.addNotes("Las cuatro optimizaciones clave de los LLMs modernos: RMSNorm (más rápida que LayerNorm), SwiGLU (mejor FFN), GQA (reduce KV-cache), Flash Attention (reduce memoria de atención). Llama 2 y 3, Mistral y Phi incorporan todas estas optimizaciones.");
}

// ─── 12. STATS LLAMA vs MISTRAL ───────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.white };

  sl.addText("LLMs open-source: Llama 3 y Mistral 7B", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const stats = [
    { value: "15T",  label: "Tokens de entrenamiento",   desc: "Llama 3 (8-405B)" },
    { value: "128k", label: "Vocabulario tokenizer",      desc: "4× más que Llama 2" },
    { value: "4096", label: "Ventana SWA de Mistral",     desc: "Sliding Window Attention" },
  ];

  stats.forEach(({ value, label, desc }, i) => {
    const x = 0.75 + i * 2.95;

    sl.addShape(pres.ShapeType.rect, {
      x, y: 1.15, w: 2.55, h: 3.2,
      fill: { color: COLORS.light },
      shadow: makeShadow()
    });
    sl.addText(value, {
      x, y: 1.35, w: 2.55, h: 1.2,
      fontSize: 52, fontFace: FONTS.title,
      color: COLORS.accent, bold: true,
      align: "center", valign: "middle"
    });
    sl.addText(label, {
      x, y: 2.65, w: 2.55, h: 0.5,
      fontSize: 14, fontFace: FONTS.body,
      color: COLORS.primary, bold: true,
      align: "center"
    });
    sl.addText(desc, {
      x: x + 0.2, y: 3.2, w: 2.15, h: 0.9,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.muted, align: "center"
    });
  });

  // Comparison table
  sl.addShape(pres.ShapeType.rect, {
    x: 0.5, y: 4.5, w: 9, h: 0.8,
    fill: { color: COLORS.light }
  });
  sl.addText("Llama 3: GQA en todos los tamaños · Tokenizer 128k · 7.5× más datos que Llama 2 · RLHF mejorado", {
    x: 0.7, y: 4.55, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.text
  });
  sl.addText("Mistral 7B: Sliding Window Attention (O(n·w) vs O(n²)) · GQA · Grouped Byte-Pair Encoding", {
    x: 0.7, y: 4.9, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.text
  });

  sl.addNotes("Llama 3 representa el estado del arte open-source: entrenado en 15 billones de tokens, con un tokenizer de 128k vocabulario y GQA en todos los tamaños. Mistral 7B innovó con Sliding Window Attention que reduce la complejidad de O(n²) a O(n·w) para contextos muy largos.");
}

// ─── 13. PUNTOS CLAVE ─────────────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.primary };

  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.85,
    fill: { color: COLORS.accent }
  });
  sl.addText("Puntos clave para recordar", {
    x: 0.3, y: 0.05, w: 9.4, h: 0.75,
    fontSize: 30, fontFace: FONTS.title,
    color: COLORS.white, bold: true
  });

  const points = [
    "La atención calcula similitudes Q·K, normaliza con softmax y pondera V — complejidad O(n²·d)",
    "El escalado 1/√dₖ previene saturación del softmax en dimensiones altas",
    "Multi-Head Attention: múltiples 'perspectivas' (sintácticas, semánticas, posicionales) en paralelo",
    "RoPE codifica posición relativa multiplicativamente → mejor extrapolación de contexto largo",
    "El Transformer es el backbone universal: LLMs, difusión (DiT), visión (ViT), multimodal (BLIP-2)",
    "Flash Attention no cambia el resultado matemático: reduce memoria de O(n²) a O(n) mediante tiling",
    "GQA/MQA comparten K y V entre grupos de heads → reducción crítica del KV-cache en inferencia",
  ];

  points.forEach((pt, i) => {
    sl.addShape(pres.ShapeType.ellipse, {
      x: 0.55, y: 0.95 + i * 0.66, w: 0.22, h: 0.22,
      fill: { color: COLORS.accent }
    });
    sl.addText(pt, {
      x: 1.0, y: 0.88 + i * 0.66, w: 8.6, h: 0.55,
      fontSize: 13.5, fontFace: FONTS.body,
      color: COLORS.white, valign: "middle",
      lineSpacingMultiple: 1.2
    });
  });

  sl.addNotes("Resumen de los conceptos fundamentales del Transformer. Cada punto conecta con una sección de la presentación.");
}

// ─── 14. CIERRE ───────────────────────────────────────────────────────────────
{
  let sl = pres.addSlide();
  sl.background = { color: COLORS.dark };

  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: COLORS.accent }
  });

  // Decorative circles
  [[8.2,0.3],[9.1,0.7],[8.7,1.2],[9.4,1.5]].forEach(([cx,cy]) => {
    sl.addShape(pres.ShapeType.ellipse, {
      x: cx, y: cy, w: 0.22, h: 0.22,
      fill: { color: COLORS.primary, transparency: 30 }
    });
  });

  sl.addText("¡Gracias!", {
    x: 0.6, y: 1.2, w: 8.5, h: 1.4,
    fontSize: 52, fontFace: FONTS.title,
    color: COLORS.white, bold: true, align: "left"
  });

  sl.addText("Transformadores en Deep Learning", {
    x: 0.6, y: 2.65, w: 8, h: 0.6,
    fontSize: 20, fontFace: FONTS.body,
    color: COLORS.secondary, align: "left"
  });

  sl.addText("¿Preguntas?", {
    x: 0.6, y: 3.3, w: 4, h: 0.55,
    fontSize: 16, fontFace: FONTS.body,
    color: COLORS.muted, align: "left"
  });

  sl.addShape(pres.ShapeType.rect, {
    x: 0, y: 5.1, w: 10, h: 0.525,
    fill: { color: COLORS.primary }
  });
  sl.addText("Basado en: Vaswani et al. 2017 · BERT · GPT-3 · Llama 2/3 · Mistral 7B", {
    x: 0.2, y: 5.1, w: 9.6, h: 0.525,
    fontSize: 11, fontFace: FONTS.body,
    color: COLORS.secondary, align: "center", valign: "middle"
  });

  sl.addNotes("Slide de cierre. Referencias: Attention Is All You Need (Vaswani et al. 2017), BERT (Devlin et al. 2018), GPT-3 (Brown et al. 2020), Llama 2 (Touvron et al. 2023), Mistral 7B (Jiang et al. 2023), Llama 3 (Meta AI 2024).");
}

// === SAVE ===
const outPath = "C:/Users/prodriguezl1/Downloads/papers/Transformadores_DeepLearning.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✅ Presentación guardada en: " + outPath))
  .catch(err => { console.error("❌ Error:", err); process.exit(1); });
