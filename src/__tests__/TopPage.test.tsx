import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import TopPage from "../components/TopPage";
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter, useNavigate } from "react-router-dom"; // MemoryRouter をインポート
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Jest のモック関数
// jest.fn()は、呼び出されたことの確認、呼び出し回数や引数を記録できる特殊な関数
const mockedUsedNavigate = jest.fn();

// react-router-domモジュールを部分的にモック化
// import { useNavigate } from "react-router-dom";の部分をモック化
jest.mock("react-router-dom", () => ({
  // 元のモジュールの他の機能は保持
  ...jest.requireActual("react-router-dom"),
  // テスト時に、useNavigate()を呼び出すと、mockedUsedNavigateが返される
  // (front側はnavigate(`/cards/${id}`)になっている)
  // jest.fn()は引数も保持できる
  useNavigate: () => mockedUsedNavigate,
}));

it("IDを入力してボタンを押すと /cards/:id に遷移する", async () => {
  render(
    <ChakraProvider value={defaultSystem}>
      <MemoryRouter>
        <TopPage />
      </MemoryRouter>
    </ChakraProvider>
  );

  //  target.valueに入力値を指定
  // この例では、IDフィールドに'123'を入力
  fireEvent.change(screen.getByLabelText("ID:"), { target: { value: "123" } });

  fireEvent.click(screen.getByText("名刺をみる"));

  await waitFor(() => {
    console.log("mockedUsedNavigate:", mockedUsedNavigate);
  });

  // フロント側の以下と対応
  // import { useNavigate } from "react-router-dom";
  // const navigate = useNavigate();
  // navigate(`/cards/${id}`);
  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/cards/123");
  });

  // mockedUsedNavigate.mock.calls: モック関数が呼び出された際の引数のリストを保持する配列
  console.log(
    "ナビゲーションが呼び出されたURL [0]:",
    mockedUsedNavigate.mock.calls[0]
  );
  console.log(
    "ナビゲーションが呼び出されたURL [0][0]:",
    mockedUsedNavigate.mock.calls[0][0]
  );
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
