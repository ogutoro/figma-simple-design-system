# Contact フォーム バリデーション・送信機能 設計書

## 概要

Contactページ (`/contact`) のフォームに、バリデーションと送信機能を実装する。

| ライブラリ | 用途 |
| --- | --- |
| `react-hook-form` | フォーム状態管理・バリデーション統合 |
| `zod` | スキーマ定義・バリデーションロジック |
| `@hookform/resolvers` | RHF ↔ Zod の接続ブリッジ |
| `msw` | APIモック (開発・テスト用) |

---

## ディレクトリ構成 (追加分)

```
app/
  contact/
    page.tsx                    # Server Component (変更なし)
components/
  contact/
    ContactForm.tsx             # フォーム本体 (Client Component)
lib/
  schemas/
    contact.ts                  # Zod スキーマ
  api/
    contact.ts                  # fetch ラッパー
mocks/
  handlers/
    contact.ts                  # MSW ハンドラー
  browser.ts                    # ブラウザ用 MSW worker
  node.ts                       # Node.js用 MSW worker (テスト用)
  index.ts                      # 環境判別エントリ
app/
  MSWProvider.tsx               # MSW 初期化 Client Component
```

---

## Zod スキーマ定義

**ファイル**: `lib/schemas/contact.ts`

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name:    z.string().min(1, "名前を入力してください").max(50, "50文字以内で入力してください"),
  surname: z.string().min(1, "苗字を入力してください").max(50, "50文字以内で入力してください"),
  email:   z.string().min(1, "メールアドレスを入力してください").email("有効なメールアドレスを入力してください"),
  message: z.string().min(1, "メッセージを入力してください").max(1000, "1000文字以内で入力してください"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

### バリデーションルール一覧

| フィールド | 必須 | min | max | フォーマット |
| --- | --- | --- | --- | --- |
| name | ✓ | 1文字 | 50文字 | — |
| surname | ✓ | 1文字 | 50文字 | — |
| email | ✓ | — | — | emailフォーマット |
| message | ✓ | 1文字 | 1000文字 | — |

---

## API仕様 (モック)

### エンドポイント

`POST /api/contact`

### リクエスト

```json
{
  "name": "Taro",
  "surname": "Yamada",
  "email": "taro@example.com",
  "message": "お問い合わせ内容"
}
```

### レスポンス

**成功 (200)**
```json
{ "message": "お問い合わせを受け付けました。" }
```

**バリデーションエラー (400)**
```json
{ "error": "入力内容に誤りがあります。" }
```

**サーバーエラー (500)**
```json
{ "error": "サーバーエラーが発生しました。しばらくしてから再度お試しください。" }
```

---

## MSW ハンドラー設計

**ファイル**: `mocks/handlers/contact.ts`

- `POST /api/contact` を interceptして模擬レスポンスを返す
- **成功シナリオ**: `delay(800)` 後に 200 を返す (ネットワーク遅延の再現)
- **エラーシナリオ**: `?error=true` クエリパラメータで 500 を再現可能にする (開発用)

---

## コンポーネント設計

### `ContactForm.tsx`

- `'use client'` ディレクティブが必要 (RHF はブラウザAPIを使用)
- `useForm<ContactFormValues>` + `zodResolver(contactSchema)` で初期化
- `mode: "onBlur"` — フォーカスアウト時にバリデーション実行

#### フォーム状態

```
idle       → ユーザー入力中 (初期状態)
submitting → API呼び出し中 (Submitボタンをdisable)
success    → 送信成功 (成功メッセージを表示、フォームをリセット)
error      → API失敗 (エラーメッセージを表示、フォームは保持)
```

#### UIフィードバック

| 状態 | 入力欄のボーダー | ラベル下 | Submitボタン |
| --- | --- | --- | --- |
| idle / valid | `--sds-color-border-default-default` | — | 通常表示 |
| フィールドエラー | `--sds-color-red-500` | エラー文言 (赤) | 通常表示 |
| submitting | — | — | `disabled` + "送信中..." |
| success | — | フォーム非表示、成功メッセージ | — |
| APIエラー | — | フォーム上部にエラーバナー | 通常表示 |

#### 成功表示

フォームを非表示にし、以下を表示:
```
✓  お問い合わせを受け付けました。
   担当者より折り返しご連絡いたします。

   [もう一度送信する]  ← クリックでidle状態へリセット
```

---

## コンポーネント分割方針

### `ContactForm.tsx` (単一コンポーネント)

複雑さが低いため、フォーム全体を1ファイルで管理する。以下の要素を含む:

- `<form>` — RHF の `handleSubmit` をバインド
- フィールド × 4 — `register()` で接続、エラー表示付き
- 成功メッセージ — 送信成功後に表示
- エラーバナー — API失敗時に表示
- Submitボタン — `formState.isSubmitting` でdisable制御

フィールドが増えた場合や再利用が必要になった場合に限り `FormField` コンポーネントに切り出す。

---

## MSW初期化フロー (開発環境)

Next.js App Routerでは、MSWのService WorkerをClient Componentで初期化する。

```
app/layout.tsx
  └── <MSWProvider>        ← 開発環境のみ動的import
        └── browser.ts     ← worker.start() を呼ぶ
```

`NODE_ENV !== 'production'` の場合のみ初期化し、本番ビルドには含まない。
`public/mockServiceWorker.js` は `npx msw init public/` で生成する。

---

## テスト設計

### ライブラリ

| ライブラリ | 用途 |
| --- | --- |
| `vitest` | ユニット・コンポーネントテストランナー |
| `@vitejs/plugin-react` | Vitest用Reactサポート |
| `@testing-library/react` | Reactコンポーネントのレンダリング・操作 |
| `@testing-library/user-event` | ユーザー操作のシミュレーション |
| `@testing-library/jest-dom` | DOMアサーションマッチャー拡張 |
| `playwright` | E2Eテストランナー |
| `@playwright/test` | Playwright テストAPI |

---

### Vitest — ユニット・コンポーネントテスト

**設定ファイル**: `vitest.config.ts`

- 環境: `jsdom`
- MSW の `mocks/node.ts` を `beforeAll` でセットアップし、Node.js環境でAPIをモック

#### テストファイル構成

```
tests/
  unit/
    schemas/
      contact.test.ts           # Zodスキーマのバリデーションロジック
  component/
    contact/
      ContactForm.test.tsx      # コンポーネントの振る舞い
```

#### `contact.test.ts` — スキーマ単体テスト

| テストケース | 期待結果 |
| --- | --- |
| 全フィールド正常値 | `success: true` |
| name が空文字 | `"名前を入力してください"` エラー |
| name が51文字 | `"50文字以内で入力してください"` エラー |
| surname が空文字 | `"苗字を入力してください"` エラー |
| email が空文字 | `"メールアドレスを入力してください"` エラー |
| email が不正フォーマット (`foo@`) | `"有効なメールアドレスを入力してください"` エラー |
| message が空文字 | `"メッセージを入力してください"` エラー |
| message が1001文字 | `"1000文字以内で入力してください"` エラー |

#### `ContactForm.test.tsx` — コンポーネントテスト

MSWの `mocks/node.ts` でAPIをモックした状態でテスト。

| テストケース | 操作 | 期待結果 |
| --- | --- | --- |
| 初期レンダリング | — | 4フィールドとSubmitボタンが表示される |
| 空フォーム送信 | Submit クリック | 各フィールドにエラー文言が表示される |
| 不正emailで送信 | email に `foo` 入力 → blur | emailエラー文言が表示される |
| 正常送信 | 全フィールド入力 → Submit | 成功メッセージが表示され、フォームが非表示になる |
| 送信中のボタン | Submit クリック後 | ボタンが `disabled` で "送信中..." になる |
| APIエラー時 | サーバー500を返すハンドラーに差し替え | エラーバナーが表示され、フォームが保持される |
| 「もう一度送信する」 | 成功後にクリック | フォームが再表示される |

---

### Playwright — E2Eテスト

**設定ファイル**: `playwright.config.ts`

- `baseURL`: `http://localhost:3000`
- ブラウザ: Chromium (CI時はヘッドレス)
- MSW Service Workerが動作する開発サーバー (`npm run dev`) を起動した状態でテスト

#### テストファイル構成

```
tests/
  e2e/
    contact.spec.ts             # /contact ページの E2E テスト
```

#### `contact.spec.ts` — E2Eテストケース

| テストケース | 操作 | 期待結果 |
| --- | --- | --- |
| 空フォーム送信 | Submit クリック | 各フィールド下にエラー文言が表示される |
| フォーカスアウトバリデーション | name入力 → Tab | name以外をtabした時点でエラー文言が出る |
| 不正email | email に `invalid-email` 入力 → blur | emailエラーが表示される |
| 正常送信フロー | 全フィールド入力 → Submit | "お問い合わせを受け付けました。" が表示される |
| 送信中UI | Submit クリック直後 | ボタンが `disabled` で "送信中..." になる |
| 再送信 | 成功後「もう一度送信する」 | フォームが再表示され入力できる |
| キーボード操作 | Tab でフォーカス移動 → Enter 送信 | マウス不使用でも正常に送信できる |

---

### テストファイルのディレクトリ構成

```
tests/
  unit/
    schemas/
      contact.test.ts
  component/
    contact/
      ContactForm.test.tsx
  e2e/
    contact.spec.ts
vitest.config.ts
playwright.config.ts
```

---

## 実装ステップ

1. **パッケージインストール** — `react-hook-form`, `zod`, `@hookform/resolvers`, `msw`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `playwright`, `@playwright/test`
2. **MSW初期化** — `npx msw init public/` → `mocks/browser.ts`, `mocks/node.ts`, `MSWProvider.tsx`, `layout.tsx` 修正
3. **Zodスキーマ** — `lib/schemas/contact.ts` 作成
4. **MSWハンドラー** — `mocks/handlers/contact.ts` + `mocks/browser.ts` 作成
5. **fetch ラッパー** — `lib/api/contact.ts` 作成
6. **ContactForm コンポーネント** — `components/contact/ContactForm.tsx` 作成
7. **page.tsx 修正** — `<form>` 部分を `<ContactForm />` に置き換え
8. **Vitestセットアップ** — `vitest.config.ts` 作成 → スキーマ単体テスト・コンポーネントテスト作成
9. **Playwrightセットアップ** — `playwright.config.ts` 作成 → E2Eテスト作成
