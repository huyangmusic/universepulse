|# 🌍 UniversePulse (universepulse.net) 项目规划与产品需求文档 (PRD) v8.0
|
|---
|
|**版本历史**：
|* v8.0 (2026-07-26): 基于 GitHub 竞品深度分析，新增 Embed 开放层、国家维度对比、个人碳足迹计算器、结构化数据规范、增长策略
|* v7.4: 初始完整规划，含核心算法、视觉规范、路线图
|

---

## 一、 项目愿景与产品定位 (Overview & Positioning)

* **产品名称**：**UniversePulse** (全球脉搏)
* **可选域名**：
  * 主域名：`universepulse.net`（推荐，适合技术与网络平台）
  * 备用域名：`universepulse.org`（适合公益、开源或数据统计属性）、`universepulse.info`（适合信息资讯属性）
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

| 功能 | Worldometer | PopulationCounter | LiveAtlas | OurWorldInData | UniversePulse (目标) |
|------|-------------|-------------------|-----------|----------------|---------------------|
| 实时人口时钟 | 有 | 有 | 无 | 无 | 有 |
| 多类别实时统计 | 8+ 类 | 仅人口 | 无 | 无 | 有 |
| 交互式世界地图 | 无 | 无 | 有 | 部分 | 有（二期） |
| 数字滚动动画 | 基础文本替换 | 基础 | 无 | 无 | **逐位翻转 (FlipNumbers)** |
| 暗色大屏主题 | 无（白底） | 无 | 有 | 无 | **有** |
| 数据可下载 | 无 | 无 | 无 | 有 (CSV) | 有（二期 API） |
| API/Embed 开放 | 无 | 有 (embed iframe) | 无 | 有 (图表嵌入) | **有 (iframe + API)** |
| 多语言 | 20+ 种 | 多种 | 少 | 少 | 有 (6 语) |
| 海报生成 | 无 | 无 | 无 | 无 | **有（独家）** |
| 移动端适配 | 差 | 一般 | 好 | 一般 | 好 |
| 广告干扰 | 严重 | 有 | 无 | 无 | 无 |
| 社交分享 | 无 | 无 | 无 | 无 | **有（Web Share API + 海报）** |
| 个人账单/互动 | 无 | 无 | 无 | 无 | **有（出生计算器）** |
| 时间机器/历史回溯 | 无 | 无 | 无 | 有（非实时） | **有（1960→2050）** |

#### 可超越的关键点

| 差异化维度 | 竞品现状 | UniversePulse 方案 |
|-----------|---------|-------------------|
| **数字滚动动画** | Worldometer 只有纯文本替换 | `react-flip-numbers` 3D flip (L1) + Levenshtein diff smart-ticker (L2-L4) |
| **暗色大屏主题** | 全部竞品白底浅色 | 深色背景 + 霓虹渐变 + 粒子动效 + 玻璃拟态 |
| **海报生成** | 无任何竞品提供 | Canvas 手动绘制 + 3 种模板 + Web Share API |
| 数据源策略 | Worldometer 依赖闭源商业 API | 15+ 免费权威机构年度基准数据 + **分国别数据（二期）** |
| 用户体验 | 广告多、移动端差 | 纯净、响应式、PWA |
| **增长引擎** | 无 | **Embed iframe 开放 + Web Share API + 海报二维码引流** |

---

## 二、 目标受众 (Target Audience)

| 1. **宏观极客与数据爱好者**：热衷于观察全球人口、科技、能源动态的用户。 |
| 2. **内容创作者与自媒体人**：需要直观、震撼的全球数据支撑，或寻找趣味科普素材的创作者。 |
| 3. **泛大众群体**：被视觉大屏和"个人出生账单"等趣味互动吸引，愿意在社交媒体（如小红书、X、朋友圈等）进行裂变分享的年轻网民。 |
| 4. **教育工作者与学生**：将 UniversePulse 作为课堂演示工具，直观展示人口增长、资源消耗的速度。 |
| 5. **开发者/站长**：通过 Embed iframe 将实时计数器嵌入自己的网站/博客，获得反向链接和 SEO 权重。 |

---

## 三、 功能模块设计 (Functional Architecture)

### 3.1 核心大屏板块 (Live Dashboard)
页面采用多列卡片网格布局（支持响应式：PC 端多栏平铺，移动端单栏流式），所有核心数据均实现"秒级/毫秒级"平滑跳动。

