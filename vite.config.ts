// ViteのReactプロジェクト用のデフォルトプラグインを設定
import react from "@vitejs/plugin-react";
// defineConfig 関数を使うと、Viteの設定をオブジェクトとしてエクスポートする際に、型補完やエラーチェックが効くようになる
import { defineConfig } from "vite";
// TypeScriptの tsconfig.json ファイルで設定されたパスエイリアスをViteで使用できるようにするプラグイン
import tsconfigPaths from "vite-tsconfig-paths";
// 環境変数をViteプロジェクトで簡単に使用できるようにするプラグイン
// https://www.npmjs.com/package/vite-plugin-env-compatible?activeTab=readme
// VITE + Reactプロジェクトでprocess.envを使うには
// https://qiita.com/shunii/items/b00d556f3730e6b88708
// Vite環境で環境変数が使われているファイルをテストする
// https://qiita.com/diskszk/items/ed6362e35e15f2fd790e
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    envCompatible({
      // 環境変数のプレフィックスを指定
      // 例えば、VITE_API_KEY のようにプレフィックスを付けた環境変数を使用する
      // .env ファイルに VITE_API_KEY として定義された変数は、import.meta.env.VITE_API_KEY としてアクセスできる
      prefix: "VITE",
      // 環境変数をマウントするパスを指定
      mountedPath: "process.env",
    }),
  ],
  build: {
        sourcemap: true, // ソースマップを有効にする
      },
});
