#!/usr/bin/env node
/**
 * Example: Generate a presentation from extracted content.
 * 
 * This is a TEMPLATE script. Claude should adapt this for each specific topic,
 * modifying colors, layouts, content, and slide count based on the extracted material.
 * 
 * Usage:
 *   node generate_slides.js
 * 
 * Prerequisites:
 *   npm install -g pptxgenjs react-icons react react-dom sharp
 */

const pptxgen = require("pptxgenjs");

// ============================================================
// CONFIGURATION — Adapt these for each presentation
// ============================================================

const COLORS = {
  primary: "1E2761",    // Navy
  secondary: "CADCFC",  // Ice blue
  accent: "F96167",     // Coral
  dark: "1A1A2E",       // Dark navy
  light: "F5F5F5",      // Light gray
  white: "FFFFFF",
  text: "2D2D2D",
  muted: "6B7280"
};

const FONTS = {
  title: "Georgia",
  body: "Calibri"
};

// Fresh shadow factory (never reuse shadow objects!)
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12
});

// ============================================================
// PRESENTATION SETUP
// ============================================================

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Example Presentation";
pres.author = "Generated with Slide Generator Skill";

// ============================================================
// SLIDE 1: TITLE
// ============================================================

let slide1 = pres.addSlide();
slide1.background = { color: COLORS.dark };

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.15, h: 5.625,
  fill: { color: COLORS.accent }
});

slide1.addText("Presentation Title", {
  x: 0.8, y: 1.2, w: 8.5, h: 1.5,
  fontSize: 44, fontFace: FONTS.title,
  color: COLORS.white, bold: true, align: "left"
});

slide1.addText("Subtitle — Generated from Source Documents", {
  x: 0.8, y: 2.8, w: 8.5, h: 0.8,
  fontSize: 18, fontFace: FONTS.body,
  color: COLORS.secondary, align: "left"
});

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.1, w: 10, h: 0.525,
  fill: { color: COLORS.primary }
});

slide1.addNotes("This is the title slide. Introduce the topic and set expectations.");

// ============================================================
// SLIDE 2: AGENDA
// ============================================================

let slide2 = pres.addSlide();
slide2.background = { color: COLORS.light };

slide2.addText("What We'll Cover", {
  x: 0.5, y: 0.3, w: 9, h: 0.8,
  fontSize: 36, fontFace: FONTS.title,
  color: COLORS.primary, bold: true
});

const agendaItems = [
  { num: "01", title: "Introduction & Context", desc: "Setting the scene" },
  { num: "02", title: "Core Concepts", desc: "The fundamental ideas" },
  { num: "03", title: "Data & Evidence", desc: "What the numbers tell us" },
  { num: "04", title: "Key Takeaways", desc: "What to remember" }
];

agendaItems.forEach((item, i) => {
  const yPos = 1.4 + i * 0.95;

  slide2.addShape(pres.shapes.OVAL, {
    x: 0.6, y: yPos, w: 0.55, h: 0.55,
    fill: { color: COLORS.primary }
  });
  slide2.addText(item.num, {
    x: 0.6, y: yPos, w: 0.55, h: 0.55,
    fontSize: 16, fontFace: FONTS.body,
    color: COLORS.white, align: "center", valign: "middle"
  });

  slide2.addText(item.title, {
    x: 1.4, y: yPos - 0.05, w: 7.5, h: 0.35,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.text, bold: true, margin: 0
  });
  slide2.addText(item.desc, {
    x: 1.4, y: yPos + 0.3, w: 7.5, h: 0.3,
    fontSize: 13, fontFace: FONTS.body,
    color: COLORS.muted, margin: 0
  });
});

slide2.addNotes("Overview of the presentation structure.");

// ============================================================
// SLIDE 3: TWO-COLUMN CONTENT
// ============================================================

let slide3 = pres.addSlide();
slide3.background = { color: COLORS.white };

slide3.addText("Core Concept", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: FONTS.title,
  color: COLORS.primary, bold: true
});

// Left card
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 4.2, h: 3.8,
  fill: { color: COLORS.light },
  shadow: makeShadow()
});
slide3.addText("This section explains the core concept extracted from the source documents. The content is synthesized and organized for clarity.", {
  x: 0.8, y: 1.4, w: 3.6, h: 3.4,
  fontSize: 14, fontFace: FONTS.body,
  color: COLORS.text, valign: "top",
  lineSpacingMultiple: 1.3
});