|* **板块 A：全球人口与时间刻度 (Population & Time)**|
|  * **全球总人口**：实时跳动的核心数字（精确到个位）。|
|  * **今日人口动态**：今日已出生人口、今日已死亡人口、今日人口净增长（出生减去死亡）。|
|  * **今年累计动态**：今年已出生总人数、今年已死亡总人数、今年人口净增长。|
|  * **里程碑倒计时**：距离全球人口达到下一个整数关卡（如 82 亿、83 亿）的实时动态倒计时。|
|  * **国家维度**（二期）：支持切换查看主要国家（中国、印度、美国等）的人口实时数据，基于 UN DESA WPP 2024 分国数据。|

* **板块 B：生存、资源与环境 (Resources & Environment)**
  * **能源消耗**：今日消耗的石油（桶）、煤炭（吨）、天然气（立方米）。
  * **生态危机**：今日砍伐/消失的森林面积（公顷）、今日全球累计碳排放量（吨）。
  * **水资源**：今日消耗的淡水量（立方米）。

* **板块 C：数字社会与流动 (Digital & Society)**
  * **数字足迹**：今日发送的电子邮件总数、全网网页搜索查询量。
  * **现代生活**：全球航班今日起飞架次、加密货币/数字资产交易笔数估算。

#### 视觉层次规范

| 层级 | 内容 | 字体大小建议 | 动画效果 |
|------|------|-------------|---------|
| L1（最大） | 全球总人口 | 72-96px | `react-flip-numbers` 3D 翻转 |
| L2 | 今日出生/死亡/净增 | 36-48px | 直接文本渲染 + `tabular-nums` |
| L3 | 资源/环境数据分组 | 24-32px | 直接文本渲染 + `tabular-nums` |
| L4 | 数字社会数据 | 分组标题 18px，数值 24px | 直接文本渲染 + `tabular-nums` |

|* **核心互动工具："回到你出生那一天" (Life Milestone Calculator)**|
|* **交互流程**：用户在首页输入框选择/输入自己的出生年月日。|
|* **实时计算输出**：|
|  * "自你降生到这个世界以来，全球人口净增了 X 人……"|
|  * "地球为你多消耗了 Y 吨石油、Z 公顷森林……"|
|  * 你在世界人口大潮中的相对坐标。|
|* **裂变传播**：支持一键生成一张精美的"个人社会账单海报"（Card Image），方便用户保存并分享至社交平台。|
|* **增强 - 国家维度**（二期）：用户可选择出生国家，输出该国对应数据（如"自你出生以来，中国人口增长了 X 亿"）。|
|* **增强 - 个人碳足迹计算器**（二期）：用户输入交通方式、饮食类型、用电习惯，输出年度碳排放量及对比参照物。|

#### 增强设计

| 功能 | 说明 |
|------|------|
| **多档海报模板** | 至少提供 3 种风格：科技暗黑 / 极简白 / 霓虹渐变，适配不同社交平台 |
| **动态二维码** | 海报底部附带指向 universepulse.net 的短链 QR Code，方便线下传播 |
| **社交一键分享** | 不只是下载图片，还要支持 Web Share API 直接分享到微信/X/Instagram |
| **情感共鸣文案** | "你的出生让地球多消耗了 X 个足球场面积的森林" |
| **季节性文案切换** | 根据节日/热点自动更换标题文案 |
| **对比模式**（二期） | 左右对比两个指标（如"人口增长 vs 石油消耗"）或两个国家（如"中国 vs 美国的人均资源消耗"） |
| **个人碳足迹海报**（二期） | 基于用户输入的饮食习惯、交通方式生成"我的年度碳排放"海报，支持分享 |

### 3.3 辅助与控制功能 (Controls & Settings)
* **时间机器/倍速模式**：支持暂停、或开启倍速播放（如 10x、100x），模拟过去或未来特定年份的人口增长速率。
* **沉浸音效开关（可选）**：提供一个极微弱的"数字滴答声"音效开关，增强金融大屏的沉浸感。**默认关闭**，避免新用户首次访问时被突然的声音惊吓。

#### 增强设计

| 功能 | 说明 |
|------|------|
| **可视化时间轴** | 用滑动条展示 1960→2050 的时间范围，支持拖动到任意年份 |
| **历史对照** | 到达某个年份时，显示该年的标志性事件（如"1987 年 7 月 11 日——世界人口达到 50 亿"） |
| **未来预测模式** | 基于 UN 中等变量情景，预测 2050/2100 年的人口和资源消耗 |

