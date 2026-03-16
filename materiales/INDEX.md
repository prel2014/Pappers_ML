# Fabricación de Nuevos Materiales — Índice

Base de conocimiento sobre síntesis, fabricación y caracterización de materiales avanzados.
Organizada en 7 áreas temáticas con papers, técnicas, instrumentos y condiciones requeridas.

---

## Mapa de la colección

| Área | Carpeta | Enfoque |
|------|---------|---------|
| Fundamentos de síntesis | `fundamentos/` | Principios termodinámicos y cinéticos |
| Técnicas de deposición | `tecnicas_deposicion/` | CVD, PVD, ALD, sputtering, MBE |
| Nanomateriales | `nanomateriales/` | Nanopartículas, nanotubos, grafeno, 2D materials |
| Biomateriales | `biomateriales/` | Scaffolds, hidrogeles, biocerámica, implantes |
| Composites | `composites/` | Polímero-matriz, metal-matriz, nanocomposites |
| IA para materiales | `ai_materiales/` | MatterGen, diseño inverso, high-throughput |
| Caracterización | `caracterizacion/` | XRD, SEM, TEM, AFM, XPS, Raman |

---

## Nivel 1 — Fundamentos de Síntesis (`fundamentos/`)

### Papers descargados ✓

| Archivo | Paper | Año | Fuente |
|---------|-------|-----|--------|
| `cleanroom_environmental_impact_LCA.pdf` | Environmental Impact and LCA of Cleanrooms | 2024 | PMC11685627 (Scientific Reports) |
| `mini_cleanroom_ATMP_bioengineering.pdf` | Mini-cleanroom for ATMP Bioengineering | 2021 | MDPI Pharmaceutics 13(8) |
| `cleanroom_airflow_contamination_control.pdf` | Cleanroom Airflow & Contamination Control | 2022 | MDPI Atmosphere 13(2) |

### Papers adicionales (no descargados)

| Paper | Año | URL |
|-------|-----|-----|
| Thin Film Deposition Techniques: A Comprehensive Review | 2024 | https://article.innovationforever.com/JMN/20240268.html |
| Atomic layer deposition — principles to film properties | 2022 | https://www.sciencedirect.com/science/article/pii/S2238785422016039 |

### Técnicas principales

| Técnica | Principio | Temperatura típica | Aplicación |
|---------|-----------|-------------------|------------|
| **CVD** (Chemical Vapor Deposition) | Reacción química de gases precursores | 300–1200°C | Semiconductores, grafeno, diamante |
| **PVD** (Physical Vapor Deposition) | Evaporación/sputtering físico | Ambiente–600°C | Recubrimientos metálicos, ópticos |
| **ALD** (Atomic Layer Deposition) | Reacciones superficiales auto-limitantes | 50–400°C | Films <10nm, alta conformidad |
| **Sputtering** | Bombardeo iónico de target | Ambiente | Metalización, ITO, TiN |
| **MBE** (Molecular Beam Epitaxy) | Haces moleculares en UHV | 400–800°C | Semiconductores III-V, 2D materials |
| **Sol-gel** | Hidrólisis/condensación química | Ambiente → 600°C | Óxidos, cerámicas, recubrimientos |
| **Hidrotérmico** | Síntesis en autoclave (agua + presión) | 100–300°C | Zeolitas, nanopartículas, perovskitas |
| **3D printing / AM** | Fusión/sinterización capa a capa | Variable | Bioimplantes, metales, cerámicas |

---

## Nivel 2 — Técnicas de Deposición (`tecnicas_deposicion/`)

### Papers descargados ✓

| Archivo | Paper | Año | Fuente |
|---------|-------|-----|--------|
| `ALD_particulate_materials_review_2025.pdf` | ALD for Particulate Materials: A Review | 2025 | arxiv:2506.17725 |
| `thin_films_next_gen_technologies_2024.pdf` | Thin Films for Next Generation Technologies | 2024 | MDPI Processes 13(12) |
| `silicon_nitride_magnetron_sputtering_2023.pdf` | Silicon Nitride by Magnetron Sputtering | 2023 | Frontiers in Physics |
| `iCVD_polymer_nanolayers.pdf` | iCVD Polymer Nanolayers | 2021 | Frontiers Bioengineering |
| `thin_conducting_films_preparation_methods_2024.pdf` | Thin Conducting Films: Preparation Methods | 2024 | PMC11432801 (Materials) |

### Máquinas e instrumentos requeridos

