# Base de Conocimiento Destilada — UPAO RAG Papers

> Síntesis temática de 113 papers organizados en 19 archivos conceptuales.
> En lugar de un resumen por paper, cada MD sintetiza cómo una técnica o concepto aparece y evoluciona a través de múltiples colecciones.

---

## Tabla de contenidos temática

| # | Archivo | Descripción |
|---|---------|-------------|
| 01 | [conceptos/01_atencion_transformers.md](conceptos/01_atencion_transformers.md) | Self-attention, MHA, positional encoding y la familia Transformer |
| 02 | [conceptos/02_self_supervised_learning.md](conceptos/02_self_supervised_learning.md) | Masking, contrastive learning y predictive coding |
| 03 | [conceptos/03_representaciones.md](conceptos/03_representaciones.md) | Latent spaces, embeddings y jerarquías de features |
| 04 | [conceptos/04_objetivos_entrenamiento.md](conceptos/04_objetivos_entrenamiento.md) | CE, MSE, ELBO, score matching, InfoNCE, SDS y otros objetivos |
| 05 | [conceptos/05_generacion_condicionada.md](conceptos/05_generacion_condicionada.md) | CFG, cross-attention, conditioning y control de la generación |
| 06 | [conceptos/06_scaling_emergencia.md](conceptos/06_scaling_emergencia.md) | Scaling laws, capacidades emergentes y compute-optimal training |
| 07 | [tecnicas/07_fine_tuning_eficiente.md](tecnicas/07_fine_tuning_eficiente.md) | LoRA, QLoRA, adapters, DreamBooth y prefix tuning |
| 08 | [tecnicas/08_cuantizacion.md](tecnicas/08_cuantizacion.md) | GPTQ, LLM.int8(), QLoRA, AWQ y técnicas de compresión |
| 09 | [tecnicas/09_destilacion_conocimiento.md](tecnicas/09_destilacion_conocimiento.md) | Knowledge distillation, progressive distillation y LCM |
| 10 | [tecnicas/10_inferencia_rapida.md](tecnicas/10_inferencia_rapida.md) | Flash Attention, speculative decoding, DDIM, DPM-Solver |
| 11 | [tecnicas/11_rlhf_y_alineacion.md](tecnicas/11_rlhf_y_alineacion.md) | RLHF, reward models, DPO e InstructGPT |
| 12 | [arquitecturas/12_transformer_y_variantes.md](arquitecturas/12_transformer_y_variantes.md) | BERT, GPT, T5, Llama, Mistral y la genealogía Transformer |
| 13 | [arquitecturas/13_modelos_difusion.md](arquitecturas/13_modelos_difusion.md) | DDPM→LDM→DiT→SD3, flow matching y consistency models |
| 14 | [arquitecturas/14_jepa_world_models.md](arquitecturas/14_jepa_world_models.md) | LeCun, I-JEPA, V-JEPA 2, energy-based world models |
| 15 | [arquitecturas/15_moe_escalado.md](arquitecturas/15_moe_escalado.md) | Switch Transformer, Mixtral, routing y sparse MoE |
| 16 | [arquitecturas/16_ssm_mamba.md](arquitecturas/16_ssm_mamba.md) | SSMs, Mamba, HiPPO y relación con Transformers |
| 17 | [dominios/17_vision_lenguaje.md](dominios/17_vision_lenguaje.md) | CLIP, Flamingo, BLIP-2, LLaVA, GPT-4V y modelos VLM |
| 18 | [dominios/18_rag_retrieval.md](dominios/18_rag_retrieval.md) | RAG, REALM, HyDE, Self-RAG, CRAG y recuperación aumentada |
| 19 | [dominios/19_generacion_visual.md](dominios/19_generacion_visual.md) | Video diffusion, 3D generativo, V-JEPA y visión generativa |

---

## Inventario completo de papers

