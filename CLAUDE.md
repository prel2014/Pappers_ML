# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Propósito del repositorio

Base de conocimiento de ~150+ papers de IA/ML organizados temáticamente, con síntesis destiladas y una skill para generar presentaciones PPTX. El repositorio tiene tres capas:

1. **PDFs originales** — papers organizados por colección temática
2. **Base destilada** (`destilacion/`) — 19 archivos markdown que sintetizan conceptos transversales a todos los papers
3. **Skill de slides** (`.claude/skills/slide-generator/`) — genera presentaciones PPTX a partir de PDFs y/o markdowns

## Generar presentaciones

Para crear slides a partir de los papers o notas destiladas, usar la skill:

```
/slide-generator
```

La skill usa `pptxgenjs` (instalado en `node_modules/`). No requiere setup adicional: las dependencias ya están instaladas via `npm install`.

## Estructura de carpetas de papers

| Colección | Ruta | Contenido |
|-----------|------|-----------|
| LLMs fundamentos | `fundamentos/` | Attention, BERT, GPT-3, Llama 2/3 |
| Multimodal | `multimodal/` | CLIP, Flamingo, BLIP-2, LLaVA, GPT-4, Gemini |
| Entrenamiento | `entrenamiento/` | LoRA, QLoRA, InstructGPT, DPO, Mistral |
| Optimización | `optimizacion/` | FlashAttention, GPTQ, LLM.int8, Speculative Decoding |
| Arquitecturas | `arquitecturas/` | Switch Transformer, Mamba, Mamba-2, Mixtral |
| RAG | `rag/` | RAG original, REALM, HyDE, Self-RAG, CRAG |
| JEPA core | `jepa/core/` | LeCun path paper, I-JEPA, V-JEPA, V-JEPA 2, IWM |
| JEPA variantes | `jepa/variantes/` | A-JEPA, Graph-JEPA, 3D-JEPA, M3-JEPA, etc. |
| JEPA aplicaciones | `jepa/aplicaciones/` | Brain-JEPA, robotics, autonomous driving, RL |
| JEPA teoría | `jepa/teoria/` | Collapse avoidance, energy functions |
| Difusión fundamentos | `difusion/fundamentos/` | DDPM, DDIM, Score SDE, CFG |
| Difusión variantes | `difusion/variantes/` | LDM/SD, DALL-E 2, Imagen, Flow Matching |
| Difusión optimización | `difusion/optimizacion/` | DPM-Solver, LCM, Consistency Models |
| Difusión fine-tuning | `difusion/finetuning/` | DreamBooth, ControlNet, IP-Adapter, LoRA |
| Difusión arquitecturas | `difusion/arquitecturas/` | U-Net, DiT, SDXL, SD3/MM-DiT |
| Difusión video | `difusion/video/` | Video Diffusion, SVD, CogVideoX |
| Difusión 3D | `difusion/multimodal/` | DreamFusion, Zero123, MVDiffusion |

## Base de conocimiento destilada (`destilacion/`)

El `INDEX.md` dentro de `destilacion/` es el punto de entrada. Los 19 archivos están organizados en 4 niveles de estudio:

- **Conceptos** (01-06): atención, SSL, representaciones, objetivos, generación condicionada, scaling
- **Técnicas** (07-11): fine-tuning eficiente, cuantización, destilación, inferencia rápida, RLHF
- **Arquitecturas** (12-16): Transformers, difusión, JEPA/world models, MoE, Mamba/SSM
- **Dominios** (17-19): visión-lenguaje, RAG, generación visual

Cada archivo sintetiza cómo un concepto aparece y evoluciona a través de múltiples papers, no es un resumen paper-por-paper.
