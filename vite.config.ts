import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import envCompatible from "vite-plugin-env-compatible";

// defineConfig 関数を使うと、Viteの設定をオブジェクトとしてエクスポートする際に、型補完やエラーチェックが効く
export default defineConfig({
  plugins: [
    // ViteのReactプロジェクト用のデフォルトプラグイン
    react(),
    // TypeScriptの tsconfig.json ファイルで設定されたパスエイリアスをViteで使用できるようにするプラグイン
    tsconfigPaths(),
    // vite-plugin-env-compatibleプラグインを使用して、環境変数(.envで定義)をViteプロジェクトに適用するために使用される
    // Jestでの使用: Viteの環境変数をJestで使用できるようにする
    envCompatible({
      // プレフィックスの指定: 環境変数の前に付ける特定の文字列（この場合はVITE_）を指定
      // セキュリティ: ViteはデフォルトでVITE_プレフィックスが付いた環境変数のみをクライアントサイドのコードに公開
      // 意図しない環境変数がクライアントサイドに漏洩するのを防ぐ
      prefix: "VITE",

      // 環境変数をprocess.env形式で利用できるようにする 例: process.env.VITE_API_KEY として環境変数にアクセスできる
      // 環境変数を process.env にマウントすることで、Node.js 環境で使用されるオブジェクトにアクセスできるようにする
      // サーバーサイドのコードやテスト環境でも同じ環境変数を使用できる
      mountedPath: "process.env",
    }),
  ],
  build: {
    // ソースマップを有効にする
    sourcemap: true,
  },
});

// import envCompatible from "vite-plugin-env-compatible";
// 環境変数をViteプロジェクトで使用できるようにするプラグイン
// https://www.npmjs.com/package/vite-plugin-env-compatible?activeTab=readme
// VITE + Reactプロジェクトでprocess.envを使うには
// https://qiita.com/shunii/items/b00d556f3730e6b88708
// Vite環境で環境変数が使われているファイルをテストする
// https://qiita.com/diskszk/items/ed6362e35e15f2fd790e
