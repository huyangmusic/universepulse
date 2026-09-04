# 🌍 UniversePulse (universepulse.net) 项目规划与产品需求文档 (PRD) v9.0

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| v9.0 | 2026-09-04 | 一期上线，6 语言 i18n 完成，错误边界 + favicon + sitemap alternates 补充，部署至 Vercel |
| v8.0 | 2026-07-26 | 基于 GitHub 竞品深度分析，新增 Embed 开放层、国家维度对比、个人碳足迹计算器、结构化数据规范 |
| v7.4 | 2026-07-24 | 初始完整规划，含核心算法、视觉规范、路线图 |

---

## 一、 项目愿景与产品定位 (Overview & Positioning)

* **产品名称**：**UniversePulse** (全球脉搏)
* **域名**：`universepulse.net`（已部署，GitHub: `huyangmusic/universepulse`）
* **产品形态**：基于现代 Web 技术的轻量化、高交互性全球宏观数据实时大屏。
* **核心价值**：摆脱传统数据网站（如 Worldometer）陈旧繁杂的 UI 风格，采用极致美学的暗黑科技风（Dark Tech / Glassmorphism），结合高帧率动态数字和强共鸣的互动工具，让宏观的全球人口与资源消耗数据变得震撼、直观且易于在社交网络传播。
* **技术核心**：**零后端数据库依赖**。利用纯前端数学模型与高精度时间戳差值算法驱动，确保 100% 稳定运行、零宕机风险、极致加载速度。部分增强功能（如动态 OG 图片）需借助 Vercel Edge Function，不影响核心架构的前端纯粹性。

### 竞品深度分析

| 竞品 | 优势 | 劣势 | UniversePulse 差异化 |
|------|------|------|---------------------|
| **Worldometer** | 全球知名度最高，数据来源透明，60+ 页面覆盖 | UI 停留在 2000 年代，大量广告干扰，移动端体验差，无社交分享，数字滚动动画基础（纯文本替换），依赖闭源商业 API | 暗黑科技风 + 社交裂变工具 + 逐位翻转动效 + 无广告 |
| **PopulationCounter** | 功能聚焦、界面简洁、提供 embed 代码 | 仅聚焦人口、依赖 Worldometer 数据（非原创）、视觉设计一般 | 多维度数据 + 高帧率动画 + 个人账单 |
| **LiveAtlas** | 地图交互一流（MapTiler 矢量瓦片），暗色主题，PWA 支持，性能优化细致 | 侧重历史而非实时数据，数据类别有限 | 实时数据 + 多维度 + 互动工具 |
| **OurWorldInData** | 学术研究级数据可视化，可下载数据集（CSV/JSON），完整参考文献 | 非实时，偏学术研究，学习曲线陡峭，非仪表盘风格 | 实时跳动 + 大众化表达 + 零学习门槛 |

**市场空白**：目前没有任何产品同时覆盖"实时数据 × 极致美学 × 社交裂变"这个三角。

#### 竞品功能维度对比

| 功能 | Worldometer | PopulationCounter | LiveAtlas | OurWorldInData | UniversePulse (v1) |
|------|-------------|-------------------|-----------|----------------|-------------------|
| 实时人口时钟 | 有 | 有 | 无 | 无 | 有 |
| 多类别实时统计 | 8+ 类 | 仅人口 | 无 | 无 | 有 (17 类) |
| 交互式世界地图 | 无 | 无 | 有 | 部分 | 无 (二期) |
| 数字滚动动画 | 基础文本替换 | 基础 | 无 | 无 | 3D 翻转 (L1) |
| 暗色大屏主题 | 无（白底） | 无 | 有 | 无 | 有 |
| 数据可下载 | 无 | 无 | 无 | 有 (CSV) | 无 (二期 API) |
| API/Embed 开放 | 无 | 有 (embed iframe) | 无 | 有 (图表嵌入) | 无 (二期) |
| 多语言 | 20+ 种 | 多种 | 少 | 少 | 有 (6 语 + RTL) |
| 海报生成 | 无 | 无 | 无 | 无 | 有（独家，3 模板） |
| 移动端适配 | 差 | 一般 | 好 | 一般 | 好 (PWA) |
| 广告干扰 | 严重 | 有 | 无 | 无 | 无 |
| 社交分享 | 无 | 无 | 无 | 无 | 有（Web Share API） |
| 个人账单/互动 | 无 | 无 | 无 | 无 | 有（4 层级叙事） |
| 时间机器/历史回溯 | 无 | 无 | 无 | 有（非实时） | 有（1960→2050） |
| 会话计时器 | 无 | 无 | 无 | 无 | 有（HH:MM:SS） |
| 个人化 LivingMoment | 无 | 无 | 无 | 无 | 有（11 实时指标） |

