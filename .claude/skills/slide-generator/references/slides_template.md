# Slide Templates Reference

Ready-to-use JavaScript snippets for each slide type. Copy and adapt these for your presentations.

## Color & Font Setup (Use in every script)

```javascript
// === Always define your palette first ===
const COLORS = {
  primary: "1E2761",
  secondary: "CADCFC",
  accent: "F96167",
  dark: "1A1A2E",
  light: "F5F5F5",
  white: "FFFFFF",
  text: "2D2D2D",
  muted: "6B7280"
};

const FONTS = { title: "Georgia", body: "Calibri" };

// Shadow factory (always create fresh objects)
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12
});
```

---

## 1. Title Slide (Dark Background)

```javascript
function addTitleSlide(pres, title, subtitle) {
  let slide = pres.addSlide();
  slide.background = { color: COLORS.dark };

  // Decorative accent shape
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: COLORS.accent }
  });

  slide.addText(title, {
    x: 0.8, y: 1.2, w: 8.5, h: 1.5,
    fontSize: 44, fontFace: FONTS.title,
    color: COLORS.white, bold: true,
    align: "left", valign: "middle"
  });

  slide.addText(subtitle, {
    x: 0.8, y: 2.8, w: 8.5, h: 0.8,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.secondary, align: "left"
  });

  // Bottom bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.1, w: 10, h: 0.525,
    fill: { color: COLORS.primary }
  });
}
```

---

## 2. Agenda / Overview Slide

```javascript
function addAgendaSlide(pres, items) {
  // items = [{number: "01", title: "Topic", desc: "Brief description"}, ...]
  let slide = pres.addSlide();
  slide.background = { color: COLORS.light };

  slide.addText("Agenda", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  items.forEach((item, i) => {
    const yPos = 1.4 + i * 0.9;

    // Number circle
    slide.addShape(pres.shapes.OVAL, {
      x: 0.6, y: yPos, w: 0.55, h: 0.55,
      fill: { color: COLORS.primary }
    });
    slide.addText(item.number, {
      x: 0.6, y: yPos, w: 0.55, h: 0.55,
      fontSize: 16, fontFace: FONTS.body,
      color: COLORS.white, align: "center", valign: "middle"
    });

    // Title + description
    slide.addText(item.title, {
      x: 1.4, y: yPos - 0.05, w: 7.5, h: 0.35,
      fontSize: 18, fontFace: FONTS.body,
      color: COLORS.text, bold: true, margin: 0
    });
    slide.addText(item.desc, {
      x: 1.4, y: yPos + 0.3, w: 7.5, h: 0.3,
      fontSize: 13, fontFace: FONTS.body,
      color: COLORS.muted, margin: 0
    });
  });
}
```

---

## 3. Two-Column Content

```javascript
function addTwoColumnSlide(pres, title, leftContent, rightContent) {
  let slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  // Title
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Left column - text content
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.2, h: 3.8,
    fill: { color: COLORS.light },
    shadow: makeShadow()
  });
  slide.addText(leftContent, {
    x: 0.8, y: 1.4, w: 3.6, h: 3.4,
    fontSize: 14, fontFace: FONTS.body,
    color: COLORS.text, valign: "top",
    lineSpacingMultiple: 1.3
  });

  // Right column - visual / secondary content
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.2, w: 4.3, h: 3.8,
    fill: { color: COLORS.primary }
  });
  slide.addText(rightContent, {
    x: 5.5, y: 1.4, w: 3.7, h: 3.4,
    fontSize: 14, fontFace: FONTS.body,
    color: COLORS.white, valign: "top",
    lineSpacingMultiple: 1.3
  });
}
```

---

## 4. Stat Callout Slide

```javascript
function addStatSlide(pres, title, stats) {
  // stats = [{value: "85%", label: "Accuracy", desc: "Optional detail"}, ...]
  let slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const colCount = Math.min(stats.length, 3);
  const colW = 8.5 / colCount;

  stats.forEach((stat, i) => {
    const xPos = 0.75 + i * colW;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: colW - 0.5, h: 3.2,
      fill: { color: COLORS.light },
      shadow: makeShadow()
    });

    // Big number
    slide.addText(stat.value, {
      x: xPos, y: 1.6, w: colW - 0.5, h: 1.2,
      fontSize: 54, fontFace: FONTS.title,
      color: COLORS.accent, bold: true,
      align: "center", valign: "middle"
    });

    // Label
    slide.addText(stat.label, {
      x: xPos, y: 2.9, w: colW - 0.5, h: 0.5,
      fontSize: 18, fontFace: FONTS.body,
      color: COLORS.primary, bold: true,
      align: "center"
    });

    // Description
    if (stat.desc) {
      slide.addText(stat.desc, {
        x: xPos + 0.2, y: 3.4, w: colW - 0.9, h: 0.9,
        fontSize: 12, fontFace: FONTS.body,
        color: COLORS.muted, align: "center"
      });
    }
  });
}
```

