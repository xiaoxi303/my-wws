export type ProjectCategory =
  | "Identity"
  | "Experience"
  | "Motion"
  | "Commerce";

export type ProjectNarrativeBlock = {
  kicker: string;
  title: string;
  body: string;
  stat?: string;
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
  captionZh: string;
  layout?: "wide" | "tall" | "square";
};

export type ProjectTranslation = {
  subtitle: string;
  type: string;
  intro: string;
  description: string;
  services: string[];
  narrative: ProjectNarrativeBlock[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  type: string;
  intro: string;
  description: string;
  cover: string;
  stack: string[];
  services: string[];
  narrative: ProjectNarrativeBlock[];
  media: ProjectMedia[];
  translations: {
    zh: ProjectTranslation;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "monolith-index",
    title: "MONOLITH INDEX",
    subtitle: "A severe identity system for a spatial intelligence lab.",
    category: "Identity",
    year: "2026",
    type: "Brand System / WebGL Site",
    intro:
      "A black-and-white brand language built from architectural scans, machine rhythm, and austere typography.",
    description:
      "Monolith Index needed a digital presence that felt less like a technology startup and more like a controlled field instrument. We built a modular identity, an editorial website, and an interaction system that turns dense research into a calm visual cadence.",
    cover:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js", "Lenis"],
    services: ["Identity", "Art Direction", "Frontend", "Motion"],
    featured: true,
    narrative: [
      {
        kicker: "Signal",
        title: "Turning technical language into a visual operating system.",
        body:
          "We reduced the interface to scale, rhythm, and friction. Oversized headings hold the page while small metadata behaves like calibrated instrument labels.",
        stat: "01"
      },
      {
        kicker: "Motion",
        title: "Scroll becomes a measuring device.",
        body:
          "Every transition is tied to the user's position. Images tighten, text resolves, and the grid offsets just enough to feel engineered instead of decorated.",
        stat: "38%"
      },
      {
        kicker: "Result",
        title: "A site that feels precise without becoming cold.",
        body:
          "The finished system keeps the brand sparse, tactile, and memorable, with a content model that can grow across product launches and lab reports.",
        stat: "4 wk"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=86",
        caption: "Opening motion study for the spatial intelligence launch.",
        captionZh: "为空间智能发布制作的开场动态研究。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=86",
        caption: "Interface grid and research index in monochrome.",
        captionZh: "黑白界面网格与研究索引系统。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=86",
        caption: "Generative geometry used as a brand behavior.",
        captionZh: "作为品牌行为使用的生成式几何。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为空间智能实验室打造的冷峻身份系统。",
        type: "品牌系统 / WebGL 网站",
        intro:
          "从建筑扫描、机器节奏和极简排版中生成的黑白品牌语言。",
        description:
          "Monolith Index 需要一个不像普通科技公司、而更像精密场域仪器的数字形象。我们构建了模块化身份、编辑型网站和交互系统，把密集研究转化为冷静、有节奏的视觉体验。",
        services: ["品牌识别", "艺术指导", "前端开发", "动态设计"],
        narrative: [
          {
            kicker: "信号",
            title: "把技术语言转译成视觉操作系统。",
            body:
              "我们将界面压缩为尺度、节奏与摩擦感。超大标题固定页面，小型元信息像仪器标签一样精确。",
            stat: "01"
          },
          {
            kicker: "动态",
            title: "滚动成为一种测量装置。",
            body:
              "每个过渡都绑定用户位置。图片收紧、文字浮现，网格产生适度错位，让体验像被工程化过，而不是被装饰过。",
            stat: "38%"
          },
          {
            kicker: "结果",
            title: "精确，但不冰冷。",
            body:
              "最终系统保持稀疏、触感与记忆点，同时内容模型可继续扩展到产品发布和实验室报告。",
            stat: "4 周"
          }
        ]
      }
    }
  },
  {
    slug: "field-noise",
    title: "FIELD NOISE",
    subtitle: "Interactive launch campaign for an experimental audio tool.",
    category: "Experience",
    year: "2025",
    type: "Interactive Campaign",
    intro:
      "A responsive campaign site where sound fragments, product stories, and generative graphics share one tempo.",
    description:
      "Field Noise asked for a launch experience that made invisible audio processing feel physical. The site pairs compressed monochrome visuals with kinetic type and interaction states that react like a mixing desk.",
    cover:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "Web Audio", "GSAP", "Canvas", "Tailwind CSS"],
    services: ["Campaign", "Interaction", "Creative Direction"],
    featured: true,
    narrative: [
      {
        kicker: "Input",
        title: "A product demo with the mood of a live set.",
        body:
          "We designed each section like a track: quiet setup, controlled distortion, then a final release into the product story.",
        stat: "12"
      },
      {
        kicker: "Interface",
        title: "Editorial clarity over gadget spectacle.",
        body:
          "The visual system uses disciplined type and image motion so the experimental layer never blocks the core message.",
        stat: "2.8s"
      },
      {
        kicker: "Launch",
        title: "A campaign system that can keep touring.",
        body:
          "Reusable content modules let the team remix artist stories, release notes, and product moments without redesigning the page.",
        stat: "9x"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=86",
        caption: "Audio-reactive launch loop and product atmosphere.",
        captionZh: "音频响应式发布循环与产品氛围片段。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=86",
        caption: "Campaign hero still with compressed contrast.",
        captionZh: "高压缩对比度的 Campaign 首屏静帧。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
        caption: "Editorial section for artist notes and launch fragments.",
        captionZh: "用于艺术家笔记和发布片段的编辑型版块。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为实验性音频工具打造的互动发布 Campaign。",
        type: "互动 Campaign",
        intro:
          "一个响应式发布网站，让声音片段、产品叙事和生成图形共享同一种节奏。",
        description:
          "Field Noise 希望把看不见的音频处理变得可感知。网站以压缩的黑白视觉、动态排版和像混音台一样的交互状态构建发布体验。",
        services: ["Campaign", "互动设计", "创意指导"],
        narrative: [
          {
            kicker: "输入",
            title: "像一场现场演出一样的产品演示。",
            body:
              "我们将每个段落设计成一首曲目：安静铺垫、可控失真，最后进入产品故事的释放段。",
            stat: "12"
          },
          {
            kicker: "界面",
            title: "编辑清晰度优先于炫技。",
            body:
              "视觉系统使用克制的字体和图像动效，让实验层不遮挡核心信息。",
            stat: "2.8 秒"
          },
          {
            kicker: "发布",
            title: "一个可以持续巡演的 Campaign 系统。",
            body:
              "可复用内容模块让团队不断重组艺术家故事、版本说明和产品瞬间，而不必重新设计页面。",
            stat: "9x"
          }
        ]
      }
    }
  },
  {
    slug: "archive-rift",
    title: "ARCHIVE RIFT",
    subtitle: "A cinematic digital archive for a fashion research studio.",
    category: "Motion",
    year: "2025",
    type: "Editorial Archive",
    intro:
      "A stark browsing system that lets garments, research fragments, and film stills move like a single installation.",
    description:
      "Archive Rift reframes a decade of research as a living editorial object. We built a motion language around crop, scale, and interruption so every scroll feels curated without becoming precious.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "TypeScript", "GSAP", "Headless CMS"],
    services: ["Editorial Design", "Motion System", "Frontend"],
    featured: true,
    narrative: [
      {
        kicker: "Archive",
        title: "A collection that behaves like memory.",
        body:
          "Entries appear in fragments, with images arriving late and titles drifting across the viewport like annotations.",
        stat: "640"
      },
      {
        kicker: "System",
        title: "Strict components, expressive sequencing.",
        body:
          "The archive uses a small set of templates but gains range through scale, spacing, and scroll-triggered motion.",
        stat: "7"
      },
      {
        kicker: "Use",
        title: "Built for editors, not just launch day.",
        body:
          "The data model allows curators to connect garment studies, exhibitions, interviews, and behind-the-scenes material.",
        stat: "CMS"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
        caption: "Scroll film prototype for archive transitions.",
        captionZh: "用于档案过渡的滚动影片原型。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
        caption: "Large-format stills create a cinematic browsing rhythm.",
        captionZh: "大幅静帧建立电影感浏览节奏。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=86",
        caption: "Research fragments and exhibition metadata.",
        captionZh: "研究片段与展览元信息。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为时装研究工作室打造的电影感数字档案。",
        type: "编辑型档案",
        intro:
          "一个冷峻的浏览系统，让服装、研究片段和影片静帧像同一件装置一样运动。",
        description:
          "Archive Rift 将十年研究重新组织成一个活的编辑对象。我们围绕裁切、缩放和中断建立动态语言，让每次滚动都像被策展过，却不显得矫饰。",
        services: ["编辑设计", "动态系统", "前端开发"],
        narrative: [
          {
            kicker: "档案",
            title: "像记忆一样运作的收藏系统。",
            body:
              "条目以碎片出现，图片延迟进入，标题像注释一样在视口中漂移。",
            stat: "640"
          },
          {
            kicker: "系统",
            title: "严格组件，表达性编排。",
            body:
              "档案使用少量模板，但通过尺度、间距和滚动触发动态获得丰富变化。",
            stat: "7"
          },
          {
            kicker: "使用",
            title: "为编辑而建，而不只是为上线而建。",
            body:
              "数据模型让策展人连接服装研究、展览、访谈和幕后材料。",
            stat: "CMS"
          }
        ]
      }
    }
  },
  {
    slug: "black-cart",
    title: "BLACK CART",
    subtitle: "A minimal commerce experience for rare design objects.",
    category: "Commerce",
    year: "2024",
    type: "Commerce Platform",
    intro:
      "A quiet storefront that treats each object like an exhibition piece while keeping purchase flows fast.",
    description:
      "Black Cart sells limited-run furniture and collectible industrial objects. We shaped the experience around contrast: large object photography, exact metadata, and checkout flows that never break the mood.",
    cover:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "Shopify", "TypeScript", "GSAP"],
    services: ["Commerce UX", "Frontend", "Art Direction"],
    narrative: [
      {
        kicker: "Catalog",
        title: "A grid that feels like a showroom wall.",
        body:
          "We built strong repeatable rhythms: object, number, material, price, silence. Nothing tries to shout louder than the work.",
        stat: "54"
      },
      {
        kicker: "Flow",
        title: "Checkout remains invisible until needed.",
        body:
          "Buying stays direct and predictable, with motion reserved for orientation rather than persuasion.",
        stat: "31%"
      },
      {
        kicker: "Scale",
        title: "Designed for drops, archives, and private previews.",
        body:
          "The platform now supports public collections, passworded previews, and post-drop archive states from one content model.",
        stat: "3"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=86",
        caption: "Commerce flow prototype with restrained motion.",
        captionZh: "克制动效下的电商流程原型。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=86",
        caption: "Object-led product wall and purchase metadata.",
        captionZh: "以物件为主角的商品墙与购买元信息。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=86",
        caption: "Private preview state for limited drops.",
        captionZh: "限量发布的私密预览状态。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为稀有设计物件打造的极简电商体验。",
        type: "电商平台",
        intro:
          "一个安静的商店界面，把每件物品当作展品，同时保持购买路径快速明确。",
        description:
          "Black Cart 销售限量家具和工业收藏物。我们围绕强对比构建体验：大幅物件摄影、精确元信息，以及不破坏氛围的结账流程。",
        services: ["电商体验", "前端开发", "艺术指导"],
        narrative: [
          {
            kicker: "目录",
            title: "像展厅墙面一样的商品网格。",
            body:
              "我们建立强重复节奏：物件、编号、材质、价格、留白。没有任何东西比作品本身更吵。",
            stat: "54"
          },
          {
            kicker: "流程",
            title: "结账在需要前保持隐形。",
            body:
              "购买路径直接且可预期，动效只用于定位，而不是说服。",
            stat: "31%"
          },
          {
            kicker: "扩展",
            title: "为发售、档案和私密预览而设计。",
            body:
              "平台现在支持公开系列、密码预览和发布后的档案状态，全部来自同一内容模型。",
            stat: "3"
          }
        ]
      }
    }
  },
  {
    slug: "white-room",
    title: "WHITE ROOM",
    subtitle: "Portfolio system for a director working between film and installation.",
    category: "Motion",
    year: "2024",
    type: "Portfolio / Film Index",
    intro:
      "A stripped-back motion portfolio that lets moving-image work feel expansive on desktop and decisive on mobile.",
    description:
      "White Room needed to organize reels, installation stills, festival notes, and commissioned films without flattening them into a standard gallery. We created an immersive system of large media, restrained captions, and precise transitions.",
    cover:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "Mux", "GSAP", "Tailwind CSS"],
    services: ["Portfolio", "Motion Direction", "Frontend"],
    narrative: [
      {
        kicker: "Frame",
        title: "Every page starts with atmosphere, then gets practical.",
        body:
          "The hero gives each work breathing room before the interface introduces credits, festivals, and production details.",
        stat: "18"
      },
      {
        kicker: "Pacing",
        title: "Fast navigation, slow looking.",
        body:
          "Transitions are short and controlled, encouraging browsing without turning the portfolio into a slideshow.",
        stat: "0.6s"
      },
      {
        kicker: "Library",
        title: "One system for films, stills, and installation views.",
        body:
          "A flexible project schema lets the director publish different media formats while preserving a singular visual tone.",
        stat: "1"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1800&q=86",
        caption: "Director reel transition and installation rhythm.",
        captionZh: "导演作品集转场与装置节奏。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1800&q=86",
        caption: "Film index with large stills and precise credits.",
        captionZh: "由大幅静帧和精确署名构成的影片索引。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=86",
        caption: "Commission page system for mixed media formats.",
        captionZh: "适配多种媒体格式的委托项目页面系统。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为跨越电影与装置的导演打造作品集系统。",
        type: "作品集 / 影片索引",
        intro:
          "一个极简动态作品集，让移动影像在桌面端足够舒展，在移动端足够果断。",
        description:
          "White Room 需要组织 reel、装置静帧、影展信息和委托影片，而不是把它们压成普通图库。我们建立了大媒体、克制字幕和精准转场组成的沉浸系统。",
        services: ["作品集", "动态指导", "前端开发"],
        narrative: [
          {
            kicker: "画框",
            title: "每个页面先建立氛围，再进入实用信息。",
            body:
              "首屏给作品足够呼吸空间，然后界面再引入演职员、影展和制作细节。",
            stat: "18"
          },
          {
            kicker: "节奏",
            title: "快速导航，慢速观看。",
            body:
              "转场短促而可控，鼓励浏览，同时避免把作品集做成幻灯片。",
            stat: "0.6 秒"
          },
          {
            kicker: "库",
            title: "一个系统容纳影片、静帧和装置现场。",
            body:
              "灵活项目模型让导演发布不同媒体格式，同时保留统一视觉语气。",
            stat: "1"
          }
        ]
      }
    }
  },
  {
    slug: "studio-zero",
    title: "STUDIO ZERO",
    subtitle: "Digital identity and portfolio architecture for a design office.",
    category: "Identity",
    year: "2023",
    type: "Studio Website",
    intro:
      "A disciplined identity refresh with a web system built for case studies, recruitment, and public notes.",
    description:
      "Studio Zero wanted a portfolio that felt confident but not loud. The answer was a severe typographic system, a sharp content hierarchy, and subtle WebGL texture that makes the site feel alive without becoming decorative.",
    cover:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=86",
    stack: ["Next.js", "TypeScript", "Three.js", "MDX"],
    services: ["Brand Refresh", "Information Architecture", "Frontend"],
    narrative: [
      {
        kicker: "Tone",
        title: "A visual voice with restraint and bite.",
        body:
          "The identity uses sparse marks, oversized type, and tactile monochrome imagery to create instant recognition.",
        stat: "6"
      },
      {
        kicker: "Content",
        title: "Case studies built around decisions, not decoration.",
        body:
          "Each project page explains the context, system, and outcome with image-led storytelling and clean metadata.",
        stat: "24"
      },
      {
        kicker: "Growth",
        title: "A framework the studio can actually maintain.",
        body:
          "The final site ships with reusable content patterns for projects, notes, services, and recruitment moments.",
        stat: "MDX"
      }
    ],
    media: [
      {
        type: "video",
        src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
        poster:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=86",
        caption: "Identity reveal and WebGL texture behavior.",
        captionZh: "身份系统揭示与 WebGL 纹理行为。",
        layout: "wide"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=86",
        caption: "Studio case study template and editorial layout.",
        captionZh: "工作室案例模板与编辑型排版。",
        layout: "tall"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=86",
        caption: "Modular system for notes, services, and recruiting.",
        captionZh: "服务、笔记与招聘内容的模块系统。",
        layout: "square"
      }
    ],
    translations: {
      zh: {
        subtitle: "为设计事务所打造数字身份与作品集架构。",
        type: "工作室网站",
        intro:
          "一次克制的身份更新，以及用于案例、招聘和公开笔记的 Web 系统。",
        description:
          "Studio Zero 想要自信但不喧闹的作品集。答案是冷峻的字体系统、清晰内容层级，以及让网站鲜活但不装饰化的 WebGL 纹理。",
        services: ["品牌更新", "信息架构", "前端开发"],
        narrative: [
          {
            kicker: "语气",
            title: "克制但有锋利度的视觉声音。",
            body:
              "身份系统使用稀疏标识、超大字体和有触感的黑白影像建立即时识别。",
            stat: "6"
          },
          {
            kicker: "内容",
            title: "围绕决策而不是装饰构建案例。",
            body:
              "每个项目页用图像叙事和清晰元信息解释背景、系统与结果。",
            stat: "24"
          },
          {
            kicker: "增长",
            title: "工作室真的能维护的框架。",
            body:
              "最终网站提供可复用内容模式，用于项目、笔记、服务和招聘场景。",
            stat: "MDX"
          }
        ]
      }
    }
  }
];

