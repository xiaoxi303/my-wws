export type Lang = "en" | "zh";

export const uiText = {
  en: {
    nav: {
      brand: "NULL FORM",
      menu: "MENU",
      close: "CLOSE",
      status: {
        home: "INDEX",
        projects: "PROJECTS",
        about: "ABOUT",
        contact: "CONTACT"
      },
      overlayKicker: "Navigation / Cinematic interface index",
      email: "studio@nullform.example"
    },
    hero: {
      kicker: "Independent digital direction / Identity / Interaction",
      title: ["NULL", "FORM", "STUDIO"],
      copy:
        "A monochrome digital studio building cinematic interfaces, identity systems, and WebGL experiences with severe restraint.",
      primary: "View Projects",
      secondary: "Start a Brief",
      manifesto: "WE DESIGN INTERFACES THAT FEEL ALIVE."
    },
    projects: {
      kicker: "Selected work / Horizontal",
      title: "Projects",
      copy:
        "Scroll vertically. The work moves sideways, revealing a sequence of identities, campaigns, WebGL systems, and motion-led interfaces.",
      viewCase: "View Case",
      media: "Media"
    },
    about: {
      kicker: "About / Manifesto",
      lines: ["A MONOCHROME", "DIGITAL STUDIO", "BUILDING CINEMATIC", "INTERFACES."],
      copy:
        "We use motion like architecture: slow reveals, hard cuts, restrained hover states, and WebGL ambience that gives the interface a pulse without turning it into noise.",
      tags: ["Art Direction", "Identity", "WebGL", "Motion", "Interface", "Experience"]
    },
    services: {
      kicker: "Services / Capabilities",
      title: "What we make move."
    },
    contact: {
      kicker: "Contact / Outro",
      title: "LET'S BUILD SOMETHING THAT SHOULD NOT WORK — BUT DOES.",
      copy:
        "Send the impossible part first. The shape, the launch, the strange constraint, the thing that needs to feel inevitable when it lands.",
      button: "Start the Brief",
      footer: "Direction / Identity / WebGL / Motion"
    },
    case: {
      year: "Year",
      type: "Type",
      category: "Category",
      stack: "Stack",
      index: "Project Index",
      overview: "Overview",
      mediaSystem: "Media System",
      gallery: "Stills / Motion",
      next: "Related",
      allProjects: "All Projects",
      back: "Back to Index",
      play: "Motion study",
      images: "Image sequence"
    }
  },
  zh: {
    nav: {
      brand: "NULL FORM",
      menu: "菜单",
      close: "关闭",
      status: {
        home: "索引",
        projects: "项目",
        about: "关于",
        contact: "联系"
      },
      overlayKicker: "导航 / 电影感界面索引",
      email: "studio@nullform.example"
    },
    hero: {
      kicker: "独立数字创意指导 / 品牌识别 / 互动体验",
      title: ["NULL", "FORM", "STUDIO"],
      copy:
        "一个黑白极简数字工作室，构建电影感界面、品牌系统与克制的 WebGL 体验。",
      primary: "查看项目",
      secondary: "发起简报",
      manifesto: "我们设计会呼吸的界面。"
    },
    projects: {
      kicker: "精选作品 / 横向滚动",
      title: "项目",
      copy:
        "继续向下滚动，作品会横向展开，呈现身份系统、Campaign、WebGL 与动态交互界面。",
      viewCase: "查看案例",
      media: "媒体"
    },
    about: {
      kicker: "关于 / 宣言",
      lines: ["一个黑白", "数字工作室", "构建电影感", "交互界面。"],
      copy:
        "我们把动效当成建筑来处理：缓慢揭示、明确切换、克制 hover，以及让界面有呼吸感但不喧闹的 WebGL 氛围。",
      tags: ["创意指导", "品牌识别", "WebGL", "动态设计", "界面", "体验"]
    },
    services: {
      kicker: "服务 / 能力",
      title: "我们让什么动起来。"
    },
    contact: {
      kicker: "联系 / 收束",
      title: "让我们做一个本不该成立，却精准运转的东西。",
      copy:
        "先把最难的部分发来：形态、发布节点、奇怪限制，或那个落地时必须显得理所当然的想法。",
      button: "发送简报",
      footer: "创意指导 / 品牌识别 / WebGL / 动态"
    },
    case: {
      year: "年份",
      type: "类型",
      category: "分类",
      stack: "技术栈",
      index: "项目索引",
      overview: "项目概览",
      mediaSystem: "媒体系统",
      gallery: "影像 / 动态",
      next: "相关项目",
      allProjects: "全部项目",
      back: "返回索引",
      play: "动态片段",
      images: "图片序列"
    }
  }
} as const;
