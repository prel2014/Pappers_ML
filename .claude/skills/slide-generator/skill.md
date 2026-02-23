---
name: slide-generator
description: "Generate presentation slides (PPTX) that explain a specific topic extracted from PDF and/or Markdown source documents. Use this skill whenever the user provides PDF files, Markdown files, or both, and wants Claude to create a slide deck that teaches, summarizes, or explains the content. Trigger on phrases like 'make slides from this PDF', 'create a presentation about [topic] from these notes', 'generate a deck explaining this document', 'turn this markdown into slides', 'explain this topic in a presentation', or any request combining source documents (PDF/MD) with presentation output. Also trigger when the user uploads PDFs or .md files and asks for an explanation, summary, or teaching material in slide format — even if they don't explicitly say 'PPTX' or 'PowerPoint'."
---

# Slide Generator from PDF & Markdown Sources

Generate professional, visually engaging PPTX presentations that explain a specific topic using content extracted from PDF and/or Markdown source files.

## Workflow Overview

```
1. Extract content from sources (PDF / Markdown)
2. Identify the target topic and audience level
3. Structure a pedagogical outline
4. Generate PPTX with rich visual design
5. QA: content check + visual inspection
6. Deliver final file
```

---

## Step 1: Extract Content from Sources

### PDF Files
```python
# Primary method: pdfplumber for text + tables
import pdfplumber

with pdfplumber.open("source.pdf") as pdf:
    full_text = ""
    tables = []
    for page in pdf.pages:
        full_text += page.extract_text() or ""
        full_text += "\n\n"
        page_tables = page.extract_tables()
        if page_tables:
            tables.extend(page_tables)
```

If text extraction fails (scanned PDF), use OCR:
```bash
# Fallback: OCR via pytesseract
pip install pytesseract pdf2image --break-system-packages
```
```python
from pdf2image import convert_from_path
import pytesseract

images = convert_from_path('scanned.pdf')
text = "\n\n".join(pytesseract.image_to_string(img) for img in images)
```

### Markdown Files
```python
# Read markdown directly — it's already structured
with open("source.md", "r") as f:
    md_content = f.read()
```

Parse heading structure to understand document organization:
```python
import re

headings = re.findall(r'^(#{1,6})\s+(.+)$', md_content, re.MULTILINE)
# Returns list of (level, title) tuples
```

### Combined Extraction
When multiple sources are provided:
1. Extract all sources into a single text corpus
2. Label each section with its source for traceability
3. Deduplicate overlapping content
4. Merge tables from all sources

Save extracted content to a working file:
```python
with open("/home/claude/extracted_content.txt", "w") as f:
    f.write(full_text)
```

---

## Step 2: Analyze Content & Plan the Presentation

Before writing slides, analyze the extracted content to create a **pedagogical outline**:

### Topic Analysis Checklist
- **Core topic**: What is the main subject?
- **Key concepts**: What are the 5-8 essential ideas?
- **Audience level**: Beginner / Intermediate / Advanced?
- **Data & numbers**: Any statistics, metrics, or comparisons to visualize?
- **Relationships**: Any processes, hierarchies, or timelines to diagram?
- **Examples**: Concrete examples or case studies in the source?

### Slide Structure Template

Aim for **8-15 slides** (adjustable based on content depth):

| Slide # | Purpose | Design Approach |
|---------|---------|-----------------|
| 1 | Title slide | Bold title, subtitle, dark background |
| 2 | Overview / Agenda | 3-5 key topics listed visually |
| 3-4 | Core concept 1 | Two-column or icon+text layout |
| 5-6 | Core concept 2 | Stats callout or comparison |
| 7-8 | Core concept 3 | Process/timeline diagram |
| 9-10 | Data/Evidence | Chart or table visualization |
| 11-12 | Examples/Cases | Image + description layout |
| 13 | Summary / Key Takeaways | Icon grid with short bullets |
| 14 | Closing / Q&A | Minimal, clean design |

