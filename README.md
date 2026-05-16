# NULLFORM 创意作品集 / Creative Portfolio

黑白极简、高级创意机构气质的沉浸式作品集网站。项目使用 Next.js App Router、TypeScript、Tailwind CSS、GSAP ScrollTrigger、Three.js、Lenis 和 Framer Motion 构建，适合用作创意工作室、独立设计师、数字厂牌、互动团队或 Awwwards 风格作品展示站。

This is an immersive monochrome creative portfolio built with Next.js App Router, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Three.js, Lenis, and Framer Motion. It supports bilingual content, data-driven case studies, image/video media, smooth scrolling, WebGL ambience, and animated transitions.

## 目录

- [项目亮点](#项目亮点)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [可用脚本](#可用脚本)
- [项目结构](#项目结构)
- [页面路由](#页面路由)
- [核心组件](#核心组件)
- [内容管理](#内容管理)
- [中英文支持](#中英文支持)
- [图片与视频](#图片与视频)
- [动画系统](#动画系统)
- [部署说明](#部署说明)
- [自定义指南](#自定义指南)
- [常见问题](#常见问题)

## 项目亮点

- 黑白极简视觉，超大字号排版，创意机构式页面节奏
- 首页包含 Hero、Manifesto、横向滚动 Projects、Services、Contact CTA
- Lenis 全站平滑滚动
- GSAP ScrollTrigger 滚动动画，包括文字 reveal、图片 scale、横向滚动和 pinned section
- Three.js WebGL 背景，包括粒子、线框几何体、鼠标交互和滚动联动
- Framer Motion 页面转场
- 自定义鼠标与作品 hover 交互
- Projects 页面支持分类筛选
- 项目详情页支持封面图、视频、图片、年份、类型、技术栈和叙事内容
- 项目数据集中维护，不需要改页面组件即可更新内容
- 支持中文 / 英文界面文案与项目内容
- 移动端响应式适配
- 支持 Vercel 与 Cloudflare Pages 部署

## 技术栈

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js
- Lenis
- Framer Motion
- ESLint

## 环境要求

建议使用：

- Node.js 20 或更高
- npm 10 或更高

检查本地环境：

```bash
node -v
npm -v
```

## 快速开始

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

打开本地预览：

```text
http://localhost:3000
```

生产构建：

```bash
npm run build
```

启动生产服务：

```bash
npm run start
```

## 可用脚本

```bash
npm run dev
```

启动 Next.js 开发服务器。

```bash
npm run build
```

生成生产版本，用于部署前检查。

```bash
npm run start
```

运行已经构建好的生产版本。

```bash
npm run lint
```

运行 ESLint 检查。

```bash
npm run pages:build
```

使用 `@cloudflare/next-on-pages` 生成 Cloudflare Pages 可部署产物。

## 项目结构

```text
app/
  layout.tsx
  page.tsx
  globals.css
  about/page.tsx
  contact/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx

components/
  ContactSection.tsx
  CustomCursor.tsx
  FloatingNav.tsx
  HeroSection.tsx
  LanguageProvider.tsx
  ManifestoSection.tsx
  PageTransition.tsx
  ProjectCard.tsx
  ProjectCasePage.tsx
  ProjectGrid.tsx
  ProjectsHorizontal.tsx
  ServicesSection.tsx
  SmoothScroll.tsx
  WebGLScene.tsx

data/
  projects.ts
  services.ts

lib/
  gsap.ts
  i18n.ts
  lenis.ts

public/
  favicon.ico

styles/
  globals.css
```

## 页面路由

| 路由 | 说明 |
| --- | --- |
| `/` | 首页，包含 Hero、Manifesto、横向 Projects、Services 和 Contact |
| `/projects` | 项目索引页，支持分类筛选 |
| `/projects/[slug]` | 项目详情页，展示封面、介绍、媒体、技术栈和叙事内容 |
| `/about` | 关于页面 |
| `/contact` | 联系页面 |

## 核心组件

| 组件 | 作用 |
| --- | --- |
| `SmoothScroll.tsx` | 初始化 Lenis，并把平滑滚动同步给 ScrollTrigger |
| `WebGLScene.tsx` | 固定背景 WebGL 场景，包含粒子、几何体和滚动联动 |
| `FloatingNav.tsx` | 顶部创意导航与全屏菜单 |
| `HeroSection.tsx` | 首页首屏、intro animation、Hero pinned 滚动动画 |
| `ManifestoSection.tsx` | 大字号宣言文字与 split reveal 动画 |
| `ProjectsHorizontal.tsx` | 首页横向滚动作品区 |
| `ProjectGrid.tsx` | Projects 页面网格与分类筛选 |
| `ProjectCasePage.tsx` | 项目详情页，支持图片和视频媒体 |
| `ServicesSection.tsx` | 服务能力列表与 hover 说明 |
| `ContactSection.tsx` | 最后一屏 CTA 与 outro 动画 |
| `CustomCursor.tsx` | 桌面端自定义鼠标 |
| `PageTransition.tsx` | 页面切换淡入淡出 |
| `LanguageProvider.tsx` | 中文 / 英文状态管理 |

## 内容管理

项目内容集中在 `data/projects.ts`，服务内容集中在 `data/services.ts`，界面文案集中在 `lib/i18n.ts`。

### 添加项目

在 `data/projects.ts` 的 `projects` 数组中新增一项：

```ts
{
  slug: "new-case",
  title: "NEW CASE",
  subtitle: "Short English subtitle.",
  category: "Experience",
  year: "2026",
  type: "Interactive Website",
  intro: "Short intro text.",
  description: "Longer project description.",
  cover: "https://images.unsplash.com/...",
  stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
  services: ["Art Direction", "Frontend", "Motion"],
  featured: true,
  narrative: [
    {
      kicker: "Context",
      title: "Narrative block title.",
      body: "Narrative block body.",
      stat: "01"
    }
  ],
  media: [
    {
      type: "image",
      src: "https://images.unsplash.com/...",
      caption: "Image caption.",
      captionZh: "图片说明。",
      layout: "wide"
    }
  ],
  translations: {
    zh: {
      subtitle: "中文副标题。",
      type: "互动网站",
      intro: "中文短介绍。",
      description: "中文项目说明。",
      services: ["创意指导", "前端开发", "动态设计"],
      narrative: [
        {
          kicker: "背景",
          title: "中文叙事标题。",
          body: "中文叙事正文。",
          stat: "01"
        }
      ]
    }
  }
}
```

### 项目分类

当前项目分类类型定义在 `data/projects.ts`：

```ts
export type ProjectCategory =
  | "Identity"
  | "Experience"
  | "Motion"
  | "Commerce";
```

如果需要新增分类，需要同步更新：

- `ProjectCategory` 类型
- 项目数据中的 `category`
- 分类文案函数 `getCategoryLabel`
- Projects 页面筛选项

## 中英文支持

站点语言由 `components/LanguageProvider.tsx` 管理。用户切换语言后，当前语言会写入 `localStorage`，key 为：

```text
nullform-lang
```

界面文案位于 `lib/i18n.ts`：

```ts
export const uiText = {
  en: {
    nav: {
      menu: "MENU"
    }
  },
  zh: {
    nav: {
      menu: "菜单"
    }
  }
};
```

项目详情的中文内容位于每个项目的 `translations.zh` 字段。组件中通过 `getProjectCopy(project, lang)` 读取当前语言内容。

## 图片与视频

项目媒体通过 `media` 数组配置，支持图片和视频：

```ts
media: [
  {
    type: "image",
    src: "https://images.unsplash.com/...",
    caption: "Still frame",
    captionZh: "静帧画面",
    layout: "wide"
  },
  {
    type: "video",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    poster: "https://images.unsplash.com/...",
    caption: "Motion study",
    captionZh: "动态片段",
    layout: "wide"
  }
]
```

### 媒体字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | `"image" \| "video"` | 媒体类型 |
| `src` | `string` | 图片或视频地址 |
| `poster` | `string` | 视频封面图，可选 |
| `caption` | `string` | 英文说明 |
| `captionZh` | `string` | 中文说明 |
| `layout` | `"wide" \| "tall" \| "square"` | 媒体布局比例，可选 |

正式项目建议把图片和视频放到：

```text
public/media/
```

然后这样引用：

```ts
cover: "/media/cases/new-case/cover.jpg"
```

如果使用外部图片域名，需要在 `next.config.mjs` 中添加 remote pattern。当前配置允许 `images.unsplash.com`：

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com"
    }
  ]
}
```

## 动画系统

### GSAP

GSAP 注册逻辑集中在 `lib/gsap.ts`：

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

在 Client Component 中使用：

```tsx
"use client";

import { useEffect } from "react";
import { registerGsap } from "@/lib/gsap";

useEffect(() => {
  const { gsap, ScrollTrigger } = registerGsap();

  const context = gsap.context(() => {
    ScrollTrigger.create({
      trigger: "#section",
      start: "top center"
    });
  });

  return () => context.revert();
}, []);
```

注意：所有使用 GSAP / ScrollTrigger 的组件都必须是 Client Component，并在 `useEffect` 内注册动画，避免 Next.js SSR 报错。

### Lenis

`SmoothScroll.tsx` 初始化 Lenis，并将滚动同步给 GSAP ScrollTrigger。全局可通过：

```ts
window.__lenis?.scrollTo(target);
```

触发平滑滚动。

### WebGL

`WebGLScene.tsx` 使用 Three.js 创建固定背景层：

- canvas 固定在页面背景
- `pointer-events: none`
- 粒子通过 shader 渲染
- 线框几何体随鼠标轻微移动
- Hero、About、Contact 区域通过自定义事件影响 WebGL 状态

相关事件名称：

```text
webgl:hero
webgl:about
webgl:contact
```

## 样式系统

全局样式位于 `app/globals.css`。

主要视觉原则：

- 黑白极简
- 大字号排版
- 高对比
- 克制动效
- 少用装饰性渐变
- 避免普通卡片模板感
- 使用电影感留白和强节奏版式

Tailwind 配置位于 `tailwind.config.ts`。

字体在 `app/layout.tsx` 中配置，目前使用：

- Archivo Black
- Inter Tight

## 部署说明

### Vercel

构建检查：

```bash
npm run build
```

部署步骤：

1. 将项目推送到 GitHub / GitLab / Bitbucket
2. 在 Vercel 中导入仓库
3. Framework Preset 选择 `Next.js`
4. Build Command 使用默认值或 `npm run build`
5. Deploy

### Cloudflare Pages

项目包含 Cloudflare Pages 构建脚本：

```bash
npm run pages:build
```

Cloudflare Pages 推荐设置：

| 设置项 | 值 |
| --- | --- |
| Framework preset | Next.js |
| Build command | `npm run pages:build` |
| Output directory | `.vercel/output/static` |
| Node.js version | `20` 或更高 |

如果 Cloudflare 构建失败，先在本地运行：

```bash
npm run pages:build
```

确认 adapter 输出没有报错。

## 自定义指南

### 修改品牌名

修改 `lib/i18n.ts`：

```ts
nav: {
  brand: "NULL FORM"
}
```

如果页面中还有硬编码品牌字样，可以搜索：

```bash
NULL FORM
```

并替换为新品牌名。

### 修改首页大标题

修改 `lib/i18n.ts`：

```ts
hero: {
  title: ["NULL", "FORM", "STUDIO"]
}
```

### 修改服务列表

编辑 `data/services.ts`：

```ts
{
  title: "Web Experience",
  titleZh: "网页体验",
  description: "English description.",
  descriptionZh: "中文说明。"
}
```

### 修改项目详情

编辑 `data/projects.ts` 中对应项目：

- `cover` 修改封面
- `media` 修改图片/视频
- `stack` 修改技术栈
- `services` 修改服务内容
- `narrative` 修改滚动叙事段落
- `translations.zh` 修改中文内容

### 替换远程图片为本地图片

将图片放入：

```text
public/media/
```

然后使用：

```ts
cover: "/media/cover.jpg"
```

## 性能建议

- 视频建议使用压缩后的 `.mp4` 或 CDN
- 图片建议使用 WebP / AVIF
- 大视频不要直接放入首屏
- WebGL 粒子数量已经在移动端降低
- 如需更多 3D 内容，优先控制 draw call、纹理尺寸和 shader 复杂度
- 部署前运行 `npm run build` 检查生产构建

## 常见问题

### 1. GSAP 在 Next.js 中报 `window is not defined`

确保动画代码只写在 Client Component 中：

```tsx
"use client";
```

并放在 `useEffect` 中执行。

### 2. ScrollTrigger 和 Lenis 不同步

检查 `SmoothScroll.tsx` 是否已在 `app/layout.tsx` 中挂载，并确认 Lenis 的 raf 正常运行。

### 3. 外部图片无法显示

如果使用 `next/image` 加载外部图片，需要在 `next.config.mjs` 中添加对应域名。

### 4. Cloudflare Pages 构建失败

确认 Node.js 版本为 20 或更高，并使用：

```bash
npm run pages:build
```

作为构建命令。

### 5. 中文显示乱码

确认文件使用 UTF-8 编码保存，并避免用非 UTF-8 终端重写中文文件。

## 交付检查清单

上线前建议确认：

- `npm run lint` 通过
- `npm run build` 通过
- 首页滚动动画正常
- Projects 横向滚动正常
- 项目详情页图片和视频正常加载
- 中文 / 英文切换正常
- 移动端布局没有文字溢出
- 外部图片域名已加入 `next.config.mjs`
- Vercel 或 Cloudflare Pages 构建配置正确

## License / 授权声明

License: `UNLICENSED Proprietary Software License`

Copyright (c) 2026 NULLFORM.

本项目不是 MIT、Apache、GPL、BSD、Creative Commons 等开源或开放内容许可证。项目使用 `UNLICENSED` 专有软件许可证，即不向公众授予使用、复制、修改、分发、部署或商用权利。完整许可证见 [`LICENSE`](./LICENSE)。

除非获得版权所有者的明确书面许可，任何个人、团队或组织不得复制、修改、分发、再授权、出售、部署、公开展示、商用使用，或基于本项目创建衍生作品。

This project is not licensed under MIT, Apache, GPL, BSD, Creative Commons, or any other open-source or open-content license. It uses an `UNLICENSED` proprietary software license, meaning no public rights are granted to use, copy, modify, distribute, deploy, or commercially use the project. See [`LICENSE`](./LICENSE) for the full license text.

No permission is granted to copy, modify, distribute, sublicense, sell, deploy, publicly display, commercially use, or create derivative works from this project without explicit written permission from the copyright holder.

项目中引用的图片、视频、字体、第三方库和外部素材仍受其各自许可证约束。正式商业使用前，请确保所有素材均具备合法授权。