### 3.4 会话期间个人化数据 (Session-Based Personalization)
* **会话计时器**：显示"自您打开此页面以来"的精确计时（HH:MM:SS 格式），让用户感知自己在这个页面上停留的时间长度。
* **对比类比系统**：将抽象的大数字转化为具象的生活参照物：
  | 指标 | 参照物 | 说明 |
  |---|---|---|
  | 出生量 | 体育场容量（~80,000 人） | "相当于填满 {n} 个满座体育场" |
  | 石油消耗 | 奥运游泳池（~2,500 m³） | "相当于 {n} 个奥运游泳池的水量" |
  | 碳排放 | 汽车年均排放（~4.6 吨 CO₂） | "相当于 {n} 辆汽车一年的排放量" |
  | 淡水消耗 | 奥运游泳池（~2,500 m³） | "足够填满 {n} 个奥运游泳池" |
  | 邮件发送 | 地球每人每 0.2 秒一封 | "地球每人每 0.2 秒一封邮件" |
  | 搜索查询 | 地球每人每秒约 1.2 次 | "地球每人每秒约 1.2 次搜索" |
  | 航班架次 | 每 0.8 秒一架起飞 | "每 0.8 秒就有一架飞机起飞" |
  | 森林消失 | 足球场大小（~0.7 公顷） | "每 7.5 秒消失一个足球场大小的森林" |
* **价值**：让抽象的全球数据产生个人化的情感共鸣，提升用户停留时长和社交分享意愿。

---

## 四、 技术栈与架构设计 (Tech Stack & Architecture)

### 4.1 前端框架
* **Next.js 15 (App Router)** —— 完美支持服务端渲染（SSR）与极致的 SEO 表现，利于自然流量获取。使用 `react-strict-mode: true`，部署产物通过 Vercel 全球 CDN 分发。

### 4.2 样式与 UI
* **Tailwind CSS v4** + 自定义 glassmorphism 工具类（`glass-card`, `glow-*`），暗黑主题配色体系（`bg-background`, `text-primary`, `text-secondary`, `text-muted`）。
* **字体**：`@fontsource-variable/inter`（英文）+ `@fontsource-variable/noto-sans-sc`（中文），支持 variable font 特性，确保多语言排版质量。
* **动效引擎**：`Framer Motion`（页面过渡、入场动画）+ `react-flip-numbers`（L1 人口大数字 3D 翻转效果）+ 自定义 `requestAnimationFrame` 循环（L2-L4 数字平滑更新，含 change-detection 优化避免不必要的 React state 更新）。

### 4.3 核心算法驱动
* **零后端数据库依赖**。不依赖高频后端 API 轮询，基于以下权威数据源折算每秒平均增长率：

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

* **时间戳差值算法**：每次页面渲染时，根据当前绝对时间戳（`Date.now()`）与基准时间戳的差值，通过数学公式直接计算并渲染当前应有的数值。这样即使页面挂机数天、或者用户切换后台再回来，数据依然完全精准且永不漂移。
* **三层数据模型架构**：
  1. `lib/constants.ts` — 所有原始常量（基准时间戳 `BASE_TIMESTAMP = 2026-07-01T00:00:00Z`、各指标年/日总量、每秒速率、里程碑目标 `NEXT_MILESTONE = 8,400,000,000`、对比参照物定义 `COMPARISONS`）
  2. `lib/math.ts` — 计算引擎，提供 `calculateMetric()`（累计总量）、`calculateTodayMetric()`（今日累计）、`calculateYearMetric()`（今年累计）、`getNextMilestoneProgress()`（里程碑进度）、`formatNumber()`（本地化数字格式化）、`calculateSessionMetric()`（会话期间累计）
  3. `components/Dashboard.tsx` — rAF 循环编排器，维护单一 `TickerState` 对象，变更检测后批量更新 React state，避免过度重渲染
* **18 个核心指标**（`MetricKey` 类型）：`totalPopulation`、`todayBirths`、`todayDeaths`、`todayNetGrowth`、`yearBirths`、`yearDeaths`、`yearNetGrowth`、`oilBarrels`、`coalTonnes`、`carbonTonnes`、`naturalGasCubicMeters`、`deforestationHectares`、`waterCubicMeters`、`emailsSent`、`searchQueries`、`flightsTaken`、`cryptoTransactions`。

### 4.4 国际化（i18n）
* **next-intl** 库，支持 **6 种语言**：en / zh / ja / es / ar / fr
* 服务器端组件通过 `Accept-Language` 请求头自动检测用户首选语言，无匹配时回退到英语
* 翻译文件按语言拆分为 `messages/{locale}.json`，采用嵌套结构（`header.*`, `dashboard.population.*`, `dashboard.session.*` 等）
* 阿拉伯语（ar）支持 RTL 布局
* 数字和日期通过 `Intl.NumberFormat` / `Intl.DateTimeFormat` 自动本地化
* 支持 cookie-based 语言切换（无需路由前缀，扁平路由结构）