---

## 二、 目标受众 (Target Audience)

1. **宏观极客与数据爱好者**：热衷于观察全球人口、科技、能源动态的用户。
2. **内容创作者与自媒体人**：需要直观、震撼的全球数据支撑，或寻找趣味科普素材的创作者。
3. **泛大众群体**：被视觉大屏和"个人出生账单"等趣味互动吸引，愿意在社交媒体（如小红书、X、朋友圈等）进行裂变分享的年轻网民。
4. **教育工作者与学生**：将 UniversePulse 作为课堂演示工具，直观展示人口增长、资源消耗的速度。

---

## 三、 功能模块设计 (Functional Architecture)

### 3.1 核心大屏板块 (Live Dashboard)

页面采用多列卡片网格布局（支持响应式：PC 端多栏平铺，移动端单栏流式），所有核心数据均实现"秒级/毫秒级"平滑跳动。

* **板块 A：全球人口与时间刻度 (Population & Time)**
  * **全球总人口**：实时跳动的核心数字（精确到个位），72-96px 大字号，Space Mono 等宽字体。
  * **今日人口动态**：今日已出生人口、今日已死亡人口、今日人口净增长。
  * **今年累计动态**：今年已出生总人数、今年已死亡总人数、今年人口净增长。
  * **里程碑倒计时**：距离全球人口达到下一个整数关卡（84 亿）的实时倒计时。

* **板块 B：生存、资源与环境 (Resources & Environment)**
  * **能源消耗**：累计消耗的石油（桶）、煤炭（吨）、天然气（立方米）。
  * **生态危机**：累计砍伐/消失的森林面积（公顷）、累计碳排放量（吨）。
  * **水资源**：累计消耗的淡水量（立方米）。

* **板块 C：数字社会与流动 (Digital & Society)**
  * **数字足迹**：累计发送的电子邮件总数、全网网页搜索查询量。
  * **现代生活**：全球航班架次、加密货币交易笔数估算。

#### 视觉层次规范

| 层级 | 内容 | 字体大小 | 动画效果 |
|------|------|---------|---------|
| L1（最大） | 全球总人口 | 72-96px | Space Mono 等宽 + tabular-nums |
| L2 | 今日出生/死亡/净增 | 36-48px | 直接文本渲染 + tabular-nums |
| L3 | 资源/环境数据 | 24-32px | 直接文本渲染 + tabular-nums |
| L4 | 数字社会数据 | 18-24px | 直接文本渲染 + tabular-nums |

### 3.2 个人叙事核心："回到你出生那一天" (Personal Narrative)

* **交互流程**：用户在首页输入框选择/输入自己的出生年月日。
* **4 层个人叙事**：
  * **Tier 1 — Inside You（你体内）**：心跳、呼吸、眨眼、步数、想法、梦境
  * **Tier 2 — Your Orbit（你的轨道）**：日出、满月、季节、夜晚、地球旅行距离
  * **Tier 3 — Your Life（你的人生）**：出生以来出生/死亡/净增人口、航班、邮件、搜索
  * **Tier 4 — Your Footprint（你的足迹）**：碳排放、石油消耗、淡水、森林、海平面上升
* **裂变传播**：
  * Canvas 海报生成，3 种模板（Dark / Minimal / Neon），1200×1800 PNG
  * Web Share API 直接分享
  * 底部 QR Code 指向 universepulse.net