---

## 5. Process / Timeline Slide

```javascript
function addProcessSlide(pres, title, steps) {
  // steps = [{num: "1", title: "Step Name", desc: "Details"}, ...]
  let slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const stepCount = steps.length;
  const stepW = 8.5 / stepCount;

  steps.forEach((step, i) => {
    const xPos = 0.75 + i * stepW;

    // Circle with number
    slide.addShape(pres.shapes.OVAL, {
      x: xPos + (stepW - 0.5) / 2 - 0.15, y: 1.5, w: 0.8, h: 0.8,
      fill: { color: COLORS.primary }
    });
    slide.addText(step.num, {
      x: xPos + (stepW - 0.5) / 2 - 0.15, y: 1.5, w: 0.8, h: 0.8,
      fontSize: 22, fontFace: FONTS.body,
      color: COLORS.white, align: "center", valign: "middle"
    });

    // Connector line (not for last step)
    if (i < stepCount - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: xPos + (stepW - 0.5) / 2 + 0.65, y: 1.9,
        w: stepW - 0.8, h: 0,
        line: { color: COLORS.secondary, width: 2, dashType: "dash" }
      });
    }

    // Step title
    slide.addText(step.title, {
      x: xPos, y: 2.5, w: stepW - 0.5, h: 0.5,
      fontSize: 16, fontFace: FONTS.body,
      color: COLORS.text, bold: true,
      align: "center"
    });

    // Step description
    slide.addText(step.desc, {
      x: xPos, y: 3.0, w: stepW - 0.5, h: 1.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.muted, align: "center",
      valign: "top"
    });
  });
}
```

---

## 6. Comparison Slide

```javascript
function addComparisonSlide(pres, title, leftTitle, leftItems, rightTitle, rightItems) {
  let slide = pres.addSlide();
  slide.background = { color: COLORS.light };

  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Left card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.2, h: 3.8,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  // Left header bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.2, h: 0.6,
    fill: { color: COLORS.primary }
  });
  slide.addText(leftTitle, {
    x: 0.5, y: 1.2, w: 4.2, h: 0.6,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });

  const leftText = leftItems.map(item => ({
    text: item, options: { bullet: true, breakLine: true }
  }));
  slide.addText(leftText, {
    x: 0.8, y: 2.0, w: 3.6, h: 2.8,
    fontSize: 14, fontFace: FONTS.body,
    color: COLORS.text, valign: "top"
  });

  // Right card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.2, w: 4.2, h: 3.8,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.2, w: 4.2, h: 0.6,
    fill: { color: COLORS.accent }
  });
  slide.addText(rightTitle, {
    x: 5.3, y: 1.2, w: 4.2, h: 0.6,
    fontSize: 18, fontFace: FONTS.body,
    color: COLORS.white, bold: true,
    align: "center", valign: "middle"
  });

  const rightText = rightItems.map(item => ({
    text: item, options: { bullet: true, breakLine: true }
  }));
  slide.addText(rightText, {
    x: 5.6, y: 2.0, w: 3.6, h: 2.8,
    fontSize: 14, fontFace: FONTS.body,
    color: COLORS.text, valign: "top"
  });
}
```

---

## 7. Chart / Data Visualization Slide

```javascript
function addChartSlide(pres, title, chartType, chartData, description) {
  let slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  // Chart
  slide.addChart(chartType, chartData, {
    x: 0.5, y: 1.2, w: 6, h: 3.8,
    chartColors: [COLORS.primary, COLORS.accent, COLORS.secondary, "2EC4B6", "E71D36"],
    chartArea: { fill: { color: COLORS.white }, roundedCorners: true },
    catAxisLabelColor: COLORS.muted,
    valAxisLabelColor: COLORS.muted,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: COLORS.text,
    showLegend: chartData.length > 1,
    legendPos: "b"
  });

  // Description sidebar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7, y: 1.2, w: 2.5, h: 3.8,
    fill: { color: COLORS.light }
  });
  slide.addText(description, {
    x: 7.2, y: 1.4, w: 2.1, h: 3.4,
    fontSize: 12, fontFace: FONTS.body,
    color: COLORS.text, valign: "top",
    lineSpacingMultiple: 1.4
  });
}
```