export const categories = [
  "All",
  "Identity",
  "Experience",
  "Motion",
  "Commerce"
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string) {
  return projects.filter((project) => project.slug !== slug).slice(0, 3);
}

export function getProjectCopy(project: Project, lang: "en" | "zh") {
  if (lang === "zh") {
    return {
      title: project.title,
      subtitle: project.translations.zh.subtitle,
      category: getCategoryLabel(project.category, lang),
      year: project.year,
      type: project.translations.zh.type,
      intro: project.translations.zh.intro,
      description: project.translations.zh.description,
      stack: project.stack,
      services: project.translations.zh.services,
      narrative: project.translations.zh.narrative
    };
  }

  return {
    title: project.title,
    subtitle: project.subtitle,
    category: getCategoryLabel(project.category, lang),
    year: project.year,
    type: project.type,
    intro: project.intro,
    description: project.description,
    stack: project.stack,
    services: project.services,
    narrative: project.narrative
  };
}

export function getCategoryLabel(category: ProjectCategory, lang: "en" | "zh") {
  if (lang === "en") {
    return category;
  }

  const labels: Record<ProjectCategory, string> = {
    Identity: "品牌识别",
    Experience: "体验",
    Motion: "动态",
    Commerce: "电商"
  };

  return labels[category];
}
