# 前端非搜索功能改动记录（2026-03-08）

本文档记录 2026-03-08 这轮**不含搜索功能**的前端改动，方便协作者快速了解已经完成的交互、样式和 Mock 能力。

## 1. 记录范围

本次记录包含以下内容：

- 详情页与列表页样式优化
- 收藏功能占位与禁用处理
- “我的评价”与仪表盘列表改造
- 举报弹窗与举报提交流程优化
- 评分后的“💩”全屏动画
- 学科选择菜单的统一组件化与样式优化
- 移动端同步调整

本次记录**不包含搜索功能**，搜索功能已单独整理在 `doc/SEARCH_FEATURE.md`。

## 2. 样式优化与页面调整

### 2.1 论文详情页样式优化

对论文详情页做了多轮视觉和布局收紧，重点如下：

- 调整评分区与操作区的高度和对齐关系，避免左右卡片高低不一致
- 调整评分数字、评分数量、分隔线和按钮密度，使信息更紧凑
- 调整管理员学科修正区域的选择框、按钮尺寸和排版
- 将返回按钮改成 `Back / 返回` 的双语形式，并补上 hover 指针
- 统一收藏、举报、修正等按钮的可点击反馈和悬浮效果

主要文件：

- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/pages/preprints/RatingWidget.tsx`
- `src/pages/preprints/LatrineRatingWidget.tsx`
- `src/index.css`

### 2.2 仪表盘样式优化

对用户仪表盘进行了视觉整理：

- 新增 `My Excretions / Favorites / Rated` 三个 tab
- 保留直角风格，不使用圆角卡片
- 去除多余横线和过重装饰
- 为 tab 和列表卡片补充正确的鼠标指针样式

主要文件：

- `src/pages/dashboard/AuthorDashboard.tsx`

### 2.3 列表页与分区导航样式优化

对预印本列表页进行了多轮样式修正：

- 分区 tab 保持单行横向展示，并在不同分辨率下均匀分布
- 移动端隐藏 tab 中的英文与 `/`，只保留图标和中文
- 排序按钮在移动端改为两列布局
- 学科筛选改成统一的自定义选择组件，替换掉不可控的原生下拉体验

主要文件：

- `src/pages/preprints/PreprintListPage.tsx`
- `src/pages/preprints/PreprintCard.tsx`
- `src/pages/editor/ScreeningDashboard.tsx`

## 3. 收藏功能

### 3.1 Mock 收藏能力

为收藏功能补齐了基础 Mock 数据和接口，包括：

- 普通用户账号
- 用户收藏关系
- 收藏列表接口
- 详情页收藏按钮的状态联动

主要文件：

- `src/mocks/data.ts`
- `src/mocks/handlers.ts`
- `src/lib/api.ts`

### 3.2 收藏功能暂时禁用

由于收藏接口尚未成熟，当前将收藏能力切换为前端禁用态：

- 详情页 `Save / 收藏` 按钮统一置灰
- 未登录和已登录状态都不允许点击
- 仪表盘 `Favorites / 我的收藏` tab 置灰并不可切换
- 文案明确提示当前暂不可用

控制常量：

- `src/lib/constants.ts` 中的 `FAVORITES_ENABLED`

主要文件：

- `src/lib/constants.ts`
- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/pages/dashboard/AuthorDashboard.tsx`

## 4. “我的评价”与仪表盘列表

为普通用户仪表盘补充了“我的评价”能力，用于快速查看自己打过分的文章：

- 增加 `Rated / 我的评价` tab
- 仪表盘可以切换查看自己的投稿和自己的评价记录
- 评价过的文章在列表中可直接进入详情

配套工作：

- Mock 数据增加了用户评分记录
- API 层增加了“我的评价”列表能力

主要文件：

- `src/pages/dashboard/AuthorDashboard.tsx`
- `src/mocks/data.ts`
- `src/mocks/handlers.ts`
- `src/lib/api.ts`

## 5. 举报流程优化

举报相关交互已从浏览器原生弹窗改为页面内统一弹窗，主要改动如下：

- 举报文章与举报评论共用一套弹窗
- 举报理由改为必填，长度不足时阻止提交
- 提交成功后的反馈改为系统提示层，而不是贴在按钮下方
- 文章举报弹窗增加风险提醒文案
- 英文说明、警示语、按钮文本做了双语和层级优化