* **会话计时器**：显示"自您打开此页面以来"的精确计时（HH:MM:SS）
* **对比类比系统**：将抽象大数字转化为具象参照物（体育场、奥运游泳池、汽车年排放等）

### 3.3 辅助功能

* **时间机器**：年份滑块（1960→2050），支持暂停/倍速播放（1×/5×/10×/50×），显示历史事件和累计数据对比图
* **实时动态面板 (LivingMoment)**：11 个指标每 3.5 秒自动轮换展示，含诗意文案和比较类比
* **MetricsGrid**：17 个指标按 4 个分类展示（人口/资源/环境/数字）

### 3.4 页面结构

| 路由 | 页面 | SEO Schema |
|------|------|-----------|
| `/` | 主页仪表盘 + 个人叙事入口 | WebApplication + Dataset |
| `/born-since` | 出生以来人口统计 | FAQPage |
| `/co2-since` | 出生以来碳排放统计 | FAQPage |
| `/earth-distance` | 出生以来地球旅行距离 | FAQPage |
| `/sea-level-rise` | 出生以来海平面上升 | FAQPage |

---

## 四、 技术栈与架构设计 (Tech Stack & Architecture)

### 4.1 前端框架

* **Next.js 16.2.11 (App Router)** —— SSR + 静态生成，支持 `generateMetadata()` 动态 SEO，通过 Vercel 全球 CDN 分发。

### 4.2 样式与 UI

* **Tailwind CSS v4** + 自定义 glassmorphism 工具类（`glass-card`, `glow-*`），暗黑主题配色体系（`bg-background`, `text-primary`, `text-secondary`, `text-text-muted`）。
* **字体**：
  * `@fontsource-variable/inter`（英文正文）
  * `@fontsource-variable/noto-sans-sc`（中文正文）
  * `@fontsource/space-mono`（数字等宽字体，L1 大数字）
  * `@fontsource/syne`（标题字体，Syne 400/700）
* **动效引擎**：
  * `Framer Motion`（页面过渡、入场动画、AnimatePresence 状态切换）
  * `react-flip-numbers`（L1 人口大数字 3D 翻转效果）
  * 自定义 `requestAnimationFrame` 循环（L2-L4 数字平滑更新）

### 4.3 核心算法驱动

* **零后端数据库依赖**。基于以下权威数据源折算每秒平均增长率：

  | 数据类别 | 来源 | 基准值 |
  |---|---|---|
  | 人口 | UN DESA WPP 2024 | 基准人口 8,350,000,000（2026-07-01），年出生 1.34 亿，年死亡 6,200 万 |
  | 石油消耗 | IEA/EIA 2024 | ~1.05 亿桶/天 (~1,215 桶/秒) |
  | 煤炭消耗 | BP Statistical Review 2024 | ~161 亿吨/年 (~0.51 吨/秒) |
  | 碳排放 | Global Carbon Budget 2023 | ~374 亿吨/年 (~1,187 吨/秒) |
  | 天然气消耗 | IEA 2024 | ~4,200 亿 m³/年 (~13,300 m³/秒) |
  | 森林消失 | FAO FRA 2020 | ~410 万公顷/年 (~0.13 公顷/秒) |
  | 淡水消耗 | UN Water | ~4.6 万亿 m³/年 (~146,000 m³/秒) |
  | 邮件发送 | Statista/Radicati | ~3.6 万亿封/天 (~41,667 封/秒) |
  | 搜索查询 | Statista/Backlinko | ~8.5 亿次/天 (~9,838 次/秒) |
  | 航班架次 | ICAO/IATA | ~107,000 架/天 (~1.24 架/秒) |
  | 加密货币交易 | Chainalysis | ~500 万笔/天 (~58 笔/秒) |