### LLMs — Fundamentos (`papers/fundamentos/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2017 | [2017_attention_is_all_you_need.pdf](../fundamentos/2017_attention_is_all_you_need.pdf) | Attention Is All You Need |
| 2018 | [2018_bert.pdf](../fundamentos/2018_bert.pdf) | BERT: Pre-training of Deep Bidirectional Transformers |
| 2020 | [2020_gpt3.pdf](../fundamentos/2020_gpt3.pdf) | Language Models are Few-Shot Learners (GPT-3) |
| 2023 | [2023_llama2.pdf](../fundamentos/2023_llama2.pdf) | Llama 2: Open Foundation and Fine-Tuned Chat Models |
| 2024 | [2024_llama3.pdf](../fundamentos/2024_llama3.pdf) | The Llama 3 Herd of Models |

### LLMs — Multimodal (`papers/multimodal/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2021 | [2021_clip.pdf](../multimodal/2021_clip.pdf) | Learning Transferable Visual Models From Natural Language Supervision (CLIP) |
| 2022 | [2022_flamingo.pdf](../multimodal/2022_flamingo.pdf) | Flamingo: a Visual Language Model for Few-Shot Learning |
| 2023 | [2023_blip2.pdf](../multimodal/2023_blip2.pdf) | BLIP-2: Bootstrapping Language-Image Pre-training |
| 2023 | [2023_gemini.pdf](../multimodal/2023_gemini.pdf) | Gemini: A Family of Highly Capable Multimodal Models |
| 2023 | [2023_gpt4.pdf](../multimodal/2023_gpt4.pdf) | GPT-4 Technical Report |
| 2023 | [2023_llava.pdf](../multimodal/2023_llava.pdf) | Visual Instruction Tuning (LLaVA) |
| 2024 | [2024_llava_next.pdf](../multimodal/2024_llava_next.pdf) | LLaVA-NeXT: Improved Reasoning, OCR, and World Knowledge |

### LLMs — Entrenamiento (`papers/entrenamiento/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2021 | [2021_lora.pdf](../entrenamiento/2021_lora.pdf) | LoRA: Low-Rank Adaptation of Large Language Models |
| 2022 | [2022_instructgpt_rlhf.pdf](../entrenamiento/2022_instructgpt_rlhf.pdf) | Training language models to follow instructions (InstructGPT) |
| 2023 | [2023_dpo.pdf](../entrenamiento/2023_dpo.pdf) | Direct Preference Optimization |
| 2023 | [2023_mistral.pdf](../entrenamiento/2023_mistral.pdf) | Mistral 7B |
| 2023 | [2023_qlora.pdf](../entrenamiento/2023_qlora.pdf) | QLoRA: Efficient Finetuning of Quantized LLMs |

### LLMs — Optimización (`papers/optimizacion/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2022 | [2022_flash_attention.pdf](../optimizacion/2022_flash_attention.pdf) | FlashAttention: Fast and Memory-Efficient Exact Attention |
| 2022 | [2022_gptq.pdf](../optimizacion/2022_gptq.pdf) | GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers |
| 2022 | [2022_llm_int8.pdf](../optimizacion/2022_llm_int8.pdf) | LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale |
| 2022 | [2022_speculative_decoding.pdf](../optimizacion/2022_speculative_decoding.pdf) | Fast Inference from Transformers via Speculative Decoding |
| 2023 | [2023_flash_attention2.pdf](../optimizacion/2023_flash_attention2.pdf) | FlashAttention-2: Faster Attention with Better Parallelism |
| 2023 | [2023_knowledge_distillation.pdf](../optimizacion/2023_knowledge_distillation.pdf) | Knowledge Distillation: A Survey |

### LLMs — Arquitecturas (`papers/arquitecturas/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2021 | [2021_switch_transformer.pdf](../arquitecturas/2021_switch_transformer.pdf) | Switch Transformers: Scaling to Trillion Parameter Models |
| 2023 | [2023_mamba.pdf](../arquitecturas/2023_mamba.pdf) | Mamba: Linear-Time Sequence Modeling with Selective State Spaces |
| 2024 | [2024_mamba2.pdf](../arquitecturas/2024_mamba2.pdf) | Transformers are SSMs: Generalized Models and Efficient Algorithms (Mamba-2) |
| 2024 | [2024_mixtral.pdf](../arquitecturas/2024_mixtral.pdf) | Mixtral of Experts |

