@AGENTS.md

# Simple Design System — 実装プロジェクト

FigmaのSimple Design System (Community) を元にしたWebサイト実装。

## 技術スタック

| 項目 | 内容 |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Font | next/font/google — Inter (本文) / Roboto Mono (コード) |
| Image | next/image |

## Figmaリソース

- **ファイル**: [Simple Design System (Community)](https://www.figma.com/design/d4LzV5rZ1VBS3mr6zEdy5j/Simple-Design-System--Community-)
- **デザインライブラリ**: Simple Design System (Figma公式)
- **デザイントークン**: `app/globals.css` に `--sds-*` CSS変数として定義済み

## ページ構成とFigma node-id対応表

| ルート | ページ名 | Figma node-id |
| --- | --- | --- |
| `/` | Home Page | `562-8332` |
| `/about` | About | `562-9044` |
| `/contact` | Contact Us | `562-9227` |
| `/pricing` | Pricing | `562-9558` |
| `/waitlist` | Waitlist | `562-9701` |
| `/landing` | Landing Page | `562-10124` |
| `/blog/[slug]` | Article | `562-10260` |
| `/shop` | Shop | `562-10872` |
| `/shop/[id]` | Product Detail Page | `562-11271` |
| `/portfolio` | Portfolio | `562-11665` |
| `/ai-chat` | AI Chat | `5612-8819` |

Figmaの特定ノードを参照するURLフォーマット:
`https://www.figma.com/design/d4LzV5rZ1VBS3mr6zEdy5j/...?node-id={node-id}`

## ディレクトリ構成

```text
app/
  globals.css          # デザイントークン (--sds-*変数) + Tailwind import
  layout.tsx           # ルートレイアウト (Inter/Roboto Mono font)
  page.tsx             # /
  about/page.tsx
  contact/page.tsx
  pricing/page.tsx
  waitlist/page.tsx
  landing/page.tsx
  blog/[slug]/page.tsx
  shop/page.tsx
  shop/[id]/page.tsx
  portfolio/page.tsx
  ai-chat/page.tsx
components/
  ui/                  # 汎用UIコンポーネント (Button, Card, Badge等)
  layout/              # Header, Footer, Navigation等
  sections/            # ページセクション単位 (Hero, CardGrid等)
```

## コーディング規約

### スタイリング

- **必ず `--sds-*` CSS変数を使う**
- Tailwindのデフォルトカラー (`text-gray-900` 等) は使わない
- Tailwind v4のCSS-first設定を使用 (`@theme` / `@layer`)

#### Tailwind v4 CSS変数の記法

v4では `[var(--x)]` の代わりに `(--x)` の短縮記法を使う。IDEが旧記法を警告するので必ず新記法で書く。

| 旧記法（使わない） | v4正規記法（こちらを使う） |
| --- | --- |
| `bg-[var(--x)]` | `bg-(--x)` |
| `text-[color:var(--x)]` | `text-(--x)` |
| `text-[length:var(--x)]` | `text-(length:--x)` |
| `font-[var(--x)]` | `font-(--x)` |
| `border-[var(--x)]` | `border-(--x)` |
| `p-[var(--x)]` | `p-(--x)` |
| `gap-[var(--x)]` | `gap-(--x)` |
| `rounded-[var(--x)]` | `rounded-(--x)` |

#### Tailwind v4 ピクセル値の記法

`--sds-*` トークンが存在しない固定サイズ（セクションの高さ等）は、任意値 `[Npx]` ではなくTailwindのスケール単位（1単位 = 4px）を使う。IDEが任意値クラスを警告するので必ず変換する。

| 任意値（使わない） | スケール記法（こちらを使う） |
| --- | --- |
| `h-[400px]` | `h-100` |
| `w-[240px]` | `w-60` |
| `h-[48px]` | `h-12` |

変換式: `h-[Npx]` → `h-[N/4]`（例: 400 ÷ 4 = `h-100`）

> **優先順位**: `--sds-size-space-*` 変数 → Tailwindスケール単位 → 任意値 `[Npx]`（最終手段）

#### タイトルの letter-spacing

`tracking-` にはTailwindスケール単位もCSS変数も使えないため、タイトルのみ例外的に任意値 `[Npx]` を使う。

| スタイル | サイズ | letter-spacing 計算式 | Tailwindクラス |
| --- | --- | --- | --- |
| Title Hero | 72px | 72 × 3% = 2.16px | `tracking-[-2.16px]` |
| Title Page | 48px | 48 × 2% = 0.96px | `tracking-[-0.96px]` |

モバイルは Title Page、デスクトップは Title Hero を使うため:

```html
<h1 class="tracking-[-0.96px] lg:tracking-[-2.16px]">...</h1>
```

### レイアウト構造

- `Footer` は `app/layout.tsx` にグローバル配置済み — 各ページで重複して `<Footer />` を追加しない
- `Header` は各ページが個別にインポートして配置する

### コンポーネント

- `'use client'` はインタラクティブ要素のみに限定する
- Server Componentをデフォルトとする
- コンポーネントのprops型は `interface` で定義する (`type` は使わない)

### レスポンシブ

- Desktop基準幅: `1200px` (`--sds-responsive-device-width`)
- Mobile基準幅: `375px`
- モバイルファーストで記述する
- **Tailwindブレークポイント**: モバイル→デスクトップの切り替えは `lg:` (1024px) を使用
  （Tailwindにピッタリの1200pxブレークポイントがないため、最近似の `lg:` を採用）

### 画像

- `<img>` タグは使わず `next/image` を使う
- プレースホルダーカラー: `#e3e3e3` (`--sds-color-background-neutral-tertiary`)

### MSWProvider

- `useState` の初期値は必ず `process.env.NODE_ENV !== "development"` にする
- `false` で初期化すると本番 SSR〜ハイドレーション完了まで children が描画されずページが空白になる

### テスト (Playwright)

- `getByLabel("Name")` はデフォルトで大文字小文字を無視した**部分一致**のため、`"Surname"` ラベルにも一致してしまう
- ラベル指定には必ず `{ exact: true }` を付ける: `getByLabel("Name", { exact: true })`

## デザイントークン早見表

### 主要カラー

```css
--sds-color-background-brand-default: #2c2c2c;   /* ブランド背景 (黒) */
--sds-color-background-default-default: #ffffff;  /* 白背景 */
--sds-color-background-default-secondary: #f5f5f5; /* 薄グレー背景 */
--sds-color-text-default-default: #1e1e1e;        /* 本文テキスト */
--sds-color-text-default-secondary: #757575;      /* サブテキスト */
--sds-color-border-default-default: #d9d9d9;      /* 境界線 */
```

### タイポグラフィスケール

| スタイル名 | サイズ | Weight |
| --- | --- | --- |
| Title Hero | 72px | 700 |
| Title Page | 48px | 700 |
| Heading | 24px | 600 |
| Subheading | 20px | 400 |
| Body Base | 16px | 400 |
| Body Small | 14px | 400 |

### スペーシングスケール

`2 / 4 / 6 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 160` px

### ボーダー半径

`4 / 8 / 16 / 9999(full)` px