当前举报弹窗能力包括：

- 标题与说明双语展示
- 红色警示区域与普通说明区分开
- 统一关闭、取消、提交逻辑

主要文件：

- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/lib/api.ts`
- `src/mocks/handlers.ts`

## 6. 评分动画（💩 全屏效果）

### 6.1 动画目标

评分时不再只更新分数，而是触发全屏级的 `💩` 动画：

- 从点击的评分按钮位置发射
- 飞向全文稿件区域的标题附近
- 选择几分就发射几次

### 6.2 动画实现

当前动画特性：

- 使用 `createPortal` 挂到 `document.body`，不受评分卡片裁切
- 每个 `💩` 都是新生成的 emoji，不复用原评分按钮图标
- 飞行轨迹带随机旋转
- 路径采用两段控制点形成的弧线运动，视觉上更接近贝塞尔曲线
- 当前单次动画时长为 `1200ms`
- 每次发射间隔为 `260ms`

### 6.3 首次评分落点偏差的原因与修复

之前首次评分命中位置不准，第二次才正常，原因是：

- 目标点之前在父组件渲染阶段就被计算好了
- 全文/PDF 区域的实际布局是在后续渲染中完成的
- 首次点击仍使用了旧坐标
- 第二次评分因为详情页刷新，目标点重新计算后才变准

现已修复为：

- 点击评分按钮时实时读取目标区域坐标
- 不再依赖父组件上一次渲染缓存的位置

主要文件：

- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/pages/preprints/RatingWidget.tsx`
- `src/pages/preprints/LatrineRatingWidget.tsx`
- `src/pages/preprints/RatingImpactBurst.tsx`
- `src/index.css`

## 7. 学科选择菜单组件化与样式优化

### 7.1 统一组件

将列表页和详情页中使用的学科下拉菜单封装为统一组件：

- 统一触发框
- 统一展开面板
- 统一选中态
- 统一滚动区域
- 统一 emoji 图标

组件文件：

- `src/components/forms/CustomSelect.tsx`

### 7.2 全局样式

将选择器相关样式沉淀到全局样式中，便于后续复用：

- 大、中、小三种尺寸
- trigger、panel、scroll、option 等通用类
- hover、选中态、禁用态统一处理

主要文件：

- `src/index.css`

### 7.3 应用位置

- 列表页学科筛选使用大号样式
- 详情页管理员学科修正使用小号样式
- 选择面板支持学科 emoji 展示

主要文件：

- `src/pages/preprints/PreprintListPage.tsx`
- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/lib/constants.ts`

## 8. 移动端同步改动

本轮改动没有只做桌面端，移动端也同步做了布局处理：

- 列表页分区 tab 在移动端保留单行，隐藏英文文案
- 排序按钮在移动端改为两列
- 详情页操作区在移动端移动到评分区上方
- 收藏、举报在移动端改为一行两个按钮
- 学科选择组件在移动端支持自适应宽度与弹层展示
- 举报弹窗、评分区、仪表盘 tab 在移动端均同步了尺寸和交互调整

主要文件：

- `src/pages/preprints/PreprintListPage.tsx`
- `src/pages/preprints/PreprintDetailPage.tsx`
- `src/pages/dashboard/AuthorDashboard.tsx`
- `src/index.css`

## 9. 相关测试

本轮改动涉及并补充了以下测试：

- `src/pages/dashboard/AuthorDashboard.test.tsx`
- `src/pages/preprints/PreprintDetailPage.test.tsx`
- `cypress/component/PreprintDetailPage.cy.tsx`
- `src/pages/preprints/PreprintListPage.test.tsx`

常用验证命令：

```bash
npm run test:unit:run -- src/pages/preprints/PreprintDetailPage.test.tsx
npm run test:unit:run -- src/pages/dashboard/AuthorDashboard.test.tsx
npm run test:unit:run -- src/pages/preprints/PreprintListPage.test.tsx
npm run test:ct:run -- --spec cypress/component/PreprintDetailPage.cy.tsx
```

## 10. 备注

- 搜索功能已单独记录，不在本文中重复展开
- 收藏相关 Mock 和 UI 已接好，但当前业务开关为禁用态
- 若后续收藏接口稳定，可优先恢复 `FAVORITES_ENABLED`