* **时间戳差值算法**：每次页面渲染时，根据当前绝对时间戳（`Date.now()`）与基准时间戳的差值，通过数学公式直接计算并渲染当前应有的数值。页面挂机或切换后台再回来时，数据依然精准且永不漂移。
* **三层数据模型架构**：
  1. `lib/constants.ts` — 所有原始常量（基准时间戳 `BASE_TIMESTAMP = 2026-07-01T00:00:00Z`、各指标年/日总量、每秒速率、里程碑目标 `NEXT_MILESTONE = 8,400,000,000`、对比参照物定义 `COMPARISONS`）
  2. `lib/math.ts` — 计算引擎，提供 `calculateMetric()`（累计总量）、`calculateTodayMetric()`（今日累计）、`calculateYearMetric()`（今年累计）、`getNextMilestoneProgress()`（里程碑进度）、`formatNumber()`（本地化数字格式化）、`calculateSessionMetric()`（会话期间累计）
  3. `components/Dashboard.tsx` — rAF 循环编排器，维护单一 `TickerState` 对象，变更检测后批量更新 React state，避免过度重渲染

* **17 个核心指标**（`MetricKey` 类型）：`totalPopulation`、`todayBirths`、`todayDeaths`、`todayNetGrowth`、`yearBirths`、`yearDeaths`、`yearNetGrowth`、`oilBarrels`、`coalTonnes`、`carbonTonnes`、`naturalGasCubicMeters`、`deforestationHectares`、`waterCubicMeters`、`emailsSent`、`searchQueries`、`flightsTaken`、`cryptoTransactions`

### 4.4 国际化（i18n）

* **next-intl v4.13.4**，支持 **6 种语言**：en / zh / ja / es / ar / fr
* 服务器端通过 `x-next-intl-locale` header（由 middleware 设置）检测用户首选语言，回退顺序：header → `NEXT_LOCALE` cookie → `Accept-Language` header → English
* 翻译文件按语言拆分为 `messages/{locale}.json`，14 个顶层 key（`siteDescription`, `header`, `dashboard`, `bornSince`, `co2Since`, `earthDistance`, `seaLevel`, `livingMoment`, `dataSources`, `timeMachine`, `narrative`, `metrics`, `poster`, `notFound`）
* 阿拉伯语（ar）支持 RTL 布局（`dir="rtl"` on `<html>`）
* 支持 cookie-based 语言切换（`LocaleSwitcher` 设置 `NEXT_LOCALE` cookie，URL 不含语言前缀）
* 数字和日期通过 `Intl.NumberFormat` / `Intl.DateTimeFormat` 自动本地化

### 4.5 SEO & GEO 配置

* **Metadata**：每个页面均有 `generateMetadata()` 导出 `title`（默认 + template `%s | UniversePulse`）、`description`、`alternates.languages`（hreflang 六语映射）、`openGraph`（URL、siteName、OG 图片 1200×630、多语言 locale）、`twitter`（summary_large_image）
* **结构化数据**：
  * 主页：`WebApplication` + `Dataset` JSON-LD
  * 子页面：`FAQPage` JSON-LD（每个 FAQ 页面的 `<details>` 内容自动转换为 schema）
* **robots.txt**：`index: true, follow: true`，允许搜索引擎抓取全部页面
* **sitemap.xml**：30 个 URL × 6 语言 = 180 条 hreflang 条目，动态生成（`app/sitemap.ts`）
* **Canonical URL**：`https://universepulse.net`，多语言版本通过 hreflang 关联
* **动态 OG 图片**：社交分享时展示实时数据预览，Vercel Edge Function (`app/api/og/route.tsx`) + Satori，支持 4 种主题色（default/born-since/co2-since/earth-distance/sea-level-rise）
* **favicon**：SVG 格式渐变图标（`public/favicon.svg`, `public/icon.svg`）

### 4.6 PWA 与基础设施

| 服务 | 用途 | 状态 |
|------|------|------|
| **动态 OG 图片** | 社交分享预览 | ✅ 已实现（Satori + Edge Function） |
| **结构化数据** | SEO 优化 | ✅ JSON-LD (WebApplication, Dataset, FAQPage) |
| **PWA** | 添加到主屏幕，离线查看 | ✅ Service Worker (cache-first 策略) |
| **PWA Manifest** | 应用配置（maskable icons, display_override） | ✅ `public/manifest.json` |
| **错误边界** | 路由级 + 布局级错误捕获 | ✅ `error.tsx`, `global-error.tsx`, `not-found.tsx` |