---

## 8. Icon Grid Slide

```javascript
async function addIconGridSlide(pres, title, items, iconToBase64Fn) {
  // items = [{icon: IconComponent, title: "Item", desc: "Details"}, ...]
  let slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: FONTS.title,
    color: COLORS.primary, bold: true
  });

  const cols = items.length <= 4 ? 2 : 3;
  const rows = Math.ceil(items.length / cols);
  const cellW = 8.5 / cols;
  const cellH = 3.5 / rows;

  for (let i = 0; i < items.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const xPos = 0.75 + col * cellW;
    const yPos = 1.3 + row * cellH;

    // Icon circle background
    slide.addShape(pres.shapes.OVAL, {
      x: xPos + 0.1, y: yPos, w: 0.6, h: 0.6,
      fill: { color: COLORS.primary, transparency: 15 }
    });

    // Icon image (if icon function provided)
    if (iconToBase64Fn && items[i].icon) {
      const iconData = await iconToBase64Fn(items[i].icon, COLORS.primary, 256);
      slide.addImage({
        data: iconData,
        x: xPos + 0.2, y: yPos + 0.1, w: 0.4, h: 0.4
      });
    }

    // Item title
    slide.addText(items[i].title, {
      x: xPos + 0.9, y: yPos, w: cellW - 1.2, h: 0.35,
      fontSize: 15, fontFace: FONTS.body,
      color: COLORS.text, bold: true, margin: 0
    });

    // Item description
    slide.addText(items[i].desc, {
      x: xPos + 0.9, y: yPos + 0.35, w: cellW - 1.2, h: cellH - 0.5,
      fontSize: 12, fontFace: FONTS.body,
      color: COLORS.muted, margin: 0, valign: "top"
    });
  }
}
```

---

## 9. Key Takeaways Slide

```javascript
function addTakeawaysSlide(pres, takeaways) {
  // takeaways = ["Key point 1", "Key point 2", ...]
  let slide = pres.addSlide();
  slide.background = { color: COLORS.primary };

  slide.addText("Key Takeaways", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: FONTS.title,
    color: COLORS.white, bold: true
  });

  takeaways.forEach((point, i) => {
    const yPos = 1.4 + i * 0.85;

    // Accent dot
    slide.addShape(pres.shapes.OVAL, {
      x: 0.8, y: yPos + 0.08, w: 0.2, h: 0.2,
      fill: { color: COLORS.accent }
    });

    slide.addText(point, {
      x: 1.2, y: yPos, w: 8, h: 0.5,
      fontSize: 16, fontFace: FONTS.body,
      color: COLORS.white, valign: "middle"
    });
  });
}
```

---

## 10. Closing Slide

```javascript
function addClosingSlide(pres, mainText, subText) {
  let slide = pres.addSlide();
  slide.background = { color: COLORS.dark };

  // Decorative accent (matches title slide)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: COLORS.accent }
  });

  slide.addText(mainText || "Thank You", {
    x: 0.8, y: 1.5, w: 8.5, h: 1.5,
    fontSize: 44, fontFace: FONTS.title,
    color: COLORS.white, bold: true, align: "left"
  });

  slide.addText(subText || "Questions?", {
    x: 0.8, y: 3.0, w: 8.5, h: 0.8,
    fontSize: 20, fontFace: FONTS.body,
    color: COLORS.secondary, align: "left"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.1, w: 10, h: 0.525,
    fill: { color: COLORS.primary }
  });
}
```

---

## Recommended Color Palettes by Topic

| Topic Domain | Primary | Secondary | Accent | Dark |
|-------------|---------|-----------|--------|------|
| Technology / AI | `1E2761` | `CADCFC` | `F96167` | `0F1035` |
| Science / Research | `065A82` | `1C7293` | `F77F00` | `0A2342` |
| Agriculture / Nature | `2C5F2D` | `97BC62` | `F5A623` | `1A3A1C` |
| Business / Finance | `36454F` | `F2F2F2` | `E63946` | `1D2D35` |
| Health / Medical | `028090` | `00A896` | `FF6B6B` | `013A44` |
| Education | `6D2E46` | `A26769` | `FFD166` | `3D1929` |
| Creative / Design | `6C63FF` | `B8B5FF` | `FF6584` | `2D2B55` |
| Environment | `3D5A80` | `98C1D9` | `EE6C4D` | `293241` |