**Important**: Vary layouts across slides. Never repeat the same layout on consecutive slides.

---

## Step 3: Generate the PPTX

Use PptxGenJS to create the presentation. Read the **pptx skill's pptxgenjs.md** for detailed API reference.

### Setup
```bash
npm install -g pptxgenjs react-icons react react-dom sharp
```

### Design Principles (MANDATORY)

1. **Choose a topic-informed color palette** — don't default to blue. Pick colors that reflect the subject matter.
2. **Every slide needs a visual element** — shape, icon, chart, or colored block. NO text-only slides.
3. **Vary layouts** — alternate between two-column, icon grids, stat callouts, timelines, and full-width designs.
4. **Use font size hierarchy**: Titles 36-44pt, section headers 20-24pt, body 14-16pt, captions 10-12pt.
5. **Leave breathing room**: 0.5" minimum margins, 0.3-0.5" gaps between elements.
6. **NEVER use accent lines under titles** — this is a hallmark of AI-generated slides.
7. **Dark backgrounds for title + closing slides**, light for content slides.

### Slide Type Templates

See `references/slide_templates.md` for ready-to-use JavaScript code for each slide type:
- Title slide (dark background, large text)
- Agenda/overview (numbered items with icons)
- Two-column content (text left, visual right)
- Stat callout (big number + context)
- Process/timeline (horizontal steps)
- Comparison (side-by-side columns)
- Data visualization (chart integration)
- Icon grid (4-6 items with icons)
- Key takeaways (summary list)
- Closing slide (Q&A or contact)

### Script Structure

```javascript
const pptxgen = require("pptxgenjs");

// === CONFIGURATION ===
const COLORS = {
  primary: "1E2761",    // Choose based on topic
  secondary: "CADCFC",
  accent: "F96167",
  dark: "1A1A2E",
  light: "F5F5F5",
  text: "2D2D2D",
  muted: "6B7280"
};

const FONTS = {
  title: "Georgia",
  body: "Calibri"
};

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Presentation Title";

// === SLIDE GENERATION ===
// [Generate each slide with varied layouts]

// === SAVE ===
pres.writeFile({ fileName: "/home/claude/presentation.pptx" });
```

### Speaker Notes

Add speaker notes to each slide with expanded explanations from the source material:
```javascript
slide.addNotes("Detailed explanation from the source document...");
```

This is a key differentiator — the slides show concise visual content while the notes contain the full context from the PDF/Markdown sources.

---

## Step 4: Quality Assurance (REQUIRED)

### Content QA
```bash
pip install "markitdown[pptx]" --break-system-packages
python -m markitdown presentation.pptx
```
Verify: no missing content, correct order, no typos, all key concepts covered.

### Visual QA
```bash
python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf /home/claude/presentation.pptx
pdftoppm -jpeg -r 150 /home/claude/presentation.pdf /home/claude/slide
```

Inspect each slide image. Check for:
- Overlapping elements
- Text overflow or cut-off
- Uneven spacing
- Low contrast text/icons
- Missing visual elements
- Layout monotony (same design repeated)

### Fix & Re-verify
1. Fix any issues found
2. Re-render affected slides
3. Confirm fixes didn't create new problems

---

## Step 5: Deliver

Copy final file to output:
```bash
cp /home/claude/presentation.pptx /mnt/user-data/outputs/presentation.pptx
```

---

## Key Reminders

- **Content fidelity**: All information in the slides must come from the provided sources. Don't invent data.
- **Pedagogical flow**: Structure slides to teach, not just dump information. Build from simple to complex.
- **Visual variety**: NEVER use the same layout for consecutive slides.
- **Speaker notes**: Always include expanded content from sources in the notes.
- **Data visualization**: Convert tables and numbers from sources into charts when possible.
- **Concise slides**: Each slide should have ONE main idea. Break complex topics into multiple slides.