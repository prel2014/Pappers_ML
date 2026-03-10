const pptxgen = require("pptxgenjs");

// === PALETA META AI ===
const C = {
  primary:   "0064E0",  // Meta blue
  secondary: "C8DEFF",  // light blue
  accent:    "FF6B35",  // naranja cálido
  accent2:   "00C2FF",  // cyan Meta
  dark:      "0A1628",  // navy dark
  light:     "F0F2F5",  // gris Meta
  white:     "FFFFFF",
  text:      "1C1E21",
  muted:     "65676B"
};
const F = { title: "Calibri", body: "Calibri" };
const mkShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 });

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Meta AI en Visión 2018-2026";

// ─────────────────────────────────────────────────────────────
// SLIDE 1 — Portada
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  // Barra lateral accent
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });

  // Bloque azul decorativo derecha
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0, w: 2.8, h: 5.625, fill: { color: C.primary, transparency: 75 } });

  s.addText("Meta AI en Visión", {
    x: 0.55, y: 0.7, w: 7, h: 1.2,
    fontSize: 44, fontFace: F.title, color: C.white, bold: true, align: "left"
  });
  s.addText("6 Líneas de Investigación que Transformaron la IA Visual (2018–2026)", {
    x: 0.55, y: 2.0, w: 7.5, h: 0.8,
    fontSize: 17, fontFace: F.body, color: C.secondary, align: "left"
  });
  s.addText("FAIR  ·  Meta AI Research", {
    x: 0.55, y: 3.0, w: 5, h: 0.5,
    fontSize: 14, fontFace: F.body, color: C.accent2, align: "left"
  });

  // Línea inferior
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.1, w: 10, h: 0.525, fill: { color: C.primary } });

  s.addNotes("Meta / FAIR ha producido ~44 papers fundamentales de visión IA desde 2018. Esta presentación cubre las 6 líneas de investigación principales: SSL Visual (DINO→DINOv2), World Models (JEPA), Segmentación (SAM), Video, VLMs y Backbones.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 2 — 6 Líneas de Investigación
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.light };

  s.addText("6 Líneas de Investigación", {
    x: 0.5, y: 0.25, w: 9, h: 0.75,
    fontSize: 34, fontFace: F.title, color: C.primary, bold: true
  });

  const lines = [
    { num: "01", title: "SSL Visual",     desc: "DINO → MAE → DINOv2 → DINOv3",        color: C.primary },
    { num: "02", title: "World Models",   desc: "LeCun → I-JEPA → V-JEPA 2",           color: "1A6BC4" },
    { num: "03", title: "Segmentación",   desc: "MaskFormer → Mask2Former → SAM → SAM 2", color: C.accent },
    { num: "04", title: "Video",          desc: "SlowFast → TimeSformer → Movie Gen",  color: "E65100" },
    { num: "05", title: "VLMs",           desc: "FLAVA → ImageBind → Chameleon → Llama 4", color: "00897B" },
    { num: "06", title: "Backbones",      desc: "Non-Local → DETR → ConvNeXt → Sapiens", color: "6A1B9A" },
  ];

  const cols = 3;
  lines.forEach((ln, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.4 + col * 3.1;
    const y = 1.2 + row * 2.05;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.85, h: 1.8, fill: { color: C.white }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.85, h: 0.45, fill: { color: ln.color } });

    s.addText(`${ln.num}  ${ln.title}`, {
      x: x + 0.12, y: y, w: 2.6, h: 0.45,
      fontSize: 14, fontFace: F.body, color: C.white, bold: true, valign: "middle"
    });
    s.addText(ln.desc, {
      x: x + 0.12, y: y + 0.55, w: 2.6, h: 1.1,
      fontSize: 12, fontFace: F.body, color: C.text, valign: "top", lineSpacingMultiple: 1.3
    });
  });

  s.addNotes("Las 6 líneas son complementarias: SSL Visual provee los encoders, World Models aprenden física, SAM segmenta cualquier objeto, Video comprende el tiempo, VLMs unen visión y lenguaje, Backbones son la infraestructura que lo soporta todo.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 3 — Timeline 2018-2026
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addText("Cronología: Meta AI Vision", {
    x: 0.5, y: 0.2, w: 9, h: 0.7,
    fontSize: 32, fontFace: F.title, color: C.white, bold: true
  });

  // Línea horizontal
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.9, w: 9, h: 0.06, fill: { color: C.secondary } });

  const milestones = [
    { year: "2018", label: "Non-Local\nNets",   x: 0.4,  color: C.accent  },
    { year: "2020", label: "DETR",              x: 1.7,  color: C.accent2 },
    { year: "2021", label: "DINO\nMAE\nTimeSformer", x: 3.0, color: C.primary },
    { year: "2022", label: "MAE\nConvNeXt",     x: 4.6,  color: C.accent  },
    { year: "2023", label: "DINOv2\nSAM\nImageBind\nI-JEPA", x: 5.9, color: "00897B" },
    { year: "2024", label: "V-JEPA\nSAM 2\nChameleon\nMovie Gen", x: 7.5, color: "6A1B9A" },
    { year: "2025", label: "V-JEPA 2\nDINOv3\nLlama 4\nSAM 3", x: 9.0, color: C.accent2 },
  ];

  milestones.forEach((m, i) => {
    const above = i % 2 === 0;
    // Dot
    s.addShape(pres.shapes.OVAL, {
      x: m.x - 0.12, y: 2.78, w: 0.24, h: 0.24,
      fill: { color: m.color }
    });
    // Year
    s.addText(m.year, {
      x: m.x - 0.35, y: above ? 2.2 : 3.15, w: 0.7, h: 0.35,
      fontSize: 13, fontFace: F.body, color: m.color, bold: true, align: "center"
    });
    // Label
    s.addText(m.label, {
      x: m.x - 0.55, y: above ? 1.1 : 3.55, w: 1.1, h: 1.05,
      fontSize: 10, fontFace: F.body, color: C.secondary, align: "center", valign: above ? "bottom" : "top"
    });
  });

  s.addNotes("2018-2020: Meta establece backbones y detección. 2021: Revolución SSL con DINO y MAE. 2022: ConvNeXt desafía ViT. 2023: Explosión multimodal (SAM, DINOv2, ImageBind, I-JEPA). 2024-2026: World models, video generation y VLMs nativos.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 4 — SSL Visual: DINO → DINOv2
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  s.addText("Línea 1: SSL Visual — La evolución de DINO", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 28, fontFace: F.title, color: C.primary, bold: true
  });

  // Columna izquierda - texto
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.3, h: 4.2, fill: { color: C.light }, shadow: mkShadow() });
  const leftText = [
    { text: "DINO (2021)", options: { bold: true, color: C.primary, breakLine: true } },
    { text: "Self-distilación sin negativos. ViT aprende segmentación emergente automáticamente.\n\n", options: { color: C.text, breakLine: false } },
    { text: "MAE (2021)", options: { bold: true, color: C.accent, breakLine: true } },
    { text: "75% masking + reconstrucción de píxeles. Encoder ViT escalable.\n\n", options: { color: C.text, breakLine: false } },
    { text: "DINOv2 (2023)", options: { bold: true, color: "00897B", breakLine: true } },
    { text: "Curación masiva de datos (LVD-142M). Sin supervisión, supera modelos supervisados en linprobe.", options: { color: C.text, breakLine: false } },
  ];
  s.addText(leftText, {
    x: 0.65, y: 1.2, w: 3.8, h: 3.9,
    fontSize: 13, fontFace: F.body, valign: "top", lineSpacingMultiple: 1.35
  });

  // Columna derecha - comparativa paradigmas SSL
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.4, h: 4.2, fill: { color: C.primary } });

  s.addText("¿Por qué JEPA supera a MAE?", {
    x: 5.3, y: 1.15, w: 4.0, h: 0.5,
    fontSize: 14, fontFace: F.body, color: C.accent2, bold: true
  });

  const comparison = [
    ["", "MAE", "DINO/\nJEPA"],
    ["Predice", "Píxeles", "Latente"],
    ["Colapso", "No aplica", "EMA evita"],
    ["Semántica", "Media", "Alta"],
    ["Compute", "Alto", "Eficiente"],
    ["Zero-shot", "Bueno", "Excelente"],
  ];

  comparison.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const cx = 5.15 + ci * 1.45;
      const cy = 1.75 + ri * 0.56;
      const isHeader = ri === 0 || ci === 0;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: cy, w: 1.4, h: 0.52,
        fill: { color: isHeader ? "1A5CB8" : (ri % 2 === 0 ? "0A3D8F" : "0A4DB5") }
      });
      s.addText(cell, {
        x: cx, y: cy, w: 1.4, h: 0.52,
        fontSize: 11, fontFace: F.body, color: isHeader ? C.accent2 : C.white,
        align: "center", valign: "middle", bold: isHeader
      });
    });
  });

  s.addNotes("DINO aprende sin etiquetas mediante student-teacher: el student ve crops augmentados, el teacher (EMA del student) ve el crop completo. La propiedad emergente clave: los mapas de atención de DINO revelan segmentación semántica sin supervisión. DINOv2 añade curación de datos a escala con LVD-142M (142M imágenes de internet filtradas) y training estabilizado.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 5 — World Models: JEPA
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.light };

  s.addText("Línea 2: World Models — Familia JEPA", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 28, fontFace: F.title, color: C.primary, bold: true
  });

  // Diagrama JEPA simplificado
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.3, fill: { color: C.white }, shadow: mkShadow() });

  const boxes = [
    { label: "Contexto\n(visible)", x: 0.6,  color: C.primary },
    { label: "Encoder f_θ",        x: 2.2,  color: "1A5CB8" },
    { label: "Predictor s_θ",      x: 3.9,  color: C.accent  },
    { label: "ẑ_y (pred.)",        x: 5.6,  color: "E65100"  },
    { label: "z_y (EMA)",          x: 7.3,  color: "00897B"  },
  ];
  boxes.forEach((b, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: b.x, y: 1.1, w: 1.5, h: 1.1,
      fill: { color: b.color }, rectRadius: 0.1
    });
    s.addText(b.label, {
      x: b.x, y: 1.1, w: 1.5, h: 1.1,
      fontSize: 11, fontFace: F.body, color: C.white, align: "center", valign: "middle", bold: true
    });
    // Flecha
    if (i < boxes.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: b.x + 1.5, y: 1.6, w: 0.7, h: 0.05,
        fill: { color: C.muted }
      });
    }
  });
  s.addText("stop_gradient →  evita colapso trivial", {
    x: 6.5, y: 2.1, w: 3.0, h: 0.35,
    fontSize: 11, fontFace: F.body, color: C.accent, italic: true
  });

  // 4 tarjetas de evolución
  const cards = [
    { title: "I-JEPA (2023)", body: "Predice regiones de imagen en espacio latente. ViT-H/14. Supera MAE en linprobe con igual compute.", color: C.primary },
    { title: "V-JEPA (2024)", body: "Masking espacio-temporal (tubes). 16 frames. Aprende regularidades físicas de movimiento.", color: "1A6BC4" },
    { title: "V-JEPA 2 (2025)", body: "World model completo. Predicción condicionada por acciones. Planning en espacio latente para robótica.", color: "6A1B9A" },
    { title: "VL-JEPA (2025)", body: "Extiende JEPA a visión-lenguaje. Predicción conjunta de representaciones imagen-texto.", color: "00897B" },
  ];
  cards.forEach((c, i) => {
    const x = 0.4 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.2, h: 2.65, fill: { color: C.white }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.2, h: 0.42, fill: { color: c.color } });
    s.addText(c.title, { x: x + 0.1, y: 2.65, w: 2.0, h: 0.42, fontSize: 12, fontFace: F.body, color: C.white, bold: true, valign: "middle" });
    s.addText(c.body, { x: x + 0.12, y: 3.15, w: 1.95, h: 2.05, fontSize: 11, fontFace: F.body, color: C.text, valign: "top", lineSpacingMultiple: 1.3 });
  });

  s.addNotes("JEPA (Joint-Embedding Predictive Architecture) es el framework de Yann LeCun para aprendizaje sin supervisión. La clave: predecir en espacio latente evita reconstruir detalles irrelevantes (texturas, ruido). El EMA encoder (τ≈0.996) evita el colapso trivial donde todos los embeddings colapsan a una constante. V-JEPA 2 es el primer world model de Meta capaz de hacer planning condicionado por acciones.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 6 — Segmentación: SAM Family
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  s.addText("Línea 3: Segmentación Foundation — SAM", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 28, fontFace: F.title, color: C.accent, bold: true
  });

  // Stats row
  const stats = [
    { value: "1B+",    label: "Máscaras (SAM)",     desc: "Dataset SA-1B — mayor colección de máscaras del mundo" },
    { value: "11M",    label: "Imágenes anotadas",   desc: "Generadas semi-automáticamente con el modelo propio" },
    { value: "Zero",   label: "Shot",                desc: "Segmenta cualquier objeto sin ejemplos de la clase" },
    { value: "3→",    label: "Generaciones",         desc: "SAM (2023) → SAM 2 (2024, video) → SAM 3 (2025, conceptos)" },
  ];

  stats.forEach((st, i) => {
    const x = 0.4 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.1, h: 2.8, fill: { color: C.light }, shadow: mkShadow() });
    s.addText(st.value, { x, y: 1.15, w: 2.1, h: 1.0, fontSize: 44, fontFace: F.title, color: C.accent, bold: true, align: "center", valign: "middle" });
    s.addText(st.label, { x, y: 2.25, w: 2.1, h: 0.45, fontSize: 14, fontFace: F.body, color: C.primary, bold: true, align: "center" });
    s.addText(st.desc, { x: x + 0.12, y: 2.75, w: 1.85, h: 0.95, fontSize: 11, fontFace: F.body, color: C.muted, align: "center", valign: "top" });
  });

  // Pipeline SAM
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.05, w: 9.2, h: 1.35, fill: { color: C.dark } });

  const pipeline = [
    "Image Encoder\n(ViT-H, MAE pretrain)",
    "Prompt Encoder\n(punto / caja / máscara / texto)",
    "Mask Decoder\n(2 capas Transformer)",
    "Máscara de\nSegmentación",
  ];
  pipeline.forEach((p, i) => {
    const x = 0.7 + i * 2.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.2, w: 2.0, h: 1.0, fill: { color: i === 3 ? C.accent : C.primary }, rectRadius: 0.08 });
    s.addText(p, { x, y: 4.2, w: 2.0, h: 1.0, fontSize: 11, fontFace: F.body, color: C.white, align: "center", valign: "middle", bold: i === 3 });
    if (i < 3) {
      s.addShape(pres.shapes.RECTANGLE, { x: x + 2.0, y: 4.68, w: 0.3, h: 0.05, fill: { color: C.secondary } });
    }
  });

  s.addNotes("SAM (Segment Anything Model) usa un ViT-H preentrenado con MAE como image encoder. El prompt encoder acepta puntos, cajas, máscaras o texto. El mask decoder es liviano (2 capas Transformer). SAM 2 extiende esto a video con memoria de frames previos. SAM 3 añade comprensión conceptual: no solo 'qué forma', sino 'qué es'.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 7 — Video: SlowFast → Movie Gen
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.light };

  s.addText("Línea 4: Video — Del Reconocimiento a la Generación", {
    x: 0.5, y: 0.2, w: 9.2, h: 0.65,
    fontSize: 26, fontFace: F.title, color: "E65100", bold: true
  });

  // Timeline de pasos
  const steps = [
    { num: "2019", title: "SlowFast", desc: "Dos pathways: slow (semántica) + fast (movimiento). CNN dual.", color: "E65100" },
    { num: "2021", title: "TimeSformer", desc: "Transformer puro para video. Atención dividida espacio-temporal.", color: C.accent },
    { num: "2022", title: "Make-A-Video", desc: "T2V sin datos texto-video. Reutiliza modelo T2I + deltas temporales.", color: C.primary },
    { num: "2023", title: "Emu Video", desc: "Video condicionado por imagen. Factoriza el problema T2V.", color: "1A6BC4" },
    { num: "2024", title: "Movie Gen", desc: "30B params, Flow Matching. Audio + video de alta resolución.", color: "6A1B9A" },
  ];

  const stepW = 9.0 / steps.length;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.35, w: 9.0, h: 0.06, fill: { color: C.muted } });

  steps.forEach((st, i) => {
    const x = 0.5 + i * stepW;
    const above = i % 2 === 0;

    s.addShape(pres.shapes.OVAL, { x: x + stepW / 2 - 0.2, y: 2.22, w: 0.38, h: 0.38, fill: { color: st.color } });
    s.addText(st.num, { x: x + stepW / 2 - 0.25, y: above ? 1.65 : 2.75, w: 1.1, h: 0.35, fontSize: 12, fontFace: F.body, color: st.color, bold: true, align: "center" });

    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: above ? 0.9 : 3.15, w: stepW - 0.2, h: 1.1, fill: { color: C.white }, shadow: mkShadow() });
    s.addText(st.title, { x: x + 0.2, y: above ? 0.95 : 3.2, w: stepW - 0.4, h: 0.4, fontSize: 13, fontFace: F.body, color: st.color, bold: true });
    s.addText(st.desc, { x: x + 0.2, y: above ? 1.38 : 3.63, w: stepW - 0.4, h: 0.62, fontSize: 10.5, fontFace: F.body, color: C.text, valign: "top", lineSpacingMultiple: 1.2 });
  });

  // Movie Gen highlight
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.45, w: 9.2, h: 0.95, fill: { color: "6A1B9A", transparency: 10 } });
  s.addText("Movie Gen (2024): primer modelo de Meta capaz de generar video + audio de alta calidad • 30B parámetros • Flow Matching • Edición de video personalizada", {
    x: 0.65, y: 4.5, w: 8.7, h: 0.85,
    fontSize: 13, fontFace: F.body, color: C.white, valign: "middle", lineSpacingMultiple: 1.3
  });

  s.addNotes("La evolución de video en Meta va de reconocimiento (SlowFast, TimeSformer) a generación (Make-A-Video, Emu Video, Movie Gen). Make-A-Video es arquitectónicamente elegante: no necesita datos texto-video porque reutiliza un modelo texto-imagen y solo aprende los deltas temporales. Movie Gen (2024) es el modelo de generación de video más ambicioso de Meta: 30B params con capacidad de generar video y audio sincronizados.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 8 — VLMs: De FLAVA a Llama 4
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  s.addText("Línea 5: VLMs — Visión + Lenguaje en Meta", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 28, fontFace: F.title, color: "00897B", bold: true
  });

  // Columna izquierda: evolución VLMs
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 4.25, fill: { color: C.light }, shadow: mkShadow() });

  const vlms = [
    { year: "2022", name: "FLAVA",      desc: "Fundacional: alinea texto, imagen y multimodal en un solo modelo.", color: "00897B" },
    { year: "2023", name: "ImageBind",  desc: "Un espacio de embedding para 6 modalidades: imagen, texto, audio, video, profundidad, IMU.", color: C.primary },
    { year: "2023", name: "MetaCLIP",   desc: "Desmitifica los datos de CLIP. Curación de 400M pares reproducible.", color: "1A6BC4" },
    { year: "2024", name: "Chameleon",  desc: "Early-fusion nativo: trata tokens de imagen y texto como iguales desde capa 1.", color: C.accent },
    { year: "2024", name: "Llama 3.2-V",desc: "Llama 3 + visión. VLM open-source líder en benchmarks.", color: "6A1B9A" },
    { year: "2025", name: "Llama 4",    desc: "Natively multimodal + MoE. Scout (17Bx16E) y Maverick (17Bx128E).", color: "E65100" },
  ];

  vlms.forEach((v, i) => {
    const y = 1.2 + i * 0.67;
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.06, w: 0.4, h: 0.4, fill: { color: v.color } });
    s.addText(v.year, { x: 0.55, y: y + 0.06, w: 0.4, h: 0.4, fontSize: 10, fontFace: F.body, color: C.white, align: "center", valign: "middle", bold: true });
    s.addText(v.name + " — " + v.desc, {
      x: 1.1, y, w: 3.6, h: 0.62,
      fontSize: 11.5, fontFace: F.body, color: C.text, valign: "middle", lineSpacingMultiple: 1.2
    });
  });

  // Columna derecha: ImageBind destacado
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.05, w: 4.25, h: 4.25, fill: { color: C.primary } });
  s.addText("ImageBind", { x: 5.5, y: 1.15, w: 3.85, h: 0.55, fontSize: 22, fontFace: F.title, color: C.white, bold: true });
  s.addText("Un embedding para gobernarlos a todos", { x: 5.5, y: 1.65, w: 3.85, h: 0.4, fontSize: 13, fontFace: F.body, color: C.accent2, italic: true });

  const modalities = ["🖼 Imagen", "📝 Texto", "🎵 Audio", "🎬 Video", "📐 Profundidad", "📡 IMU/Sensor"];
  modalities.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5 + col * 2.0, y: 2.2 + row * 0.82, w: 1.85, h: 0.7, fill: { color: "1A5CB8" }, shadow: mkShadow() });
    s.addText(m, { x: 5.5 + col * 2.0, y: 2.2 + row * 0.82, w: 1.85, h: 0.7, fontSize: 13, fontFace: F.body, color: C.white, align: "center", valign: "middle" });
  });

  s.addText("Todos se alinean con imagen como ancla", {
    x: 5.5, y: 4.7, w: 3.85, h: 0.45,
    fontSize: 12, fontFace: F.body, color: C.secondary, italic: true, align: "center"
  });

  s.addNotes("La estrategia VLM de Meta evolucionó de modelos separados (FLAVA) a espacios unificados (ImageBind) a fusión nativa (Chameleon). Chameleon es revolucionario porque trata tokens de imagen y texto idénticamente desde la primera capa — no hay encoder separado. Llama 4 combina multimodalidad nativa con arquitectura MoE, siendo open-source.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 9 — Backbones: DETR → ConvNeXt → Sapiens
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.light };

  s.addText("Línea 6: Backbones — Infraestructura Visual", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 28, fontFace: F.title, color: "6A1B9A", bold: true
  });

  const backbones = [
    { year: "2018", name: "Non-Local Nets",  desc: "Self-attention espacial en CNNs. Precursor de ViT para visión.", icon: "→ Atención" },
    { year: "2020", name: "DETR",            desc: "Detección de objetos end-to-end con Transformer. Elimina NMS y anclas.", icon: "→ Detección" },
    { year: "2021", name: "MViT",            desc: "Multi-Scale ViT. Procesa video a múltiples resoluciones temporales.", icon: "→ Video" },
    { year: "2021", name: "MaskFormer",      desc: "Unifica segmentación semántica, instancia y panóptica en un solo modelo.", icon: "→ Seg." },
    { year: "2022", name: "ConvNeXt",        desc: "Moderniza ResNet con ideas de ViT. Comparable a Swin Transformer.", icon: "→ CNN" },
    { year: "2022", name: "Mask2Former",     desc: "Masked-attention Mask Transformer. Estado del arte en segmentación universal.", icon: "→ Seg." },
    { year: "2022", name: "ViT-Det",         desc: "ViT plain como backbone para detección. Sin FPN ni anclas multiscale.", icon: "→ Det." },
    { year: "2023", name: "ViT-Reg",         desc: "Añade tokens registro a ViT para eliminar artefactos en los mapas de atención.", icon: "→ ViT" },
    { year: "2024", name: "Sapiens",         desc: "Foundation model para visión de humanos. Pose, profundidad, segmentación y normales.", icon: "→ Human" },
  ];

  const cols = 3;
  backbones.forEach((b, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.35 + col * 3.15;
    const y = 1.05 + row * 1.55;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 1.38, fill: { color: C.white }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h: 1.38, fill: { color: "6A1B9A", transparency: 30 } });

    s.addText(b.year, { x, y: y + 0.1, w: 0.55, h: 0.5, fontSize: 11, fontFace: F.body, color: C.white, align: "center", bold: true });
    s.addText(b.icon, { x, y: y + 0.65, w: 0.55, h: 0.55, fontSize: 10, fontFace: F.body, color: C.secondary, align: "center" });

    s.addText(b.name, { x: x + 0.65, y: y + 0.08, w: 2.2, h: 0.38, fontSize: 13, fontFace: F.body, color: "6A1B9A", bold: true });
    s.addText(b.desc, { x: x + 0.65, y: y + 0.48, w: 2.2, h: 0.82, fontSize: 10.5, fontFace: F.body, color: C.text, valign: "top", lineSpacingMultiple: 1.2 });
  });

  s.addNotes("Los backbones de Meta van de Non-Local Nets (self-attention en CNN, 2018) a DETR (detección sin anclas con Transformer) a ConvNeXt (CNN que iguala ViT modernizando ResNet) a Sapiens (foundation model para humanos que unifica 4 tareas: pose, segmentación, profundidad y normales). Cada uno resolvió una limitación anterior.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 10 — Comparativa: 3 Paradigmas SSL de Meta
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.white };

  s.addText("¿Cómo aprende Meta a 'ver'? — 3 Paradigmas SSL", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 26, fontFace: F.title, color: C.primary, bold: true
  });

  const paradigms = [
    {
      title: "Contrastivo\n(CLIP / MetaCLIP)",
      color: C.primary,
      items: [
        "Atrae pares similares, aleja disimilares",
        "Necesita muchos negativos en batch",
        "Produce espacios alineados imagen-texto",
        "Ideal para zero-shot y retrieval",
        "Escala bien con más datos",
      ]
    },
    {
      title: "Generativo\n(MAE / Emu)",
      color: C.accent,
      items: [
        "Reconstruye píxeles mascarados (75%)",
        "Supervisión muy densa (pixel-level)",
        "Encoder aprende representaciones ricas",
        "Alto costo de compute en decoder",
        "Base para generación de imágenes",
      ]
    },
    {
      title: "Predictivo Latente\n(JEPA / DINO)",
      color: "00897B",
      items: [
        "Predice representaciones, no píxeles",
        "No necesita negativos (usa EMA)",
        "Semántica de alto nivel emergente",
        "Evita detalles irrelevantes",
        "Más eficiente que MAE en linprobe",
      ]
    },
  ];

  paradigms.forEach((p, i) => {
    const x = 0.35 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.95, h: 4.35, fill: { color: C.light }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.95, h: 0.7, fill: { color: p.color } });
    s.addText(p.title, { x: x + 0.1, y: 1.05, w: 2.75, h: 0.7, fontSize: 13, fontFace: F.body, color: C.white, bold: true, valign: "middle" });

    p.items.forEach((item, j) => {
      const y = 1.9 + j * 0.66;
      s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.1, w: 0.18, h: 0.18, fill: { color: p.color } });
      s.addText(item, { x: x + 0.5, y, w: 2.3, h: 0.62, fontSize: 11.5, fontFace: F.body, color: C.text, valign: "middle", lineSpacingMultiple: 1.2 });
    });
  });

  s.addNotes("Meta ha explorado los tres paradigmas SSL. Contrastivo (CLIP/MetaCLIP) alinea modalidades pero requiere negativos. Generativo (MAE) da supervisión densa pero reconstruir píxeles es costoso y aprende detalles poco útiles. Predictivo latente (JEPA/DINO) combina lo mejor: sin negativos, semántica de alto nivel, eficiente. LeCun argumenta que JEPA es el camino hacia la inteligencia autónoma.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 11 — Números clave de Meta Vision
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addText("Meta AI Vision en Números", {
    x: 0.5, y: 0.2, w: 9, h: 0.65,
    fontSize: 32, fontFace: F.title, color: C.white, bold: true
  });

  const nums = [
    { val: "44",    label: "Papers (2018-2026)", desc: "Visión + IA" },
    { val: "1B+",   label: "Máscaras SAM",       desc: "Dataset SA-1B" },
    { val: "142M",  label: "Imágenes DINOv2",    desc: "LVD-142M curado" },
    { val: "30B",   label: "Parámetros Movie Gen",desc: "Generación video" },
    { val: "6",     label: "Modalidades ImageBind",desc: "Un espacio unificado" },
    { val: "17B×128E", label: "Llama 4 Maverick", desc: "VLM MoE nativo" },
  ];

  const cols = 3;
  nums.forEach((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.5 + col * 3.1;
    const y = 1.1 + row * 2.1;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.85, h: 1.85, fill: { color: "1A2E4A" }, shadow: mkShadow() });
    s.addText(n.val, { x, y: y + 0.1, w: 2.85, h: 0.95, fontSize: 38, fontFace: F.title, color: C.accent, bold: true, align: "center" });
    s.addText(n.label, { x, y: y + 1.05, w: 2.85, h: 0.4, fontSize: 13, fontFace: F.body, color: C.secondary, bold: true, align: "center" });
    s.addText(n.desc, { x, y: y + 1.48, w: 2.85, h: 0.3, fontSize: 11, fontFace: F.body, color: C.muted, align: "center" });
  });

  s.addNotes("Números de escala que ilustran el impacto: SAM entrenó con 1B+ máscaras. DINOv2 curó 142M imágenes. Movie Gen tiene 30B parámetros. Llama 4 Maverick usa 128 expertos MoE. ImageBind unifica 6 modalidades. 44 papers de visión en 8 años.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 12 — El ecosistema unificado
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.light };

  s.addText("El Ecosistema Visual de Meta — Todo Conectado", {
    x: 0.5, y: 0.2, w: 9.2, h: 0.65,
    fontSize: 26, fontFace: F.title, color: C.primary, bold: true
  });

  // Diagrama de capas
  const layers = [
    { label: "APLICACIONES", items: "SAM · Movie Gen · Llama 4-V · ACT-JEPA (Robótica)", color: C.accent, y: 1.1 },
    { label: "WORLD MODELS", items: "V-JEPA 2 · Intuitive Physics · Planning en latente", color: "6A1B9A", y: 2.0 },
    { label: "VLMs / MULTIMODAL", items: "ImageBind · Chameleon · MetaCLIP · VL-JEPA", color: "00897B", y: 2.9 },
    { label: "ENCODERS VISUALES", items: "DINOv2 · MAE · I-JEPA · Perception Encoder", color: C.primary, y: 3.8 },
    { label: "BACKBONES / INFRAESTRUCTURA", items: "DETR · ConvNeXt · ViT-Det · Mask2Former · Sapiens", color: "1A5CB8", y: 4.7 },
  ];

  layers.forEach((l) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: l.y, w: 9.2, h: 0.78, fill: { color: l.color } });
    s.addText(l.label, { x: 0.55, y: l.y, w: 2.2, h: 0.78, fontSize: 11, fontFace: F.body, color: C.white, bold: true, valign: "middle" });
    s.addText(l.items, { x: 2.85, y: l.y, w: 6.6, h: 0.78, fontSize: 12, fontFace: F.body, color: C.white, valign: "middle" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.5, w: 9.2, h: 0.06, fill: { color: C.muted } });

  s.addNotes("Las 6 líneas de investigación de Meta no son independientes: los backbones sirven de base para los encoders, los encoders alimentan los world models y VLMs, y las aplicaciones consumen todo el stack. DINOv2 es encoder en SAM, LLaVA y V-JEPA. MAE preentrenó el ViT-H de SAM. JEPA y SAM son complementarios: uno aprende física, el otro segmenta.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 13 — Key Takeaways
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.primary };

  s.addText("Conclusiones Clave", {
    x: 0.5, y: 0.2, w: 9, h: 0.75,
    fontSize: 34, fontFace: F.title, color: C.white, bold: true
  });

  const takeaways = [
    "Meta tiene 6 líneas de investigación visual paralelas y complementarias — ninguna es accidental.",
    "El paradigma SSL de Meta evolucionó: contrastivo (CLIP) → generativo (MAE) → predictivo latente (JEPA), siendo JEPA el más eficiente.",
    "SAM democratizó la segmentación: 1B+ máscaras entrenadas de forma semi-automática, zero-shot para cualquier objeto.",
    "JEPA es la apuesta de LeCun por la inteligencia autónoma: predecir en espacio latente evita los detalles irrelevantes que aprenden los modelos generativos.",
    "Make-A-Video resolvió elegantemente T2V: reutiliza un modelo texto→imagen y solo aprende los deltas temporales.",
    "Los backbones de Meta (DETR, ConvNeXt, ViT-Det) son fundacionales para toda la comunidad de visión.",
  ];

  takeaways.forEach((t, i) => {
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: 1.2 + i * 0.73 + 0.1, w: 0.22, h: 0.22, fill: { color: C.accent } });
    s.addText(t, { x: 0.95, y: 1.2 + i * 0.73, w: 8.6, h: 0.68, fontSize: 13, fontFace: F.body, color: C.white, valign: "middle", lineSpacingMultiple: 1.2 });
  });

  s.addNotes("Resumen: Meta FAIR ha construido el ecosistema visual open-source más completo de la IA: desde backbones (ConvNeXt, DETR) hasta world models (V-JEPA 2), pasando por segmentación universal (SAM), encoders visuales sin supervisión (DINOv2), y VLMs multimodales (Llama 4). La apuesta filosófica de LeCun con JEPA diferencia a Meta de Google/OpenAI.");
}

