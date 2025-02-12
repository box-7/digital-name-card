// itermではtestできるが、vscodeではtestできない
// jest.config.tsではなくjest.config.jsにした方がいいかもしれない

import type { Config } from "jest";

const config: Config = {
  // npm install --save-dev ts-jest @types/jestでts-jest と @types/jest を開発依存としてインストール
  // TypeScriptのサポートを有効にでき、TypeScriptで書かれたプロジェクトをJestでテストできるようにする
  preset: "ts-jest",
  // テスト環境がセットアップされた後、setupFilesAfterEnv より前、そしてテストコード自体がそれぞれ実行される前に実行される
  // Jestは .env ファイルから環境変数を自動的に読み込むことができず、テストコード内で process.env を使って環境変数にアクセスすることができない
// Jestがテストを実行する前にdotenvパッケージを使用して環境変数を読み込むことを指定
  setupFiles: ["dotenv/config"],
  // jsdom は、Node.js 環境でブラウザのようなDOM（Document Object Model）をシミュレートするためのライブラリ
  testEnvironment: "jest-environment-jsdom",
//   testEnvironment: "node",
//   testEnvironment: "jest-environment-jsdom-sixteen",
  // setupFilesAfterEnv: テスト環境がセットアップされた後に実行されるスクリプトファイルのリストを指定
//   setupFilesAfterEnv: ["./jest.setup.ts"],
 // 上の書き方だと、「全項目を入力して登録ボタンを押すと/に遷移し、データがSupabaseに登録される」が通らない
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // JestがTypeScriptファイルをトランスパイル（変換）するための設定
  // 具体的には、ts-jest を使用して .ts や .tsx ファイルをJavaScriptに変換
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // 正規表現からモジュール名やモジュール名の配列へのマッピングを指定するオプション
  moduleNameMapper: {
    // CSS/LESS ファイルリソースのスタブ化: 画像やスタイルシートなどのリソースをテスト中にスタブ（ダミー）モジュールに置き換えることができる
    "\\.(css|less)$": "identity-obj-proxy",
// ^@/(.*)$:
        // 正規表現パターン
        // ^は文字列の先頭を示す
        // @/はエイリアスのプレフィックス
        // (.*)は任意の文字列にマッチするキャプチャグループ
        // $は文字列の終わりを示す
// <rootDir>/src/$1:
        // 置換パターン
        // <rootDir>はプロジェクトのルートディレクトリを示す
        // srcはsrcディレクトリを示す
        // $1は正規表現のキャプチャグループにマッチした部分を示す
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Jestのテスト結果をHTML形式でレポートするための設定
  // jest-html-reporters パッケージを使用して、テスト結果をHTMLファイルとして生成
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "jest_html_reporters.html",
        expand: true,
      },
    ],
  ],
};


export default config;

// import type { Config } from "jest";

// const config: Config = {
//   // npm install --save-dev ts-jest @types/jestでts-jest と @types/jest を開発依存としてインストール
//   // TypeScriptのサポートを有効にでき、TypeScriptで書かれたプロジェクトをJestでテストできるようにする
//   preset: "ts-jest",
//   // テスト環境がセットアップされた後、setupFilesAfterEnv より前、そしてテストコード自体がそれぞれ実行される前に実行される
//   // Jestは .env ファイルから環境変数を自動的に読み込むことができず、テストコード内で process.env を使って環境変数にアクセスすることができない
// // Jestがテストを実行する前にdotenvパッケージを使用して環境変数を読み込むことを指定
//   setupFiles: ["dotenv/config"],
//   // jsdom は、Node.js 環境でブラウザのようなDOM（Document Object Model）をシミュレートするためのライブラリ
//   testEnvironment: "jest-environment-jsdom",
//   // setupFilesAfterEnv: テスト環境がセットアップされた後に実行されるスクリプトファイルのリストを指定
//   setupFilesAfterEnv: ["./jest.setup.ts"],
//   // JestがTypeScriptファイルをトランスパイル（変換）するための設定
//   // 具体的には、ts-jest を使用して .ts や .tsx ファイルをJavaScriptに変換
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   // 正規表現からモジュール名やモジュール名の配列へのマッピングを指定するオプション
//   moduleNameMapper: {
//     // CSS/LESS ファイルリソースのスタブ化: 画像やスタイルシートなどのリソースをテスト中にスタブ（ダミー）モジュールに置き換えることができる
//     "\\.(css|less)$": "identity-obj-proxy",
// // ^@/(.*)$:
//         // 正規表現パターン
//         // ^は文字列の先頭を示す
//         // @/はエイリアスのプレフィックス
//         // (.*)は任意の文字列にマッチするキャプチャグループ
//         // $は文字列の終わりを示す
// // <rootDir>/src/$1:
//         // 置換パターン
//         // <rootDir>はプロジェクトのルートディレクトリを示す
//         // srcはsrcディレクトリを示す
//         // $1は正規表現のキャプチャグループにマッチした部分を示す
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   // Jestのテスト結果をHTML形式でレポートするための設定
//   // jest-html-reporters パッケージを使用して、テスト結果をHTMLファイルとして生成
//   reporters: [
//     "default",
//     [
//       "jest-html-reporters",
//       {
//         publicPath: "./html-report",
//         filename: "jest_html_reporters.html",
//         expand: true,
//       },
//     ],
//   ],
// };

// export default config;