### LLMs — RAG (`papers/rag/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2020 | [2020_rag_original.pdf](../rag/2020_rag_original.pdf) | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks |
| 2020 | [2020_realm.pdf](../rag/2020_realm.pdf) | REALM: Retrieval-Augmented Language Model Pre-Training |
| 2022 | [2022_hyde.pdf](../rag/2022_hyde.pdf) | Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE) |
| 2023 | [2023_rag_survey.pdf](../rag/2023_rag_survey.pdf) | Retrieval-Augmented Generation for Large Language Models: A Survey |
| 2023 | [2023_self_rag.pdf](../rag/2023_self_rag.pdf) | Self-RAG: Learning to Retrieve, Generate and Critique |
| 2024 | [2024_corrective_rag.pdf](../rag/2024_corrective_rag.pdf) | Corrective Retrieval Augmented Generation (CRAG) |

### Difusión — Fundamentos (`papers/difusion/fundamentos/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2015 | [2015_nonequilibrium_thermodynamics.pdf](../difusion/fundamentos/2015_nonequilibrium_thermodynamics.pdf) | Deep Unsupervised Learning using Nonequilibrium Thermodynamics |
| 2019 | [2019_ncsn_score_matching.pdf](../difusion/fundamentos/2019_ncsn_score_matching.pdf) | Generative Modeling by Estimating Gradients of the Data Distribution (NCSN) |
| 2020 | [2020_ddim.pdf](../difusion/fundamentos/2020_ddim.pdf) | Denoising Diffusion Implicit Models (DDIM) |
| 2020 | [2020_ddpm.pdf](../difusion/fundamentos/2020_ddpm.pdf) | Denoising Diffusion Probabilistic Models (DDPM) |
| 2021 | [2021_diffusion_beat_gans.pdf](../difusion/fundamentos/2021_diffusion_beat_gans.pdf) | Diffusion Models Beat GANs on Image Synthesis |
| 2021 | [2021_improved_ddpm.pdf](../difusion/fundamentos/2021_improved_ddpm.pdf) | Improved Denoising Diffusion Probabilistic Models |
| 2021 | [2021_score_sde.pdf](../difusion/fundamentos/2021_score_sde.pdf) | Score-Based Generative Modeling through SDEs |
| 2022 | [2022_classifier_free_guidance.pdf](../difusion/fundamentos/2022_classifier_free_guidance.pdf) | Classifier-Free Diffusion Guidance (CFG) |

### Difusión — Variantes (`papers/difusion/variantes/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2021 | [2021_glide.pdf](../difusion/variantes/2021_glide.pdf) | GLIDE: Towards Photorealistic Image Generation with Text-Guided Diffusion |
| 2022 | [2022_dalle2.pdf](../difusion/variantes/2022_dalle2.pdf) | Hierarchical Text-Conditional Image Generation with CLIP Latents (DALL-E 2) |
| 2022 | [2022_flow_matching.pdf](../difusion/variantes/2022_flow_matching.pdf) | Flow Matching for Generative Modeling |
| 2022 | [2022_imagen.pdf](../difusion/variantes/2022_imagen.pdf) | Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding (Imagen) |
| 2022 | [2022_ldm_stable_diffusion.pdf](../difusion/variantes/2022_ldm_stable_diffusion.pdf) | High-Resolution Image Synthesis with Latent Diffusion Models (LDM/SD) |
| 2022 | [2022_rectified_flow.pdf](../difusion/variantes/2022_rectified_flow.pdf) | Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow |
| 2023 | [2023_consistency_models.pdf](../difusion/variantes/2023_consistency_models.pdf) | Consistency Models |