// Right card (dark)
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.2, w: 4.3, h: 3.8,
  fill: { color: COLORS.primary }
});
slide3.addText("Supporting details, examples, or complementary information goes here to provide depth.", {
  x: 5.5, y: 1.4, w: 3.7, h: 3.4,
  fontSize: 14, fontFace: FONTS.body,
  color: COLORS.white, valign: "top",
  lineSpacingMultiple: 1.3
});

slide3.addNotes("Expanded explanation from source document...");

// ============================================================
// SLIDE 4: STAT CALLOUT
// ============================================================

let slide4 = pres.addSlide();
slide4.background = { color: COLORS.white };

slide4.addText("By the Numbers", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: FONTS.title,
  color: COLORS.primary, bold: true
});

const stats = [
  { value: "85%", label: "Metric A", desc: "Description of what this number represents" },
  { value: "2.5x", label: "Metric B", desc: "Growth factor or comparison" },
  { value: "$1.2M", label: "Metric C", desc: "Financial figure or budget" }
];

const colW = 8.5 / stats.length;
stats.forEach((stat, i) => {
  const xPos = 0.75 + i * colW;

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: 1.4, w: colW - 0.5, h: 3.2,
    fill: { color: COLORS.light },
    shadow: makeShadow()
  });

  slide4.addText(stat.value, {
    x: xPos, y: 1.6, w: colW - 0.5, h: 1.2,
    fontSize: 54, fontFace: FONTS.title,
    color: COLORS.accent, bold: true,
    align: "center", valign: "middle"
  });

  slide4.addText(stat.label, {
    x: xPos, y: 2.9, w: colW - 0.5, h: 0.5,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.primary, bold: true, align: "center"
  });

  slide4.addText(stat.desc, {
    x: xPos + 0.2, y: 3.4, w: colW - 0.9, h: 0.9,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.muted, align: "center"
  });
});

slide4.addNotes("Key statistics extracted from the source material.");

// ============================================================
// SLIDE 5: KEY TAKEAWAYS
// ============================================================

let slide5 = pres.addSlide();
slide5.background = { color: COLORS.primary };

slide5.addText("Key Takeaways", {
  x: 0.5, y: 0.3, w: 9, h: 0.8,
  fontSize: 36, fontFace: FONTS.title,
  color: COLORS.white, bold: true
});

const takeaways = [
  "First key insight from the source material",
  "Second important finding or conclusion",
  "Third actionable recommendation",
  "Final thought or call to action"
];

takeaways.forEach((point, i) => {
  const yPos = 1.4 + i * 0.85;
  slide5.addShape(pres.shapes.OVAL, {
    x: 0.8, y: yPos + 0.08, w: 0.2, h: 0.2,
    fill: { color: COLORS.accent }
  });
  slide5.addText(point, {
    x: 1.2, y: yPos, w: 8, h: 0.5,
    fontSize: 16, fontFace: FONTS.body,
    color: COLORS.white, valign: "middle"
  });
});

slide5.addNotes("Summary of the most important points from the presentation.");

// ============================================================
// SLIDE 6: CLOSING
// ============================================================

let slide6 = pres.addSlide();
slide6.background = { color: COLORS.dark };

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.15, h: 5.625,
  fill: { color: COLORS.accent }
});

slide6.addText("Thank You", {
  x: 0.8, y: 1.5, w: 8.5, h: 1.5,
  fontSize: 44, fontFace: FONTS.title,
  color: COLORS.white, bold: true, align: "left"
});

slide6.addText("Questions & Discussion", {
  x: 0.8, y: 3.0, w: 8.5, h: 0.8,
  fontSize: 20, fontFace: FONTS.body,
  color: COLORS.secondary, align: "left"
});

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.1, w: 10, h: 0.525,
  fill: { color: COLORS.primary }
});

// ============================================================
// SAVE
// ============================================================

const outputPath = process.argv[2] || "/home/claude/presentation.pptx";

pres.writeFile({ fileName: outputPath })
  .then(() => console.log(`Presentation saved to: ${outputPath}`))
  .catch(err => console.error("Error:", err));