| Instrumento | Uso | Rango de precio (USD) |
|-------------|-----|----------------------|
| CVD reactor (LPCVD/PECVD) | Deposición de films | 50k–500k |
| Sputter coater (magnetron) | Deposición PVD metales | 20k–300k |
| ALD reactor (thermal/plasma) | Films ultra-delgados <10nm | 100k–600k |
| MBE system | Epitaxia en UHV | 500k–2M |
| Spin coater | Deposición sol-gel / resist | 5k–30k |
| Autoclave hidrotermal | Síntesis a presión | 2k–20k |
| 3D printer metálico (SLM/EBM) | Manufactura aditiva | 200k–1M |

---

## Nivel 3 — Nanomateriales (`nanomateriales/`)

### Papers descargados ✓

| Archivo | Paper | Año | Fuente |
|---------|-------|-----|--------|
| `CNT_synthesis_machine_learning_automation_2024.pdf` | CNT Synthesis: ML & Automation | 2024 | arxiv:2404.01006 |
| `graphene_CNT_semiconductor_applications_2022.pdf` | Graphene & CNT in Semiconductors | 2022 | PMC9412642 (Micromachines) |
| `semiconductor_quantum_dots_synthesis_2024.pdf` | Semiconductor Quantum Dots Synthesis | 2024 | MDPI Nanomaterials 14(22) |
| `carbon_quantum_dots_catalysis_2024.pdf` | Carbon Quantum Dots for Catalysis | 2024 | MDPI Catalysts 13(2) |

### Técnicas específicas para nanomateriales

| Técnica | Producto | Condición crítica |
|---------|----------|------------------|
| Reducción química | Nanopartículas Au, Ag, Fe3O4 | pH, temperatura, agitación controlada |
| CVD + catalizador Fe/Ni | Nanotubos de carbono (CNTs) | 700–900°C, atmósfera inerte |
| Exfoliación mecánica | Grafeno, MoS2 | Ambiente controlado (humedad <40%) |
| CVD en Cu/SiC | Grafeno monocapa | 1000°C, H2/CH4, UHV |
| Síntesis solvotermal | Quantum dots (CdSe, ZnS) | Temperatura precisa ±2°C, inerte |

---

## Nivel 4 — Biomateriales (`biomateriales/`)

### Papers descargados ✓

| Archivo | Paper | Año | Fuente |
|---------|-------|-----|--------|
| `3D_printing_bone_scaffolds_biodegradable_2024.pdf` | 3D Printing Biodegradable Bone Scaffolds | 2024 | Frontiers Bioeng Biotech |
| `bone_scaffold_mechanical_biological_3D_2025.pdf` | Bone Scaffold: Mechanical & Biological Properties | 2025 | Frontiers Bioeng Biotech |
| `alginate_hydrogels_biomedical_applications.pdf` | Alginate Hydrogels for Biomedical Applications | 2023 | PMC10055882 |
| `hydrogel_scaffolds_tissue_engineering_2013.pdf` | Hydrogel Scaffolds for Tissue Engineering | 2013 | PMC3963751 |
| `titanium_scaffold_angiogenesis_osteogenesis_2024.pdf` | Titanium Scaffold: Angiogenesis & Osteogenesis | 2024 | Frontiers Bioeng Biotech |

### Categorías de biomateriales y técnicas

| Categoría | Ejemplos | Técnica de fabricación |
|-----------|----------|----------------------|
| Biocerámica | HA, TCP, zirconia | Sinterización, SLA/SLS 3D printing |
| Hidrogeles | PEG, colágeno, alginato | Crosslinking UV/químico, bioprinting |
| Metales bioactivos | Ti-6Al-4V, Co-Cr, acero 316L | EBM, SLM, anodizado, recubrimientos ALD |
| Polímeros biodegradables | PLA, PLGA, PCL | Electrospinning, 3D printing FDM |
| Nanocomposites | HA/PLGA, CNT/polímero | Solución casting, electrospinning |

---

## Nivel 5 — IA para Diseño de Materiales (`ai_materiales/`)

### Papers descargados ✓

| Archivo | Paper | Año | Fuente |
|---------|-------|-----|--------|
| `AI_inverse_design_materials_review_2025.pdf` | AI for Inverse Design of Materials: Review | 2025 | arxiv:2411.09429 |
| `generative_DL_inverse_design_materials_2024.pdf` | Generative DL for Inverse Design | 2024 | arxiv:2409.19124 |
| `dZiner_AI_agent_materials_design_2024.pdf` | dZiner: AI Agent for Materials Design | 2024 | arxiv:2410.03963 |
| `AI_driven_materials_science_MatterGen_2024.pdf` | MatterGen: AI-Driven Materials Science | 2024 | arxiv:2402.05799 |