### Difusión — Optimización (`papers/difusion/optimizacion/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2022 | [2022_dpm_solver.pdf](../difusion/optimizacion/2022_dpm_solver.pdf) | DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling |
| 2022 | [2022_dpm_solver_pp.pdf](../difusion/optimizacion/2022_dpm_solver_pp.pdf) | DPM-Solver++: Fast Solver for Guided Sampling of Diffusion Probabilistic Models |
| 2022 | [2022_plms.pdf](../difusion/optimizacion/2022_plms.pdf) | Pseudo Numerical Methods for Diffusion Models on Manifolds (PLMS) |
| 2022 | [2022_progressive_distillation.pdf](../difusion/optimizacion/2022_progressive_distillation.pdf) | Progressive Distillation for Fast Sampling of Diffusion Models |
| 2023 | [2023_distillation_guided.pdf](../difusion/optimizacion/2023_distillation_guided.pdf) | Guided Distillation for Diffusion Models |
| 2023 | [2023_improved_consistency.pdf](../difusion/optimizacion/2023_improved_consistency.pdf) | Improved Consistency Training |
| 2023 | [2023_lcm_latent_consistency.pdf](../difusion/optimizacion/2023_lcm_latent_consistency.pdf) | Latent Consistency Models (LCM) |
| 2023 | [2023_unipc.pdf](../difusion/optimizacion/2023_unipc.pdf) | UniPC: A Unified Predictor-Corrector Framework for Fast Sampling |

### Difusión — Fine-tuning (`papers/difusion/finetuning/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2021 | [2021_lora.pdf](../difusion/finetuning/2021_lora.pdf) | LoRA: Low-Rank Adaptation (aplicado a difusión) |
| 2022 | [2022_dreambooth.pdf](../difusion/finetuning/2022_dreambooth.pdf) | DreamBooth: Fine Tuning Text-to-Image Diffusion Models |
| 2022 | [2022_sdedit.pdf](../difusion/finetuning/2022_sdedit.pdf) | SDEdit: Guided Image Synthesis and Editing with Stochastic Differential Equations |
| 2022 | [2022_textual_inversion.pdf](../difusion/finetuning/2022_textual_inversion.pdf) | An Image is Worth One Word: Personalizing T2I with Textual Inversion |
| 2023 | [2023_controlnet.pdf](../difusion/finetuning/2023_controlnet.pdf) | Adding Conditional Control to Text-to-Image Diffusion Models (ControlNet) |
| 2023 | [2023_instructpix2pix.pdf](../difusion/finetuning/2023_instructpix2pix.pdf) | InstructPix2Pix: Learning to Follow Image Editing Instructions |
| 2023 | [2023_ip_adapter.pdf](../difusion/finetuning/2023_ip_adapter.pdf) | IP-Adapter: Text Compatible Image Prompt Adapter for Text-to-Image Diffusion Models |

### Difusión — Arquitecturas (`papers/difusion/arquitecturas/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2015 | [2015_unet.pdf](../difusion/arquitecturas/2015_unet.pdf) | U-Net: Convolutional Networks for Biomedical Image Segmentation |
| 2023 | [2023_dit.pdf](../difusion/arquitecturas/2023_dit.pdf) | Scalable Diffusion Models with Transformers (DiT) |
| 2023 | [2023_sdxl.pdf](../difusion/arquitecturas/2023_sdxl.pdf) | SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis |
| 2024 | [2024_sd3_mmdit.pdf](../difusion/arquitecturas/2024_sd3_mmdit.pdf) | Scaling Rectified Flow Transformers for High-Resolution Image Synthesis (SD3/MM-DiT) |

### Difusión — Video (`papers/difusion/video/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2022 | [2022_imagen_video.pdf](../difusion/video/2022_imagen_video.pdf) | Imagen Video: High Definition Video Generation with Diffusion Models |
| 2022 | [2022_make_a_video.pdf](../difusion/video/2022_make_a_video.pdf) | Make-A-Video: Text-to-Video Generation without Text-Video Data |
| 2022 | [2022_video_diffusion.pdf](../difusion/video/2022_video_diffusion.pdf) | Video Diffusion Models |
| 2023 | [2023_svd.pdf](../difusion/video/2023_svd.pdf) | Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets (SVD) |
| 2023 | [2023_video_ldm.pdf](../difusion/video/2023_video_ldm.pdf) | Align your Latents: High-Resolution Video Synthesis with Latent Diffusion Models |
| 2024 | [2024_cogvideox.pdf](../difusion/video/2024_cogvideox.pdf) | CogVideoX: Text-to-Video Diffusion Models with an Expert Transformer |