### 4.7 核心算法边界情况处理

| 边界情况 | 风险 | 处理方案 |
|----------|------|---------|
| **基准数据过期** | UN 年度数据更新后产生系统性偏差 | 页脚标注数据来源和年份，可在 `constants.ts` 中手动更新 |
| **时钟回拨/NTP 同步** | 用户设备时间不准确导致数值异常 | 用 `Date.now()` 绝对时间戳，基准时间固定 |
| **页面长期挂机** | `requestAnimationFrame` 暂停导致数值不同步 | 监听 `visibilitychange` 事件，页面恢复时瞬间跳到正确值 |
| **时区差异** | "今日出生/死亡"按 UTC 还是本地时间？ | 明确定义按 UTC 日对齐，并在 UI 标注 |
| **低性能设备** | 高帧率动画导致卡顿 | `requestAnimationFrame` 仅在 `visibleRef` 为 true 时运行 |

### 4.8 性能目标

| 指标 | 目标值 | 实际 |
|------|--------|------|
| Lighthouse Performance | > 90 | 待测试 |
| Lighthouse SEO | > 95 | ✅ (动态 metadata + JSON-LD + hreflang) |
| Lighthouse Accessibility | > 90 | 待测试 |
| 首屏加载 (LCP) | < 1s | 待测试 |
| 同时跳动计数器 | 17 个独立计算 | ✅ 纯数学，无额外 API 调用 |

### 4.9 部署托管

* **Vercel** —— 全球 CDN 加速，零运维成本，自带 HTTPS。仓库：`huyangmusic/universepulse`，域名：`universepulse.net`。

---

## 五、 数据模型与来源规范 (Data Model & Sources)

### 5.1 数据可信度分级策略

**核心原则：不追求所有数据都"精确"，而是分层处理——权威数据做锚点，估算数据做量级。**

| 层级 | 定位 | 可信度要求 | 展示方式 |
|------|------|-----------|---------|
| **Tier 1 — 权威基准** | 人口 + 核心能源 | ★★★★★ 可直接引用年度总量 | 标注来源 URL + 误差范围 |
| **Tier 2 — 行业估算** | 碳排放、森林、水资源 | ★★★☆☆ 可支撑量级展示 | 标注"基于年度均值折算，仅供科普" |
| **Tier 3 — 参考估算** | 邮件、搜索、航班、加密货币 | ★★☆☆☆ 仅展示数量级 | 标注"估算值，数据来源见页脚" |

### 5.2 Tier 1 — 权威基准数据

| 字段 | 数值 | 来源 |
|------|------|------|
| 基准人口总数 | **8,350,000,000** (2026-07-01) | UN DESA WPP 2024 |
| 年出生人数 | ~**134,000,000** | UN DESA WPP 2024 |
| 年死亡人数 | ~**62,000,000** | UN DESA WPP 2024 |
| 每秒出生率 | **~4.25 人/秒** | 134M ÷ 31,557,600 |
| 每秒死亡率 | **~1.97 人/秒** | 62M ÷ 31,557,600 |
| 每秒净增率 | **~2.28 人/秒** | 72M ÷ 31,557,600 |
| 年全球石油消耗量 | ~**1.05 亿桶/天** | IEA Oil Market Report 2024 |
| 每秒石油消耗率 | **~1,215 桶/秒** | 105M ÷ 86,400 |
| 年全球煤炭消耗量 | ~**161 亿吨** | BP Statistical Review 2024 |
| 每秒煤炭消耗率 | **~0.51 吨/秒** | 16.1Gt ÷ 31,557,600 |

### 5.3 Tier 2 — 行业估算数据

