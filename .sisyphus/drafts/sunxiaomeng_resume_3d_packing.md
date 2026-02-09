# 孙晓萌

📧 [你的邮箱] | 📱 [你的电话] | 💼 [你的GitHub] | 🌐 [你的网站]

---

## 教育背景

**[你的学校]** | [你的专业] | [学历] | [毕业时间]

---

## 技术技能

**语言**: Go | Python | TypeScript | SQL

**框架**: go-zero | CloudWeGO Eino | FastAPI | React 18 | Vite

**AI/ML**: Hunyuan3D | FLUX.2 | SDXL Turbo | Ollama | Milvus

**数据库**: MySQL 8.0+ | Redis 5.0+ | MinIO

**基础设施**: Docker | Docker Compose | Celery

**其他**: Three.js | Tailwind CSS | RESTful API | SSE | 微服务架构

---

## 项目经历

### 🚀 3D包装设计AI生成平台 | 全栈架构师 & 主开发工程师
**2026年01月 - 2026年01月** | 项目周期：16天

**项目地址**: https://github.com/[你的用户名]/3d_packing

**项目概述**:

开发了一套面向包装设计领域的端到端AI可视化平台。用户可通过自然语言描述需求（如"设计一个红色能量饮料瓶包装"），平台自动完成关键词提取、参考图检索、纹理生成、3D模型创建及纹理应用，最终输出带纹理的3D模型和渲染图。整合了腾讯混元3D、FLUX.2、SDXL Turbo等多个业界领先的AI生成模型。

**技术架构**:

```
用户浏览器
    ↓
React + TypeScript 前端层
    ↓ HTTP / SSE
Go + go-zero Agent智能编排层
    ↓ HTTP
Python + FastAPI API网关层
    ↓
┌────────────┬────────────┬────────────┐
│ Hunyuan3D  │  FLUX.2    │  SDXL      │
│ GPU 0      │  GPU 1     │  GPU 2     │
└────────────┴────────────┴────────────┘
```

**核心职责**:

- **系统架构设计**: 设计并实现三层微服务架构（前端 → Agent层 → AI服务层），支持独立扩缩容和高并发访问

- **AI工作流编排**: 基于CloudWeGO Eino实现LLM智能工作流编排，包括关键词提取、参考图检索、纹理生成、模型创建等环节

- **后端开发**: 使用Go 1.23 + go-zero构建RESTful API，使用Python + FastAPI开发AI服务网关

- **AI模型集成**: 集成Hunyuan3D 2.1（3D模型生成）、FLUX.2 [klein] 9B（纹理生成）、SDXL Turbo（纹理生成）、Paint3D（纹理应用）

- **实时通信开发**: 实现SSE事件流推送生成进度、排队位置和预计等待时间

- **任务队列管理**: 使用Redis + Celery构建GPU任务队列，支持多队列并行处理（hunyuan、uv、flux2、easitex）

- **前端开发**: 使用React 18 + TypeScript开发交互界面，使用Three.js和@google/model-viewer实现3D模型预览

- **Docker容器化**: 使用Docker Compose编排所有服务（go-zero、Milvus、MySQL、Redis、MinIO等）

**主要功能**:

1. **智能提示词解析**: 调用LLM（Ollama qwen2.5:8b）自动提取关键词（颜色、风格、元素、材质等），识别模型类型

2. **参考图检索**: 基于Milvus向量数据库的相似性检索，根据关键词推荐参考图

3. **AI纹理生成**: 使用SDXL Turbo / FLUX.2生成无缝包装纹理，支持多图融合

4. **3D模型生成**: Hunyuan3D-DiT支持文本/图像→3D模型，Hunyuan3D-Paint支持PBR纹理应用

5. **3D交互预览**: @google/model-viewer预览GLB/GLTF格式，Three.js预览OBJ+MTL格式

6. **任务管理**: SSE实时推送进度，支持任务取消和重试

**API接口**:

```go
// 纹理生成工作流
POST /api/v1/texture/generate

// 模型处理工作流
POST /api/v1/model/process

// SSE进度推送
GET /api/v1/texture/events/{sessionId}
GET /api/v1/model/events/{sessionId}

// 历史任务查询
GET /api/v1/users/{userId}/tasks
```

**项目成果**:

- ✅ 16天按时交付完整可用的AI生成系统
- ✅ 从0到1实现端到端自动化流程
- ✅ 支持多用户并发访问
- ✅ 生成质量达到工业级标准（PBR材质）

**项目亮点**:

1. 端到端AI自动化：从自然语言到3D模型的完整闭环
2. 多模型协同：整合多个SOTA生成模型
3. 实时交互：SSE推送实现秒级进度反馈
4. 生产架构：微服务分离、Docker容器化、高可用设计

**项目目录结构**:

```
3D包装设计AI生成平台/
├── 3d_packing/                    # AI服务层（Python）
│   ├── interfaces/api_server.py  # API网关
│   ├── hunyuan/                   # Hunyuan3D服务
│   ├── flux2klein9b/              # FLUX.2服务
│   ├── sdxl/                      # SDXL服务
│   └── paint3d/                  # Paint3D服务
│
├── 3d_packing_agent/              # Agent智能编排层（Go）
│   └── go_code/
│       ├── api/                   # API定义
│       ├── cmd/api-server/        # 服务入口
│       ├── internal/
│       │   ├── graph/             # Eino Graph编排
│       │   ├── component/         # 外部服务封装
│       │   └── repository/        # 数据访问层
│       └── etc/packingagent.yaml  # 配置文件
│
└── 3d_packing_frontend/           # 前端展示层（React）
    └── src/
        ├── components/            # UI组件
        ├── hooks/                 # 自定义Hooks
        ├── store/                 # Zustand状态管理
        ├── services/api.ts        # API调用封装
        └── types/index.ts         # TypeScript类型定义
```

---

## 项目特色技术

**AI集成**:
- 腾讯混元3D Hunyuan3D 2.1
- FLUX.2 [klein] 9B
- SDXL Turbo
- Ollama (bge-m3 + qwen2.5)

**数据存储**:
- MySQL 8.0+ (任务与资产数据)
- Redis 5.0+ (会话状态与队列)
- Milvus 2.4+ (向量检索)

**容器编排**:
- Docker Compose
- 多GPU动态调度

**实时通信**:
- Server-Sent Events (SSE)
- 进度实时推送
- 排队状态展示

---

## 自我评价

- 具备完整的全栈开发能力，熟悉从系统架构到前端界面的全流程开发
- 专注于AI应用开发，有丰富的生成模型集成经验
- 熟悉微服务架构设计，能够构建高可用、可扩展的系统
- 学习能力强，能够快速掌握新技术并应用于实际项目
- 有良好的代码习惯，注重代码质量和可维护性

---

*最后更新：2026年02月*