### Difusión — Multimodal/3D (`papers/difusion/multimodal/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2022 | [2022_dreamfusion.pdf](../difusion/multimodal/2022_dreamfusion.pdf) | DreamFusion: Text-to-3D using 2D Diffusion |
| 2023 | [2023_mvdiffusion.pdf](../difusion/multimodal/2023_mvdiffusion.pdf) | MVDiffusion: Enabling Holistic Multi-view Image Generation |
| 2023 | [2023_prolific_dreamer_vsd.pdf](../difusion/multimodal/2023_prolific_dreamer_vsd.pdf) | ProlificDreamer: High-Fidelity and Diverse Text-to-3D Generation (VSD) |
| 2023 | [2023_zero123.pdf](../difusion/multimodal/2023_zero123.pdf) | Zero-1-to-3: Zero-shot One Image to 3D Object |

### JEPA — Core (`papers/jepa/core/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2022 | [2022_jepa_slow_features.pdf](../jepa/core/2022_jepa_slow_features.pdf) | JEPA and Slow Feature Analysis |
| 2022 | [2022_lecun_path_autonomous_intelligence.pdf](../jepa/core/2022_lecun_path_autonomous_intelligence.pdf) | A Path Towards Autonomous Machine Intelligence (LeCun) |
| 2023 | [2023_ijepa.pdf](../jepa/core/2023_ijepa.pdf) | Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (I-JEPA) |
| 2024 | [2024_iwm.pdf](../jepa/core/2024_iwm.pdf) | Revisiting Feature Prediction for Learning Visual Representations (IWM) |
| 2024 | [2024_vjepa.pdf](../jepa/core/2024_vjepa.pdf) | V-JEPA: Latent Video Prediction for Visual Representation Learning |
| 2025 | [2025_vjepa2.pdf](../jepa/core/2025_vjepa2.pdf) | V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning |

### JEPA — Variantes (`papers/jepa/variantes/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2023 | [2023_a_jepa.pdf](../jepa/variantes/2023_a_jepa.pdf) | A-JEPA: Audio Joint-Embedding Predictive Architecture |
| 2023 | [2023_graph_jepa.pdf](../jepa/variantes/2023_graph_jepa.pdf) | Graph JEPA |
| 2023 | [2023_mc_jepa.pdf](../jepa/variantes/2023_mc_jepa.pdf) | MC-JEPA: Multi-Component JEPA |
| 2024 | [2024_3d_jepa.pdf](../jepa/variantes/2024_3d_jepa.pdf) | 3D-JEPA: Joint-Embedding for 3D Representation |
| 2024 | [2024_c_jepa.pdf](../jepa/variantes/2024_c_jepa.pdf) | C-JEPA: Causal JEPA |
| 2024 | [2024_d_jepa.pdf](../jepa/variantes/2024_d_jepa.pdf) | D-JEPA: Discrete JEPA |
| 2024 | [2024_m3_jepa.pdf](../jepa/variantes/2024_m3_jepa.pdf) | M3-JEPA: Masked Multimodal JEPA with MoE |
| 2024 | [2024_point_jepa.pdf](../jepa/variantes/2024_point_jepa.pdf) | Point-JEPA: Point Cloud JEPA |
| 2025 | [2025_audio_jepa.pdf](../jepa/variantes/2025_audio_jepa.pdf) | Audio-JEPA |
| 2025 | [2025_llm_jepa.pdf](../jepa/variantes/2025_llm_jepa.pdf) | LLM-JEPA: Language Model with JEPA |
| 2025 | [2025_n_jepa.pdf](../jepa/variantes/2025_n_jepa.pdf) | N-JEPA: Neuromorphic JEPA |
| 2025 | [2025_vl_jepa.pdf](../jepa/variantes/2025_vl_jepa.pdf) | VL-JEPA: Vision-Language JEPA |
| 2025 | [2025_wavjepa.pdf](../jepa/variantes/2025_wavjepa.pdf) | WavJEPA: Waveform JEPA |
| 2026 | [2026_rectified_lp_jepa.pdf](../jepa/variantes/2026_rectified_lp_jepa.pdf) | Rectified LP-JEPA |