| 数据类别 | 年总量 | 每秒速率 | 来源 |
|---|---|---|---|
| 碳排放 (CO₂) | ~374 亿吨 | ~1,187 吨/秒 | Global Carbon Budget 2023 |
| 天然气消耗 | ~4.2 万亿 m³ | ~13,300 m³/秒 | IEA Gas Market Report 2024 |
| 森林砍伐 | ~410 万公顷 | ~0.13 公顷/秒 | FAO FRA 2020 |
| 淡水抽取 | ~4.6 万亿 m³ | ~146,000 m³/秒 | UN Water / FAO AQUASTAT |
| 海平面上升 | ~3.6 mm/年 | ~0.11 μm/秒 | IPCC AR6 WGI 2021 |

> ⚠️ "消耗"与"抽取"不同。抽取量中约 70% 用于农业灌溉，约 30% 真正被消耗（蒸发/产品化）。

### 5.4 Tier 3 — 参考估算数据

| 数据类别 | 日总量 | 每秒速率 | 来源 |
|---|---|---|---|
| 邮件发送 | ~3.6 万亿封 | ~41,667 封/秒 | Statista / Radicati Project |
| 搜索查询 | ~8.5 亿次 | ~9,838 次/秒 | Statista / Backlinko |
| 航班架次 | ~107,000 架 | ~1.24 架/秒 | ICAO/IATA |
| 加密货币交易 | ~500 万笔 | ~58 笔/秒 | Chainalysis 2024 Report |

### 5.5 虚假精度声明（UI 必显）

> 📊 **数据来源说明**：UniversePulse 的实时数据基于联合国人口司（UN DESA）、国际能源署（IEA）、BP 统计评审等权威机构的年度总量数据，折算为每秒平均增长率。由于年度数据本身存在统计误差（如全球人口估计误差 ±500 万），且折算为"每秒"是一种数学近似，**所有数值均为估算值，仅供科普展示，不构成精确统计**。完整数据来源请参见页脚。

### 5.6 关键公式

```javascript
// 通用公式
const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60; // 31,557,600
const SECONDS_PER_DAY = 24 * 60 * 60;            // 86,400

// 累计总量（自基准时间戳）
function calculateMetric(base, ratePerSecond, now) {
  const elapsed = (now - BASE_TIMESTAMP) / 1000;
  return Math.floor(base + elapsed * ratePerSecond);
}

// 今日累计（自 UTC 午夜）
function calculateTodayMetric(ratePerSecond, now) {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const elapsed = (now - midnight) / 1000;
  return Math.max(0, Math.floor(elapsed * ratePerSecond));
}
```

---

## 六、 开发实施状态 (Development Status)

### 阶段一：核心功能 — ✅ 已完成

| 功能 | 状态 | 实现细节 |
|------|------|---------|
| 实时人口计数器 | ✅ | rAF 循环 + tabular-nums，抗后台节流 |
| 17 个全球指标 | ✅ | 人口/能源/环境/数字 4 个分类 |
| 个人出生叙事 (4 层) | ✅ | Inside You → Your Orbit → Your Life → Your Footprint |
| 时间机器 (1960→2050) | ✅ | 年份滑块 + 倍速 + 历史事件 + 对比条形图 |
| LivingMoment 实时面板 | ✅ | 11 个指标自动轮换 + 诗意文案 |
| Canvas 海报生成器 | ✅ | 3 模板 (Dark/Minimal/Neon) + QR Code + Web Share |
| 多语言 i18n (6 语) | ✅ | en/zh/ja/es/ar/fr，cookie-based 切换，RTL 支持 |
| 动态 OG 图片 | ✅ | Satori + Edge Function，5 种主题色 |
| JSON-LD 结构化数据 | ✅ | WebApplication, Dataset, FAQPage |
| 多语言 Sitemap | ✅ | 30 URLs × 6 语言 = 180 hreflang 条目 |
| PWA | ✅ | Service Worker + manifest + maskable icons |
| 错误边界 | ✅ | error.tsx + global-error.tsx + not-found.tsx |
| favicon | ✅ | SVG 渐变图标 |
| 数据源页脚 | ✅ | 12 个来源，分 Tier 展示，可展开 |

### 阶段二：扩展功能 — 规划中