### Herramientas IA actuales

| Herramienta | Organización | Capacidad |
|-------------|-------------|-----------|
| **MatterGen** | Microsoft | Genera estructuras de materiales inorgánicos |
| **GNoME** | DeepMind | 2.2M nuevas estructuras estables predichas |
| **M3GNet** | UC San Diego | Potencial interatómico ML universal |
| **CGCNN / MEGNet** | MIT / Google | Predicción de propiedades desde estructura |
| **Bayesian Opt. + DFT** | Múltiples | High-throughput virtual screening |

---

## Nivel 6 — Caracterización (`caracterizacion/`)

### Instrumentos de caracterización esenciales

| Instrumento | Sigla | Qué mide | Resolución |
|-------------|-------|----------|------------|
| X-Ray Diffraction | XRD | Estructura cristalina, fases | ~nm (bulk) |
| Scanning Electron Microscope | SEM | Morfología superficial | 1–20 nm |
| Transmission Electron Microscope | TEM | Estructura atómica, interfaces | <0.1 nm |
| Atomic Force Microscope | AFM | Topografía, dureza superficial | <1 nm |
| X-Ray Photoelectron Spectroscopy | XPS | Composición química superficial | ~10 nm profundidad |
| Raman Spectroscopy | — | Enlace químico, grafeno, fases | ~1 µm lateral |
| Energy Dispersive X-ray | EDX/EDS | Composición elemental local | ~1 µm |
| SQUID Magnetometer | SQUID | Propiedades magnéticas | pT sensibilidad |
| Ellipsometer | — | Espesor de films ópticos | <0.1 nm |
| Nanoindenter | — | Dureza/módulo a nanoescala | — |

---

## Condiciones Ambientales por Técnica

| Entorno | Estándar | Técnicas que lo requieren | Parámetros controlados |
|---------|---------|--------------------------|----------------------|
| **Sala limpia ISO 4** | ISO 14644-1 | Litografía, semiconductores | <10 partículas/m³ ≥0.1µm, T=21°C±0.5, HR=45%±5 |
| **Sala limpia ISO 6** | ISO 14644-1 | Deposición general, MEMS | <35,200 partículas/m³ ≥0.5µm |
| **Ultra-High Vacuum (UHV)** | <10⁻⁹ Torr | MBE, XPS, ALD de precisión | Bomba turbomolecular + iónica |
| **Atmósfera inerte** | N₂ o Ar glovebox | Síntesis quantum dots, Li batteries | O₂ <1ppm, H₂O <1ppm |
| **Temperatura criogénica** | 4–77 K | SQUID, superconductores | Helio líquido o nitrógeno líquido |
| **Alta presión** | 1–300 bar | Síntesis hidrotermal | Autoclave de acero inoxidable |

---

## Profesionales requeridos

| Perfil | Rol | Formación típica |
|--------|-----|-----------------|
| Ingeniero/a de Materiales | Diseño y síntesis | Ing. Materiales, MSc/PhD |
| Físico/a de estado sólido | Propiedades electrónicas/magnéticas | Física, PhD |
| Químico/a inorgánico/a | Síntesis sol-gel, hidrotermal | Química, MSc/PhD |
| Ingeniero/a de Procesos | Escala pilot → producción | Ing. Química/Industrial |
| Bioingeniero/a | Biomateriales, scaffolds | Bioingeniería, MSc/PhD |
| Especialista en litografía | Nanofabricación semiconductor | EE o Materiales, MSc |
| Científico/a computacional | DFT, ML, diseño inverso | Física/Química computacional |
| Técnico/a de sala limpia | Operación equipos | Técnico especializado |

---

## Conexiones con otros temas del repositorio

| Concepto | Relevancia aquí | Donde ver en este repo |
|----------|----------------|----------------------|
| Transformer / Attention | GNoME, MatterGen usan transformers | `fundamentos/`, `destilacion/01_` |
| Diffusion models | Generación de estructuras de materiales | `difusion/fundamentos/` |
| Graph Neural Networks | CGCNN, MEGNet para propiedades | `arquitecturas/` |
| Self-supervised learning | Pretraining de modelos de materiales | `destilacion/02_ssl_contrastivo.md` |
| AlphaFold2 | Predicción estructura proteínas → análogo en materiales | `proteinas/` |
