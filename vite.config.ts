// ViteのReactプロジェクト用のデフォルトプラグインを設定
import react from "@vitejs/plugin-react";
// defineConfig 関数を使うと、Viteの設定をオブジェクトとしてエクスポートする際に、型補完やエラーチェックが効くようになる
import { defineConfig } from "vite";
// TypeScriptの tsconfig.json ファイルで設定されたパスエイリアスをViteで使用できるようにするプラグイン
import tsconfigPaths from "vite-tsconfig-paths";
// 環境変数をViteプロジェクトで簡単に使用できるようにするプラグイン
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
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