| 功能 | 优先级 | 说明 |
|------|--------|------|
| Embed iframe 开放层 | 高 | 轻量 iframe 嵌入代码，参考 PopulationCounter |
| API 开放层 | 中 | Vercel Edge Function 暴露只读 API |
| 国家维度数据 | 中 | UN DESA WPP 2024 分国人口数据 |
| 个人碳足迹计算器 | 低 | 用户输入习惯，输出年度碳排放 |
| Newsletter 订阅 | 低 | 每周全球数据周报 |
| 交互式世界地图 | 低 | MapTiler/Mapbox GL 矢量瓦片 |

---

## 七、 增长与扩展方向

这些功能规划中，不在当前版本范围内：

### 7.1 Embed iframe 开放层
允许第三方网站/博客嵌入实时计数器，生成反向链接提升 SEO 权重。

### 7.2 API 开放层
用 Vercel Edge Function 暴露只读 API，允许第三方引用实时数据。

### 7.3 国家维度对比工具
用户选择两个国家，对比人口、资源消耗、人均指标。

### 7.4 个人碳足迹海报
基于用户输入的饮食习惯、交通方式生成"我的年度碳排放"海报。

### 7.5 无障碍增强 (a11y)
ARIA 标签 + 键盘导航 + 屏幕阅读器支持。

---

## 八、 风险评估与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|---------|
| 数据源不可靠或过时 | 降低可信度 | 中 | 标注数据来源和时间，定期人工复核 |
| 虚假精度引发质疑 | 信任危机 | 中 | UI 显著位置添加误差声明 |
| Vercel 免费额度限制 | 无法承载流量 | 低 | 纯前端架构本身极省资源 |
| 海报生成内存溢出 | 用户体验差 | 中 | Canvas 手动绘制优先 |
| 移动端性能不足 | 动画卡顿 | 中 | visibilitychange 检测，后台自动暂停 |
| 浏览器后台节流 | rAF 频率降低 | 低 | 时间戳差值算法天然抗节流 |
| 多语言翻译不完整 | 部分语言缺少文案 | 低 | 6 语言已全部完成 |
| SEO 爬取 | 纯客户端动态内容被忽略 | 低 | Next.js SSR 确保首屏可索引 |

---

## 九、 综合评估

| 维度 | 评分 (1-10) | 说明 |
|------|-------------|------|
| 产品定位 | **9** | 差异化清晰，市场空白明显 |
| 技术选型 | **9** | Next.js 16 + 纯前端模型 + glassmorphism UI |
| 数据模型 | **9** | Tier 分级策略 + 权威数据源 + 具体数值锚点 |
| 可实施性 | **10** | 一期全部完成，代码已部署上线 |
| 国际化 | **9** | 6 语种完整覆盖，RTL 支持 |
| SEO | **9** | 动态 metadata + JSON-LD + hreflang sitemap |
| 增长潜力 | **8** | 社交裂变设计合理，二期 Embed/API 待开发 |
| **综合** | **9.0/10** | **一期已上线，可按 roadmap 推进二期** |

---

## 十、 附录

### 10.1 GitHub 仓库

| 项目 | 链接 |
|------|------|
| 源代码 | https://github.com/huyangmusic/universepulse |
| 在线访问 | https://universepulse.net |

### 10.2 竞品参考链接

| 项目 | GitHub | 说明 |
|------|--------|------|
| Worldometer | [matheusfelipeog/worldometer](https://github.com/matheusfelipeog/worldometer) | Python API 封装包 |
| Worldometer API | [nolancacheux/worldometer-real-time-api](https://github.com/nolancacheux/worldometer-real-time-api) | NestJS REST API，每5秒抓取 |
| World Population API | [VinceDerPrince/World-Population-API](https://github.com/VinceDerPrince/World-Population-API) | TypeScript NPM 估算库 |
| LiveAtlas | [JLyne/LiveAtlas](https://github.com/JLyne/LiveAtlas) | Minecraft 地图前端，Vue+TS，377⭐ |
| Our World in Data Grapher | [owid/owid-grapher](https://github.com/owid/owid-grapher) | 交互式图表库，1,546⭐ |
