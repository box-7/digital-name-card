import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder as UtilTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = UtilTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};

module.exports = {
  // <rootDir> は、Jestの設定ファイルで使用される特殊なトークンで、プロジェクトのルートディレクトリを指す
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

global.structuredClone = (obj) => {
  if (obj === undefined) return undefined;
  return JSON.parse(JSON.stringify(obj));
};