### JEPA — Aplicaciones (`papers/jepa/aplicaciones/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2024 | [2024_brain_jepa.pdf](../jepa/aplicaciones/2024_brain_jepa.pdf) | Brain-JEPA: Neural Signal Representation |
| 2024 | [2024_s_jepa_eeg.pdf](../jepa/aplicaciones/2024_s_jepa_eeg.pdf) | S-JEPA: EEG Signal JEPA |
| 2024 | [2024_t_jepa_trajectory.pdf](../jepa/aplicaciones/2024_t_jepa_trajectory.pdf) | T-JEPA: Trajectory JEPA for Motion Planning |
| 2025 | [2025_act_jepa_robot.pdf](../jepa/aplicaciones/2025_act_jepa_robot.pdf) | ACT-JEPA: Action-Conditioned Trajectory JEPA for Robotics |
| 2025 | [2025_ad_l_jepa.pdf](../jepa/aplicaciones/2025_ad_l_jepa.pdf) | AD-L-JEPA: Autonomous Driving JEPA |
| 2025 | [2025_crossjepa_3d.pdf](../jepa/aplicaciones/2025_crossjepa_3d.pdf) | CrossJEPA: Cross-Modal 3D JEPA |
| 2025 | [2025_hi_t_jepa.pdf](../jepa/aplicaciones/2025_hi_t_jepa.pdf) | Hi-T-JEPA: Hierarchical Trajectory JEPA |
| 2025 | [2025_intuitive_physics.pdf](../jepa/aplicaciones/2025_intuitive_physics.pdf) | Intuitive Physics Understanding via V-JEPA 2 |
| 2025 | [2025_jepa_rl.pdf](../jepa/aplicaciones/2025_jepa_rl.pdf) | JEPA for Reinforcement Learning |
| 2025 | [2025_td_jepa.pdf](../jepa/aplicaciones/2025_td_jepa.pdf) | TD-JEPA: Task-Driven JEPA |
| 2025 | [2025_ti_jepa_multimodal.pdf](../jepa/aplicaciones/2025_ti_jepa_multimodal.pdf) | TI-JEPA: Text-Image Multimodal JEPA |
| 2026 | [2026_h_jepa_5g.pdf](../jepa/aplicaciones/2026_h_jepa_5g.pdf) | H-JEPA: JEPA for 5G Communication |
| 2026 | [2026_lidar_jepa.pdf](../jepa/aplicaciones/2026_lidar_jepa.pdf) | LiDAR-JEPA: 3D LiDAR Representation |

### JEPA — Teoría (`papers/jepa/teoria/`)

| Año | Archivo | Título |
|-----|---------|--------|
| 2024 | [2024_how_jepa_avoids_noise.pdf](../jepa/teoria/2024_how_jepa_avoids_noise.pdf) | How JEPA Avoids Representation Collapse |
| 2025 | [2025_seq_jepa.pdf](../jepa/teoria/2025_seq_jepa.pdf) | Sequential JEPA: Temporal Consistency Theory |
| 2026 | [2026_intrinsic_energy_jepa.pdf](../jepa/teoria/2026_intrinsic_energy_jepa.pdf) | Intrinsic Energy Functions in JEPA |

---

## Aportes de Meta AI / FAIR en Visión (2018–2026)

> Tracker completo en [`../meta_vision_papers.md`](../meta_vision_papers.md) — 44 papers, 9 ya en repo.

### Líneas de investigación de Meta

| Línea | Evolución |
|-------|-----------|
| **SSL Visual** | DINO → MAE → DINOv2 → DINOv3 → Perception Encoder |
| **World Models / JEPA** | LeCun → I-JEPA → V-JEPA → V-JEPA 2 → VL-JEPA ✅ |
| **Segmentación** | MaskFormer → Mask2Former → SAM → SAM 2 → SAM 3 |
| **Video** | SlowFast → TimeSformer → Make-A-Video → Movie Gen |
| **VLMs** | FLAVA → ImageBind → Chameleon → Llama 4 |
| **Backbones** | Non-Local → DETR → ConvNeXt → ViT-Det → Sapiens |

### Papers Meta pendientes de descargar (35 papers)