|* **SEO & GEO 配置**|
|* **Metadata**：Next.js `metadata` API 导出 `title`（默认 + template 模式 `%s | UniversePulse`）、`description`、`alternates.languages`（hreflang 六语映射 `'en': '/', 'zh': '/zh', 'ja': '/ja', 'es': '/es', 'ar': '/ar', 'fr': '/fr'`，其中英语为根路径默认语言，其余 5 种语言使用路由前缀；Cookie 语言切换与路由前缀并存，确保 SEO hreflang 正确指向各语言版本）、`openGraph`（URL、siteName、OG 图片 1200×630、多语言 locale 交替 `en_US/zh_CN/ja_JP/es_ES/ar_SA/fr_FR`）、`twitter`（summary_large_image 卡片）|
|* **结构化数据**：JSON-LD 格式 `Dataset` schema + `WebApplication` schema + `FAQPage` schema（覆盖用户常见问题如"全球人口每秒增加多少""世界人口何时达到90亿"）|
|* **robots.txt**：`index: true, follow: true`，允许搜索引擎抓取全部页面|
|* **Canonical URL**：`https://universepulse.net`，多语言版本通过 hreflang 关联|
|* **动态 OG 图片**：社交分享时展示实时数据预览，Vercel Edge Function + Satori / Resvg 方案|
|* **Embed iframe 开放**（二期）：提供轻量级 iframe 嵌入代码，允许第三方网站/博客嵌入实时计数器。参考 PopulationCounter 的 embed 模式，生成反向链接提升 SEO 权重。|

```html
<!-- Embed 示例 -->
<iframe 
  src="https://universepulse.net/embed/population?theme=dark&size=medium" 
  width="400" 
  height="200" 
  frameborder="0"
  loading="lazy">
</iframe>
```

| Embed 参数 | 说明 |
|-----------|------|
| `theme` | `dark` / `white` / `neon` — 主题风格 |
| `size` | `small` (200px) / `medium` (400px) / `large` (600px) |
| `metrics` | `population` / `all` / `energy` — 显示哪些指标 |
| `lang` | `en` / `zh` / `ja` / `es` / `ar` / `fr` — 语言 |

### 4.6 新增基础设施

| 服务 | 用途 | 选型建议 |
|------|------|---------|
| **动态 OG 图片** | 社交分享时展示实时数据预览 | Vercel Edge Function + Satori / Resvg |
| **结构化数据** | SEO 优化 | JSON-LD Schema.org (Dataset, WebApplication, FAQPage) |
| **访问统计** | 用户行为验证 | Plausible / Umami（隐私友好，Vercel 一键部署） |
| **PWA** | 添加到主屏幕，离线查看 | next-pwa 插件 |
| **Embed 服务**（二期） | 第三方 iframe 嵌入计数器 | Next.js Route Handler + Canvas 渲染 |

### 4.7 核心算法边界情况处理

| 边界情况 | 风险 | 处理方案 |
|----------|------|---------|
| **基准数据过期** | UN 年度数据更新后产生系统性偏差 | 增加"数据版本"标注和自动过期提醒机制 |
| **时钟回拨/NTP 同步** | 用户设备时间不准确导致数值异常 | 用 `performance.now()` 做相对计时，基准时间用服务器时间校准 |
| **页面长期挂机** | `requestAnimationFrame` 暂停导致数值不同步 | 监听 `visibilitychange` 事件，页面恢复时瞬间跳到正确值而非逐帧追赶 |
| **时区差异** | "今日出生/死亡"按 UTC 还是本地时间？ | 明确定义按 UTC 日对齐，并在 UI 标注 |
| **低性能设备** | 高帧率动画导致卡顿 | 使用 `useReducedMotion` 检测用户偏好，低性能设备自动降级为每秒 1 次更新 |

### 4.8 性能目标

| 指标 | 目标值 |
|------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Lighthouse Accessibility | > 90 |
| 首屏加载 (LCP) | < 1s |
| 同时跳动计数器 | 15-20 个独立 React state + memoized component，避免全局重渲染 |

### 4.9 部署托管
* **Vercel** —— 全球 CDN 加速，零运维成本，自带 HTTPS 与极速访问。

---

## 五、 数据模型与来源规范 (Data Model & Sources)

### 5.1 数据可信度分级策略

**核心原则：不追求所有数据都"精确"，而是分层处理——权威数据做锚点，估算数据做量级。**

