import '@testing-library/jest-dom';

module.exports = {
        // <rootDir> は、Jestの設定ファイルで使用される特殊なトークンで、プロジェクトのルートディレクトリを指す
        setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      };

      global.structuredClone = (obj) => {
        //   console.log("jest.setup.ts", obj);
        // if (obj === undefined) console.log("jest.setup.ts", obj);
        if (obj === undefined) return undefined;
        return JSON.parse(JSON.stringify(obj));
      };
      