| Carpeta destino | Papers |
|----------------|--------|
| `multimodal/` | DINO, MAE, data2vec, DINOv2, DINOv3, Perception Encoder, FLAVA, ImageBind, MetaCLIP, CM3Leon, Chameleon, Llama 3.2-V, Llama 4, MetaCLIP 2, SAM, SAM 2, SAM 3 |
| `arquitecturas/` | Non-Local Nets, SlowFast, DETR, MViT, TimeSformer, MaskFormer, ConvNeXt, Mask2Former, ViT-Det, Omnivore, ConvNeXt V2, ViT-Reg, Sapiens |
| `difusion/video/` | Make-A-Video, Emu Video, Movie Gen |
| `difusion/finetuning/` | Emu, Emu Edit |
| `entrenamiento/` | VICReg, data2vec 2.0 |

---

## Mapa de conceptos transversales

| Concepto | LLMs | Difusión | JEPA |
|----------|------|----------|------|
| Transformer / Attention | ★★★ | ★★★ (DiT, SD3) | ★★ (I-JEPA backbone) |
| Self-supervised learning | ★★★ (BERT, MAE) | ★★ (denoising=SSL) | ★★★ (core paradigm) |
| Embeddings / Latent space | ★★★ | ★★★ (LDM) | ★★★ (predicción latente) |
| Contrastive learning | ★★ (CLIP, InfoNCE) | ★ | ★★ (vs. JEPA) |
| Fine-tuning eficiente | ★★★ (LoRA, QLoRA) | ★★★ (DreamBooth, LoRA) | ★ |
| Destilación / Sampling rápido | ★★★ (KD Survey) | ★★★ (DDIM, LCM) | ★ |
| Score matching / Difusión | ✗ | ★★★ | ✗ |
| Energy-based models | ★ | ★ | ★★★ |
| MoE / Routing | ★★★ (Switch, Mixtral) | ✗ | ★ (M3-JEPA) |
| SSM / Secuencias lineales | ★★★ (Mamba) | ★ | ★ |
| Conditioning / Control | ★★★ (CFG, RLHF) | ★★★ (ControlNet, CFG) | ★ |
| World models / Planning | ✗ | ✗ | ★★★ |
| 3D / Visión espacial | ★ | ★★★ (DreamFusion) | ★★ (aplicaciones) |
| Retrieval / RAG | ★★★ | ✗ | ✗ |

---

## Guía de estudio sugerida

### Nivel 1 — Fundamentos (leer primero)
1. [01 — Atención y Transformers](conceptos/01_atencion_transformers.md) — base de todo
2. [02 — Self-Supervised Learning](conceptos/02_self_supervised_learning.md) — paradigma moderno
3. [03 — Representaciones](conceptos/03_representaciones.md) — qué aprenden los modelos
4. [04 — Objetivos de entrenamiento](conceptos/04_objetivos_entrenamiento.md) — cómo aprenden

### Nivel 2 — Arquitecturas principales
5. [12 — Transformer y variantes](arquitecturas/12_transformer_y_variantes.md)
6. [13 — Modelos de difusión](arquitecturas/13_modelos_difusion.md)
7. [14 — JEPA y world models](arquitecturas/14_jepa_world_models.md)

### Nivel 3 — Técnicas prácticas
8. [07 — Fine-tuning eficiente](tecnicas/07_fine_tuning_eficiente.md)
9. [09 — Destilación](tecnicas/09_destilacion_conocimiento.md)
10. [10 — Inferencia rápida](tecnicas/10_inferencia_rapida.md)
11. [11 — RLHF y alineación](tecnicas/11_rlhf_y_alineacion.md)

### Nivel 4 — Especialización
12. [05 — Generación condicionada](conceptos/05_generacion_condicionada.md)
13. [06 — Scaling y emergencia](conceptos/06_scaling_emergencia.md)
14. [15 — MoE y escalado](arquitecturas/15_moe_escalado.md)
15. [16 — SSM / Mamba](arquitecturas/16_ssm_mamba.md)

### Nivel 5 — Aplicaciones
16. [17 — Visión-Lenguaje](dominios/17_vision_lenguaje.md)
17. [18 — RAG y Retrieval](dominios/18_rag_retrieval.md)
18. [19 — Generación visual](dominios/19_generacion_visual.md)
19. [08 — Cuantización](tecnicas/08_cuantizacion.md)
