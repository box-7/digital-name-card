import '@testing-library/jest-dom';

module.exports = {
        // <rootDir> は、Jestの設定ファイルで使用される特殊なトークンで、プロジェクトのルートディレクトリを指す
        setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      };