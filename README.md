# LingoVibe

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-auth%20%2B%20db-3ECF8E?logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

> Decode the cultural vibe behind every word. Trilingual context engine for English, Spanish, and French — powered by Gemini AI.
>
> 解码每个词背后的文化语感。基于 Gemini AI 的英法西三语语境引擎——不只翻译，更懂"氛围"。

---

## Overview · 项目简介

Most translation tools tell you what a word means. LingoVibe tells you **how it feels** — the social register, the cultural tone, the situations where it lands right and the ones where it would land wrong.

大多数翻译工具告诉你一个词的意思。LingoVibe 告诉你**它的感觉**——社交语境、文化语气、用对的场合和用错的场合。

Built for learners who want more than dictionary definitions, LingoVibe provides a full cultural context profile for any slang, idiom, or colloquial expression across three languages. Enter a word in English, Spanish, or French; receive trilingual translations, authentic usage examples, cultural tone analysis, and native-accent audio — all in real time.

LingoVibe 为渴望超越字典释义的学习者而建。对任何俚语、习语或口语表达，它能跨三门语言提供完整的文化语境档案。输入一个英语、西班牙语或法语词汇，即刻获得三语对照翻译、真实用法例句、文化语气分析，以及母语口音的发音——全部实时呈现。

---

## The Core Idea · 核心理念

Language is not a lookup table. The same word carries completely different cultural "vibes" across English, French, and Spanish — a compliment in one culture can be condescending in another; slang that sounds casual in one register reads as aggressive in another. LingoVibe surfaces these invisible dimensions that textbooks miss.

语言不是查找表。同一个词在英语、法语和西班牙语中承载着截然不同的文化"氛围"——在一种文化中是赞美的，在另一种文化中可能是傲慢的；在某种语境下听起来随意的俚语，在另一种语境下读来却带有攻击性。LingoVibe 揭示的，正是教科书所忽略的这些隐形维度。

---

## Features · 功能详解

### 1. Cultural Vibe Analysis · 文化语感分析

The core feature. Enter any word or phrase and receive a structured cultural context profile:

核心功能。输入任意词汇或短语，获得结构化的文化语境档案：

| Output · 输出 | Description · 说明 |
|--------------|-------------------|
| Trilingual translations · 三语对照 | The term mapped across EN / FR / ES with nuance preserved · 跨英法西三语对照，保留细微差别 |
| Chinese definition · 中文释义 | Plain-language summary for Chinese speakers · 面向中文母语者的通俗解释 |
| Slang sentences · 俚语例句 | Two authentic usage examples showing the word in natural context · 两句展示词汇在自然语境中用法的真实例句 |
| Vibe check · 氛围检测 | Cultural tone analysis — register, social context, when to use and when to avoid · 文化语气分析——语域、社交语境、适用场合与禁用场合 |

### 2. Native-Accent Audio · 母语口音朗读

Each response includes text-to-speech pronunciation using language-specific accents: `fr-FR` for French, `es-ES` for Spanish, `en-US` for English. Hear how the word actually sounds in its native context, not a generic synthesized voice.

每条响应均包含使用语言特定口音的文字转语音朗读：法语用 `fr-FR`，西班牙语用 `es-ES`，英语用 `en-US`。听到词汇在母语语境中的真实发音，而非通用合成语音。

### 3. Personal Vocabulary Notebook · 个人词汇笔记本

Authenticated users can save any word to their personal notebook, stored in Supabase with the full analysis and language tag. The notebook has two study modes:

经过身份验证的用户可将任意词汇保存至个人笔记本，完整分析和语言标签一并存储于 Supabase。笔记本提供两种学习模式：

- **Flashcards · 闪卡复习** — Classic spaced-repetition-style review of saved vocabulary · 经典闪卡式复习已保存的词汇
- **Story Generator · 故事生成器** — Gemini composes an original narrative using your saved words, embedding them in natural context for deeper retention · Gemini 用你保存的词汇创作原创叙事，将词汇嵌入自然语境以加深记忆

### 4. Suggested Words · 推荐词汇

Each language view surfaces curated suggested words organized by language, giving learners immediate starting points without needing to know what to search for.

每个语言视图都提供按语言整理的精选推荐词汇，让学习者无需知道搜什么就能立刻上手。

### 5. BYOK — Bring Your Own Key · 自带 API 密钥

When the daily Gemini API quota is reached, users can input their own Google Gemini API key to continue learning without interruption. No account required for guest exploration; full features unlock with Supabase auth.

当每日 Gemini API 配额耗尽时，用户可输入自己的 Google Gemini API 密钥继续学习，不受中断。访客模式无需账户即可探索；完整功能需通过 Supabase 身份验证解锁。

### 6. PWA Support · 渐进式 Web 应用支持

LingoVibe is installable as a Progressive Web App — add it to your home screen for an app-like experience on mobile or desktop without an app store download.

