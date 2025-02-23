import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import envCompatible from "vite-plugin-env-compatible";

// defineConfig 関数を使うと、Viteの設定をオブジェクトとしてエクスポートする際に、型補完やエラーチェックが効く
export default defineConfig({
  plugins: [
    react(), // ViteのReactプロジェクト用のデフォルトプラグインを設定
    tsconfigPaths(), // TypeScriptの tsconfig.json ファイルで設定されたパスエイリアスをViteで使用できるようにするプラグイン
    envCompatible({
      // envCompatibleは、Viteのプラグインの一つで、環境変数をViteプロジェクトに適用するために使用される

      // 環境変数のプレフィックス(特定の文字列の前に付ける接頭辞のこと)を指定
      // VITE_API_KEY のようにプレフィックスを付けた環境変数を使用する
      // .env ファイルに VITE_API_KEY として定義された変数は、import.meta.env.VITE_API_KEY としてアクセスできる
      prefix: "VITE",

      // 環境変数をマウントするパスを指定
      // process.envは、Node.js環境で使用されるオブジェクトで、環境変数にアクセスするためのもの
      mountedPath: "process.env",
    }),
  ],
  build: {
    sourcemap: true, // ソースマップを有効にする
  },
});

// import envCompatible from "vite-plugin-env-compatible";
// 環境変数をViteプロジェクトで使用できるようにするプラグイン
// https://www.npmjs.com/package/vite-plugin-env-compatible?activeTab=readme
// VITE + Reactプロジェクトでprocess.envを使うには
// https://qiita.com/shunii/items/b00d556f3730e6b88708
// Vite環境で環境変数が使われているファイルをテストする
// https://qiita.com/diskszk/items/ed6362e35e15f2fd790e