| 层级 | 定位 | 可信度要求 | 展示方式 |
|------|------|-----------|---------|
| **Tier 1 — 权威基准** | 人口 + 核心能源 | ★★★★★ 可直接引用年度总量 | 标注来源 URL + 误差范围 |
| **Tier 2 — 行业估算** | 碳排放、森林、水资源 | ★★★☆☆ 可支撑量级展示 | 标注"基于年度均值折算，仅供科普" |
| **Tier 3 — 参考估算** | 邮件、搜索、航班、加密货币 | ★★☆☆☆ 仅展示数量级 | 标注"估算值，数据来源见页脚" |

### 5.2 Tier 1 — 权威基准数据（可直接引用）

#### 全球人口

| 字段 | 数值 | 来源 | 获取路径 | 链接 |
|------|------|------|---------|------|
| 基准人口总数 | **8,350,000,000** (2026 年中推算值) | UN DESA, World Population Prospects 2024 + 线性推算（UN WPP 2024 官方 2024 年中数据约 81 亿，83.5 亿为基于年均增长率推算） | "Total Population, Mid-year" 表格 + 增长率推算 | [population.un.org/wpp](https://population.un.org/wpp/) |
| 年出生人数 | ~**134,000,000** | UN DESA WPP 2024 | "Births" 列 | 同上 |
| 年死亡人数 | ~**62,000,000** | UN DESA WPP 2024 | "Deaths" 列 | 同上 |
| 每秒出生率 | **~4.25 人/秒** | 134M ÷ 31,557,600 | 年度总量 ÷ 365.25天秒数 | — |
| 每秒死亡率 | **~1.97 人/秒** | 62M ÷ 31,557,600 | 同上 | — |
| 每秒净增率 | **~2.28 人/秒** | 72M ÷ 31,557,600 | 同上 | — |

#### 石油消耗

| 字段 | 数值 | 来源 |
|------|------|------|
| 年全球石油消耗量 | ~**383 亿桶/年** (约 1.05 亿桶/天) | IEA Oil Market Report 2024 / EIA |
| 每秒消耗率 | **~1,215 桶/秒** | 105M ÷ 86,400 |

#### 煤炭消耗

| 字段 | 数值 | 来源 |
|------|------|------|
| 年全球煤炭消耗量 | ~**161 亿吨** (16.1 Gt) | BP Statistical Review 2024 |
| 每秒消耗率 | **~0.51 吨/秒** | 16.1Gt ÷ 31,557,600 |

|## 5.3 Tier 2 — 行业估算数据|

| 数据类别 | 年总量 | 每秒速率 | 来源 |
|---|---|---|---|
| 碳排放 (CO₂) | ~374 亿吨 | ~1,187 吨/秒 | Global Carbon Budget 2023 |
| 天然气消耗 | ~4.2 万亿 m³ | ~133,000 m³/秒 | IEA Gas Market Report 2024 |
| 森林砍伐 | ~410 万公顷 | ~0.13 公顷/秒 | FAO FRA 2020 |
| 淡水抽取 | ~4.6 万亿 m³ | ~146,000 m³/秒 | UN Water / FAO AQUASTAT |

> ⚠️ 注意："消耗"与"抽取"不同。抽取量中约 70% 用于农业灌溉，约 30% 真正被消耗（蒸发/产品化）。建议 UI 标注"抽取量"而非"消耗量"以避免误导。

## 5.4 分国别数据（二期）

基于 UN DESA WPP 2024 Country Tables，支持以下国家实时人口计算：

| 国家 | 基准人口 (2026) | 年出生率 | 数据来源 |
|------|----------------|---------|---------|
| 中国 | ~1,419,000,000 | ~5.8M/年 | UN DESA WPP 2024 |
| 印度 | ~1,450,000,000 | ~18.3M/年 | UN DESA WPP 2024 |
| 美国 | ~345,000,000 | ~1.97M/年 | UN DESA WPP 2024 |
| 印度尼西亚 | ~283,000,000 | ~4.3M/年 | UN DESA WPP 2024 |
| 巴基斯坦 | ~251,000,000 | ~5.8M/年 | UN DESA WPP 2024 |
| 尼日利亚 | ~238,000,000 | ~9.5M/年 | UN DESA WPP 2024 |

|## 5.5 Tier 3 — 参考估算数据|

| 数据类别 | 日总量 | 每秒速率 | 来源 |
|---|---|---|---|
| 邮件发送 | ~3.6 万亿封 | ~41,667 封/秒 | Statista / Radicati Project |
| 搜索查询 | ~8.5 亿次 | ~9,838 次/秒 | Statista / Backlinko |
| 航班架次 | ~107,000 架 | ~1.24 架/秒 | ICAO Aviation Basics / IATA |
| 加密货币交易 | ~500 万笔 | ~58 笔/秒 | Chainalysis 2024 Report |

> ⚠️ 注：
> - 邮件：Radicati 原始报告为付费订阅，Statista 数据为二次整理。
> - 搜索：Google 占比 ~90%，其余为 Bing/Baidu/Yandex 等。
> - 航班：周末 vs 工作日差异可达 15-20%。
> - 加密货币：仅统计公链上链交易，不含中心化交易所内部撮合。

## 5.6 虚假精度声明（UI 必显）

⚠️ **以下声明必须在 UI 显著位置展示（建议放在页脚或数据卡片底部）：**

> 📊 **数据来源说明**：UniversePulse 的实时数据基于联合国人口司（UN DESA）、国际能源署（IEA）、BP 统计评审等权威机构的年度总量数据，折算为每秒平均增长率。由于年度数据本身存在统计误差（如全球人口估计误差 ±500 万），且折算为"每秒"是一种数学近似，**所有数值均为估算值，仅供科普展示，不构成精确统计**。完整数据来源请参见本页脚。

每个数据卡片底部应附带简短来源标注：

```
数据来源: UN DESA 2024 ↗
```

点击后跳转到完整数据来源页面。

## 5.7 数据更新机制

| 场景 | 处理方式 |
|------|---------|
| **年度基准数据发布** | 手动更新 `constants.ts`，发布新版本 |
| **基准数据过期提醒** | 前端检测 `lastUpdated` 距当前是否超过 12 个月，若是则在页脚显示"⚠️ 数据版本可能已过时" |
| **季节性修正因子** | 用户进入"时间机器"模式时自动根据月份/星期应用修正因子 |
| **数据验证脚本** | 开发阶段运行 Node.js CLI 脚本，对比各来源数据的一致性 |

## 5.8 关键公式汇总（开发参考）

```javascript
// 通用公式：从年度总量推导每秒速率
const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60; // 31,557,600
const SECONDS_PER_DAY = 24 * 60 * 60;            // 86,400

// 人口
const birthsPerSecond = annualBirths / SECONDS_PER_YEAR;
const deathsPerSecond = annualDeaths / SECONDS_PER_YEAR;

// 资源类（通常有"每日"数据，更准确）
const oilPerSecond = barrelsPerDay / SECONDS_PER_DAY;

// 时间机器模式：应用季节修正
function applySeasonalFactor(metric, year, month, dayOfWeek) {
  const factors = seasonalFactors[metric];
  if (!factors) return 1.0;
  
  if (factors.monthly) return factors.monthly[month - 1] || 1.0;
  if (dayOfWeek !== undefined && factors.weekday) {
    return (dayOfWeek <= 5) ? factors.weekday : factors.weekend;
  }
  return 1.0;
}

// 最终计算
function getCurrentValue(base, rate, timestamp) {
  const elapsed = (timestamp - baseTimestamp) / 1000;
  const seasonal = applySeasonalFactor(metric, new Date(timestamp));
  return base + Math.floor(rate * elapsed * seasonal);
}
```

---

|## 六、 开发与实施路线图 (Development Roadmap)|

### 阶段一：原型确认与算法基建（3-5天）
* [ ] 确定网页整体视觉规范（色彩、暗黑模式基调、数字卡片网格样式）。
* [ ] 搜集并核对联合国人口司等机构的公开年度基准数据，敲定人口、资源每秒增长的数学模型与换算公式。
* [ ] 编写前端核心数据驱动 Hook（处理时间戳差值与实时跳动逻辑）。
* [ ] **新增**：收集分国别人口数据（UN DESA WPP 2024 Country Tables），建立国家维度数据模型。

| 验收标准 | 说明 |
|---------|------|
| 视觉规范文档 | Figma/草图确认，包含色板、字体、卡片样式 |
| 数据源清单 | 11+ 数据源 URL 可访问，速率计算经二次验证 |
| 核心 Hook 测试 | `calculateMetric()` 返回值与手动计算误差 < 0.01% |
| **分国数据模型** | 至少支持 6 个主要国家的实时人口计算 |

### 阶段二：前端核心大屏开发（4-5天）
* [ ] 搭建 Next.js 项目骨架，配置 Tailwind CSS v4。
* [ ] 开发顶部核心人口实时跳动大组件（集成 react-flip-numbers 3D 翻转动效）。
* [ ] 开发环境资源、数字社会等分类数据卡片组件，完成 PC 端与移动端的响应式适配。
* [ ] 实现 glassmorphism 风格（glass-card、glow-* 工具类、animated background orbs）。

| 验收标准 | 说明 |
|---------|------|
| 全指标展示 | 18 个核心指标全部渲染，L1-L4 层级视觉符合规范 |
| 响应式通过 | Chrome DevTools 模拟 iPhone SE → iPad Pro → 1920px 均正常 |
| 动画帧率 | 60fps rAF 循环，CPU 占用 < 3%（Chrome Task Manager） |

### 阶段三：特色互动与海报生成（3-4天）
* [ ] 开发"回到你出生那一天"的表单交互与多维数据计算逻辑。
* [ ] 集成海报生成功能（优先 Canvas 手动绘制方案，html-to-image 为备选），支持用户一键导出分享图片。
* [ ] 编写页脚、关于我们（数据来源说明）及倍速切换控制栏。
* [ ] 实现"会话期间个人化数据"板块（会话计时器 + 对比类比卡片）。
* [ ] 添加数据过期提醒机制（检测 lastUpdated 距当前 > 12 个月显示警告）。

| 验收标准 | 说明 |
|---------|------|
| 出生账单计算器 | 输入任意日期 → 输出 5+ 维度的个人数据面板 |
| 海报生成 | Canvas 绘制 3 种模板，输出 1200×1500 PNG，含 QR Code |
| 数据过期提醒 | 手动修改 constants.ts 中 lastUpdated 为 13 个月前 → 页脚显示警告 |

### 阶段四：SEO、测试与全球上线（3-4天）
* [ ] 完善网站 Metadata、OpenGraph 社交分享卡片标签（域名绑定 `universepulse.net`）。
* [ ] 配置多语言 i18n（6 语种 en/zh/ja/es/ar/fr）与 hreflang 映射。
* [ ] 生成动态 OG 图片（Vercel Edge Function + Satori）。
* [ ] 添加 JSON-LD 结构化数据（Dataset + WebApplication + FAQPage schema）。
* [ ] 进行多终端性能压测，确保高帧率动画下的内存占用与 CPU 消耗平稳。
* [ ] 部署至 Vercel，绑定独立域名，正式发布上线。

| 验收标准 | 说明 |
|---------|------|
| Lighthouse 分数 | Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90 |
| 首屏加载 (LCP) | < 1s（3G 网络模拟下 < 2s） |
| 多语言验证 | 6 语种页面均可正常访问，RTL 布局（阿拉伯语）无错位 |
| 社交分享预览 | Twitter/X、微信、Facebook OG 图片实时展示 18 项核心数据 |

---

|## 七、 增长与扩展功能（可选，二期）|

这些功能不在一期范围内，但可作为后续迭代方向：

### 7.1 Embed iframe 开放层（高优先级）
参考 PopulationCounter 的 embed 模式，提供轻量级 iframe 嵌入代码，允许第三方网站/博客嵌入实时计数器。生成反向链接提升 SEO 权重。

```html
<!-- Embed 示例 -->
<iframe 
  src="https://universepulse.net/embed/population?theme=dark&size=medium" 
  width="400" height="200" frameborder="0" loading="lazy">
</iframe>
```

Embed 参数：`theme` (dark/white/neon) | `size` (small/medium/large) | `metrics` (population/all/energy) | `lang` (6语)

### 7.2 API 开放层
用 Vercel Edge Function 暴露一个只读 API，允许第三方引用实时数据（增加外链和 SEO 权重）。

```json
// GET /api/v1/metrics
{
  "totalPopulation": 8350123456,
  "todayBirths": 389012,
  "todayDeaths": 187234,
  "oilBarrelsToday": 105000000,
  "timestamp": "2026-07-26T12:00:00Z"
}
```

### 7.3 Newsletter / Email 订阅
每周发送"全球数据周报"（如"本周地球多消耗了 X 桶石油"），用 Resend + Next.js 实现。

### 7.4 国家维度对比工具
用户选择两个国家，对比人口、资源消耗、人均指标。数据来自 UN DESA WPP 2024 Country Tables。

### 7.5 个人碳足迹计算器
用户输入交通方式、饮食类型、用电习惯，输出年度碳排放量及对比参照物。可生成海报分享。

### 7.6 多语言翻译补全
一期已完成 en/zh 双语，其余 4 语种（ja/es/ar/fr）需补充完整翻译文件，避免回退到英文。

### 7.7 PWA 支持
PWA 功能已在阶段四实施，详见 4.6 新增基础设施。此处保留条目仅作引用。

### 7.8 无障碍 (a11y)
ARIA 标签 + 键盘导航 + 屏幕阅读器支持，对数据展示类网站很重要。

### 7.9 交互式世界地图
MapTiler/Mapbox GL + 矢量瓦片底图。设计要点：
* **热力图维度**：优先展示人口密度（基于 UN 分国数据），资源消耗暂无可靠分国年度数据暂不实现
* **交互细节**：点击国家弹出详情卡片（该国总人口、人口增速、人均资源消耗估算）
* **实时叠加**：由于分国实时数据不可得，采用「年度基准 + 时间戳差值」方式，根据用户当前时间动态计算各国年度进度
* **数据来源**：UN DESA WPP 2024 分国别人口数据

---

|## 八、 风险评估与缓解|

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|---------|
| 数据源不可靠或过时 | 降低可信度 | 中 | 标注数据来源和时间，定期人工复核 |
| 虚假精度引发质疑 | 信任危机 | 中 | UI 显著位置添加误差声明 |
| Vercel 免费额度限制 | 无法承载流量 | 低 | 预留升级方案；纯前端架构本身极省资源 |
| 海报生成内存溢出 | 用户体验差 | 中 | Canvas 手动绘制优先，html-to-image 为备选 |
| 移动端性能不足 | 动画卡顿 | 中 | useReducedMotion 降级策略 |
| 季节性数据偏差 | 特定月份不准确 | 低 | 时间机器模式支持月份修正因子 |
| 浏览器后台节流 | rAF 频率降低 | 低 | 时间戳差值算法天然抗节流，数据不会漂移 |
| 大数字精度问题 | JavaScript Number.MAX_SAFE_INTEGER | 极低 | 当前最大值 8.35B 远低于安全整数 9×10¹⁵，无风险 |
| 多语言翻译不完整 | 部分语言缺少文案 | 中 | MVP 优先 en/zh，其余语言 English fallback |
| SEO 爬取 | 纯客户端动态内容被忽略 | 低 | Next.js SSR 确保首屏可索引；后续添加 JSON-LD |
| **Embed 滥用**（新增） | iframe 被恶意嵌入导致带宽浪费 | 低 | Rate limiting + Referer 白名单 + Cloudflare 缓存 |
| **SEO 反向链接质量**（新增） | 第三方嵌入低质量网站影响品牌 | 低 | Embed 页面不传递 PageRank（`rel="nofollow"`），保持品牌独立性 |

---

|## 九、 综合评估|

| 维度 | 评分 (1-10) | 说明 |
|------|-------------|------|
| 产品定位 | **9** | 差异化清晰，市场空白明显（实时数据 × 极致美学 × 社交裂变） |
| 技术选型 | **9** | Next.js 15 + 纯前端模型 + glassmorphism UI，选型成熟可靠 |
| 数据模型 | **9** | Tier 分级策略 + 权威数据源 + 具体数值锚点 + 季节修正 |
| 可实施性 | **9** | 时间线合理，明确了难点和优先级；核心算法边界情况已识别并制定处理方案 |
| 增长潜力 | **9** | Embed iframe 开放层 + Web Share API + 海报二维码引流，形成完整增长飞轮 |
| 扩展空间 | **9** | 二期路线图清晰：国家维度、碳足迹计算器、交互式地图、API 开放 |
| **综合** | **9.0/10** | **值得做，按此版本启动。** 基于竞品分析确认市场空白真实存在，且 UniversePulse 在视觉、互动、增长三个维度均具备差异化优势。 |

---

## 十、 附录：竞品参考链接

| 项目 | GitHub | 说明 |
|------|--------|------|
| Worldometer | [matheusfelipeog/worldometer](https://github.com/matheusfelipeog/worldometer) | Python API 封装包 |
| Worldometer API | [nolancacheux/worldometer-real-time-api](https://github.com/nolancacheux/worldometer-real-time-api) | NestJS REST API，每5秒抓取 |
| World Population API | [VinceDerPrince/World-Population-API](https://github.com/VinceDerPrince/World-Population-API) | FastAPI + BeautifulSoup |
| LiveAtlas | [JLyne/LiveAtlas](https://github.com/JLyne/LiveAtlas) | Minecraft 地图前端，Vue+TS，377⭐ |
| Our World in Data Grapher | [owid/owid-grapher](https://github.com/owid/owid-grapher) | 交互式图表库，1,546⭐（不可复用） |
| OWID Python SDK | [owid/owid-grapher-py](https://github.com/owid/owid-grapher-py) | Jupyter 中渲染 OWID 图表 |
| World Population | [michaelmcandrew/world-population](https://github.com/michaelmcandrew/world-population) | TypeScript NPM 估算库 |
