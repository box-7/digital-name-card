
<img width="1001" alt="image" src="https://github.com/user-attachments/assets/6acf3fbe-ed44-4132-9aaf-0a19bc61229e" />

# デジタル名刺アプリ

## 概要
デジタル名刺アプリ

## プロジェクトの目的
このプロジェクトは、ユーザーが自分のスキルやプロフィールを管理できるデジタル名刺アプリを提供することを目的としています。

## 機能

### 名刺登録
<div style="display: flex; align-items: center;">
  <div style="flex: 1;">
    <ul>
      <li>好きな英単語（IDとして使用）</li>
      <li>名前</li>
      <li>自己紹介</li>
      <li>好きな技術</li>
      <li>GitHub ID</li>
      <li>Qiita ID</li>
      <li>X ID</li>
    </ul>
  </div> 
</div>

### 名刺検索
- ID（英単語）を入力し、名刺を見ることができる


### 名刺閲覧
- 名前
- 自己紹介
- 好きな技術
- GitHub ID
- Qiita ID
- X ID
（GitHub, Qiita, Xはリンクとなっている）


## 技術
- React
- TypeScript
- Firebase
- Supabase
- GitHub Actions
- Jest
- Prettier
- ESLint
- Vite
- ChakraUI
- Makefile

## テーブル

### users
| カラム名       | 型          | 説明           |
| -------------- | ----------- | -------------- |
| user_id        | varchar     | PK             |
| name           | varchar     |                |
| description    | text        |                |
| github_id      | varchar     |                |
| qiita_id       | varchar     |                |
| x_id           | varchar     |                |
| created_at     | timestamptz |                |

### user_skill（中間テーブル）
| カラム名       | 型          | 説明           |
| -------------- | ----------- | -------------- |
| id             | int8        |                |
| user_id        | varchar     |                |
| skill_id       | int8        |                |
| created_at     | timestamptz |                |

### skill
| カラム名       | 型          | 説明           |
| -------------- | ----------- | -------------- |
| id             | int8        |                |
| name           | varchar     |                |
| created_at     | timestamptz |                |

## 必要な環境変数やコマンド一覧

```bash
# リポジトリをクローン
git clone https://github.com/box-7/digital-name-card.git

# ディレクトリに移動
cd digital-name-card

# 依存関係をインストール
npm install

# ビルド
npm run build

# 環境変数の設定
プロジェクトのルートディレクトリに .env ファイルを作成し、以下の環境変数を設定してください。
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 開発サーバーの起動
npm run dev
ブラウザで http://localhost:3000(ポート番号は環境に合わせる)を開いてアプリケーションを確認します。

# テストの実行
npm run test
```

## 画面
### 名刺登録
<img width="250" alt="image" src="https://github.com/user-attachments/assets/67339874-3916-46e1-b739-615b6b5b9465" />

### 名刺検索
<img width="250" alt="image" src="https://github.com/user-attachments/assets/40f2251d-223e-45d3-89fe-d8db91ab9534" />

### 名刺閲覧
<img width="250" alt="image" src="https://github.com/user-attachments/assets/c8b5d897-90e5-49ff-a5a2-8d5f9c5a8c45" />