LingoVibe 可作为渐进式 Web 应用安装——添加到主屏幕即可在移动端或桌面端享受类原生应用体验，无需应用商店下载。

---

## Tech Stack · 技术栈

| Layer | Technology | Purpose · 用途 |
|-------|-----------|---------------|
| Framework | Next.js 16 (App Router) | SSR + API routes + file-based routing · 服务端渲染 + API 路由 + 文件路由 |
| Language | TypeScript 5 | End-to-end type safety · 全链路类型安全 |
| Styling | Tailwind CSS 4 + Framer Motion | Utility-first styling + fluid animations · 原子化样式 + 流畅动画 |
| AI | Google Gemini API (`@google/generative-ai`) | Cultural context generation, story generation · 文化语境生成、故事生成 |
| Backend / Auth | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) | User auth + `saved_words` database table · 用户认证 + 词汇数据库 |
| Icons | Lucide React | UI icon system · 界面图标系统 |
| Runtime | React 19 | Latest concurrent rendering features · 最新并发渲染特性 |

---

## Architecture · 系统架构

```
app/
├── page.tsx                  # Home — language selection (EN / ES / FR)
│                             # 首页——语言选择
├── learn/
│   └── page.tsx              # /learn?lang=xx — chat interface with Suspense
│                             # 学习页——带 Suspense 的对话界面
├── notebook/
│   └── page.tsx              # /notebook — saved words, flashcards, story gen
│                             # 笔记本——已保存词汇、闪卡、故事生成
├── settings/                 # User settings
├── api/
│   ├── chat/                 # POST /api/chat — Gemini cultural analysis
│   │                         # Gemini 文化语境分析接口
│   └── story/                # POST /api/story — Gemini story generation
│                             # Gemini 故事生成接口
└── globals.css / layout.tsx  # Global styles and root layout

components/
├── Learning/
│   └── ChatInterface.tsx     # Core chat UI — word input, vibe analysis, audio
│                             # 核心对话界面——词汇输入、语感分析、音频
├── Notebook/
│   ├── StudyMode.tsx         # Flashcard study interface · 闪卡学习界面
│   └── StoryGenerator.tsx    # AI story generation from saved words · AI 故事生成
├── Auth/
│   └── LoginForm.tsx         # Supabase auth form · Supabase 认证表单
├── Layout/                   # Shared layout components
└── PWA/                      # PWA install prompt and manifest helpers

utils/
└── supabase/                 # Supabase client + SSR helpers
```

---

## Getting Started · 快速开始

**Prerequisites · 前置要求**
- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier available · 提供免费套餐)
- A [Google Gemini API key](https://ai.google.dev/) (free tier available · 提供免费层级)

**Setup · 配置步骤**

```bash
# Clone the repository | 克隆仓库
git clone https://github.com/jiakezhu/lingo-vibe.git
cd lingo-vibe

# Install dependencies | 安装依赖
npm install

# Configure environment | 配置环境变量
cp .env.example .env.local
```

Edit `.env.local` · 编辑 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# Start the dev server | 启动开发服务器
npm run dev
```

Open `http://localhost:3000` · 在浏览器中打开 `http://localhost:3000`

**Supabase table · 数据库表结构**

Create a `saved_words` table in your Supabase project:

在 Supabase 项目中创建 `saved_words` 表：

```sql
create table saved_words (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  word text not null,
  analysis jsonb,
  language text,
  created_at timestamp with time zone default now()
);
```

---

## Design Philosophy · 设计理念

**Context over translation · 语境优于翻译**
A dictionary tells you what a word means in isolation. LingoVibe tells you what it means in a conversation, in a culture, in a moment. The vibe check is the product; the translation is just the starting point.

字典告诉你一个词孤立的含义。LingoVibe 告诉你它在对话中、在文化里、在具体时刻的意义。语感分析才是产品的核心；翻译只是起点。

**Three languages, one interface · 三种语言，一个界面**
English, Spanish, and French are not three separate products — they are three lenses on the same phenomenon. Switching languages reveals how the same concept is encoded differently across cultures, which is itself the lesson.

英语、西班牙语和法语不是三个独立产品——它们是观察同一现象的三个镜头。切换语言揭示的是同一概念在不同文化中的不同编码方式，这本身就是学习的意义。

**Save, then construct · 先积累，再构建**
The notebook-to-story pipeline encodes a deliberate learning theory: passive recognition (saving words) alone doesn't build fluency. Seeing those words assembled into natural narratives by AI moves them from recognition to active vocabulary.

笔记本到故事的流水线体现了一种刻意的学习理论：单纯的被动识别（保存词汇）不能建立流利度。看到这些词汇被 AI 组装成自然叙事，才能将它们从认知词汇转化为主动词汇。

---

## License · 许可证

MIT