// ─────────────────────────────────────────────────────────────
// SLIDE 14 — Cierre
// ─────────────────────────────────────────────────────────────
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0, w: 2.8, h: 5.625, fill: { color: C.primary, transparency: 75 } });

  s.addText("Meta AI Vision", { x: 0.55, y: 0.9, w: 7, h: 1.0, fontSize: 44, fontFace: F.title, color: C.white, bold: true });
  s.addText("2018 → 2026: De Non-Local Nets a V-JEPA 2", { x: 0.55, y: 2.0, w: 7, h: 0.6, fontSize: 18, fontFace: F.body, color: C.secondary });
  s.addText("meta_vision_papers.md  ·  44 papers rastreados", { x: 0.55, y: 2.8, w: 7, h: 0.5, fontSize: 14, fontFace: F.body, color: C.accent2 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.1, w: 10, h: 0.525, fill: { color: C.primary } });
  s.addText("FAIR  ·  Meta AI  ·  Papers en /jepa/ · /multimodal/ · /arquitecturas/ · /difusion/", {
    x: 0.2, y: 5.1, w: 9.6, h: 0.525,
    fontSize: 11, fontFace: F.body, color: C.secondary, valign: "middle", align: "center"
  });

  s.addNotes("Para explorar más: el repo tiene todos los papers JEPA en jepa/core/ y jepa/variantes/. Los papers faltantes de Meta están listados en meta_vision_papers.md con sus carpetas destino. La destilación INDEX.md ahora incluye una sección Meta con las 6 líneas de investigación.");
}

// ─────────────────────────────────────────────────────────────
// GUARDAR
// ─────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "Meta_AI_Vision_2018_2026.pptx" })
  .then(() => console.log("✅  Meta_AI_Vision_2018_2026.pptx generado correctamente"))
  .catch(err => console.error("❌  Error:", err));
