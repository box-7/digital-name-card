import type { Config } from "jest";

const config: Config = {
  // npm install --save-dev ts-jest @types/jestで
  // ts-jest と @types/jest を開発依存としてインストールし、TypeScriptのサポートを有効にできる
  // 以下を設定することで、TypeScriptで書かれたプロジェクトをJestでテストできるようになる
  preset: "ts-jest",
  // 指定された各 setupFile は、各テストファイルごとに一度実行される
  // これらのスクリプトは、テスト環境がセットアップされた後、setupFilesAfterEnv より前、そしてテストコード自体が実行される前に実行される
  // Jestは .env ファイルから環境変数を自動的に読み込むことができない
  // テストコード内で process.env を使って環境変数にアクセスすることができなくなる
  setupFiles: ["dotenv/config"],
  // jsdom は、Node.js 環境でブラウザのようなDOM（Document Object Model）をシミュレートするためのライブラリ
  testEnvironment: "jest-environment-jsdom",
  // setupFilesAfterEnv: テスト環境がセットアップされた後に実行されるスクリプトファイルのリストを指定
  // ["./jest.setup.ts"]: jest.setup.ts というファイルを指定
  setupFilesAfterEnv: ["./jest.setup.ts"],
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
    // ^ は文字列の先頭を示す // @/ はエイリアスのプレフィックス
    // (.*) は任意の文字列にマッチする正規表現 // $ は文字列の終わりを示す
    // @/ で始まる任意の文字列にマッチする
    // エイリアス設定: @/ を使って、src ディレクトリ内のモジュールを簡単にインポートできます。
    // 可読性向上: 長い相対パスを避け、コードの可読性と保守性を向上させる
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Jestのテスト結果をHTML形式でレポートするための設定
  // 具体的には、jest-html-reporters パッケージを使用して、テスト結果をHTMLファイルとして生成
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

// /**
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */

// import type {Config} from 'jest';

// const config: Config = {
//   // All imported modules in your tests should be mocked automatically
//   // automock: false,

//   // Stop running tests after `n` failures
//   // bail: 0,

//   // The directory where Jest should store its cached dependency information
//   // cacheDirectory: "/private/var/folders/sz/43b19mk52jg2nqsqhpcj4xjm0000gn/T/jest_dx",

//   // Automatically clear mock calls, instances, contexts and results before every test
//   clearMocks: true,

//   // Indicates whether the coverage information should be collected while executing the test
//   collectCoverage: true,

//   // An array of glob patterns indicating a set of files for which coverage information should be collected
//   // collectCoverageFrom: undefined,

//   // The directory where Jest should output its coverage files
//   coverageDirectory: "coverage",

//   // An array of regexp pattern strings used to skip coverage collection
//   // coveragePathIgnorePatterns: [
//   //   "/node_modules/"
//   // ],

//   // Indicates which provider should be used to instrument code for coverage
//   // coverageProvider: "babel",

//   // A list of reporter names that Jest uses when writing coverage reports
//   // coverageReporters: [
//   //   "json",
//   //   "text",
//   //   "lcov",
//   //   "clover"
//   // ],

//   // An object that configures minimum threshold enforcement for coverage results
//   // coverageThreshold: undefined,

//   // A path to a custom dependency extractor
//   // dependencyExtractor: undefined,

//   // Make calling deprecated APIs throw helpful error messages
//   // errorOnDeprecated: false,

//   // The default configuration for fake timers
//   // fakeTimers: {
//   //   "enableGlobally": false
//   // },

//   // Force coverage collection from ignored files using an array of glob patterns
//   // forceCoverageMatch: [],

//   // A path to a module which exports an async function that is triggered once before all test suites
//   // globalSetup: undefined,

//   // A path to a module which exports an async function that is triggered once after all test suites
//   // globalTeardown: undefined,

//   // A set of global variables that need to be available in all test environments
//   // globals: {},

//   // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
//   // maxWorkers: "50%",

//   // An array of directory names to be searched recursively up from the requiring module's location
//   // moduleDirectories: [
//   //   "node_modules"
//   // ],

//   // An array of file extensions your modules use
//   // moduleFileExtensions: [
//   //   "js",
//   //   "mjs",
//   //   "cjs",
//   //   "jsx",
//   //   "ts",
//   //   "tsx",
//   //   "json",
//   //   "node"
//   // ],

//   // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
//   // moduleNameMapper: {},

//   // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
//   // modulePathIgnorePatterns: [],

//   // Activates notifications for test results
//   // notify: false,

//   // An enum that specifies notification mode. Requires { notify: true }
//   // notifyMode: "failure-change",

//   // A preset that is used as a base for Jest's configuration
//   // preset: undefined,

//   // Run tests from one or more projects
//   // projects: undefined,

//   // Use this configuration option to add custom reporters to Jest
//   // reporters: undefined,

//   // Automatically reset mock state before every test
//   // resetMocks: false,

//   // Reset the module registry before running each individual test
//   // resetModules: false,

//   // A path to a custom resolver
//   // resolver: undefined,

//   // Automatically restore mock state and implementation before every test
//   // restoreMocks: false,

//   // The root directory that Jest should scan for tests and modules within
//   // rootDir: undefined,

//   // A list of paths to directories that Jest should use to search for files in
//   // roots: [
//   //   "<rootDir>"
//   // ],

//   // Allows you to use a custom runner instead of Jest's default test runner
//   // runner: "jest-runner",

//   // The paths to modules that run some code to configure or set up the testing environment before each test
//   // setupFiles: [],

//   // A list of paths to modules that run some code to configure or set up the testing framework before each test
//   // setupFilesAfterEnv: [],

//   // The number of seconds after which a test is considered as slow and reported as such in the results.
//   // slowTestThreshold: 5,

//   // A list of paths to snapshot serializer modules Jest should use for snapshot testing
//   // snapshotSerializers: [],

//   // The test environment that will be used for testing
//   testEnvironment: "jsdom",

//   // Options that will be passed to the testEnvironment
//   // testEnvironmentOptions: {},

//   // Adds a location field to test results
//   // testLocationInResults: false,

//   // The glob patterns Jest uses to detect test files
//   // testMatch: [
//   //   "**/__tests__/**/*.[jt]s?(x)",
//   //   "**/?(*.)+(spec|test).[tj]s?(x)"
//   // ],

//   // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
//   // testPathIgnorePatterns: [
//   //   "/node_modules/"
//   // ],

//   // The regexp pattern or array of patterns that Jest uses to detect test files
//   // testRegex: [],

//   // This option allows the use of a custom results processor
//   // testResultsProcessor: undefined,

//   // This option allows use of a custom test runner
//   // testRunner: "jest-circus/runner",

//   // A map from regular expressions to paths to transformers
//   // transform: undefined,

//   // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
//   // transformIgnorePatterns: [
//   //   "/node_modules/",
//   //   "\\.pnp\\.[^\\/]+$"
//   // ],

//   // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
//   // unmockedModulePathPatterns: undefined,

//   // Indicates whether each individual test should be reported during the run
//   // verbose: undefined,

//   // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
//   // watchPathIgnorePatterns: [],

//   // Whether to use watchman for file crawling
//   // watchman: true,
// };

// export default config;
