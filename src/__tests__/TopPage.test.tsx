import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import TopPage from "../components/TopPage";
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter, useNavigate } from 'react-router-dom'; // MemoryRouter をインポート
import {
        render,
        screen,
        fireEvent,
        waitFor,
      } from '@testing-library/react';

//  const mockedUsedNavigate = jest.fn();
        // Jest のモック関数を作成
        // テスト中に呼び出しを追跡できる空の関数
        // jest.fn()は、呼び出し回数や引数を記録できる特殊な関数

// jest.mock('react-router-dom', () => ({ ... }))
        // react-router-domモジュールを部分的にモック化
        // ...jest.requireActual('react-router-dom') で、元のモジュールの他の機能は保持

// useNavigate: () => mockedUsedNavigate
        // useNavigateフックを、作成したモック関数で置き換え
        // テスト時に、useNavigate()を呼び出すと、mockedUsedNavigateが返される
        // これにより、ナビゲーション呼び出しを検証できる
        // useNavigate のモック実装を変更

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

      it('IDを入力してボタンを押すと /cards/:id に遷移する', async () => {
        // const navigate = useNavigate as jest.Mock; // モック関数としてキャスト
      
        render(
                <ChakraProvider value={defaultSystem}>
            <MemoryRouter>
              <TopPage />
            </MemoryRouter>
          </ChakraProvider>
        );
      
          // IDを入力
  fireEvent.change(screen.getByLabelText('ID:'), { target: { value: '123' } });

  // ボタンをクリック
  fireEvent.click(screen.getByText('名刺をみる'));

  // 遷移先を確認
  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/cards/123');
  });
      });

it("タイトルをレンダリングする", async () => {
  render(
    <ChakraProvider value={defaultSystem}>
      <Router>
        <TopPage />
      </Router>
    </ChakraProvider>
  );
  // 非同期処理が完了するまで待機
  await waitFor(() => {
    expect(screen.getByText("デジタル名刺アプリ")).toBeInTheDocument();
  });
});
