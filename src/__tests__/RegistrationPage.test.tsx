import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Register from "@/pages/cards/Register";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import supabase from "../../supabase";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// jest.mock("../../supabase", () => ({
//   __esModule: true,
//   default: {
//     from: jest.fn().mockReturnThis(),
//     insert: jest
//       .fn()
//       .mockResolvedValue({ data: [{ user_id: "testuser" }], error: null }),
//   },
// }));

it("全項目を入力して登録ボタンを押すと/に遷移し、データがSupabaseに登録される", async () => {
  // モックをクリア
  // テストの独立性を保つ: 各テストケースが他のテストケースの影響を受けないようにするために、モック関数の呼び出し履歴をリセット
  // 正確な検証: 特定のテストケースでモック関数が正しく呼び出されたかどうかを検証するために、呼び出し履歴をクリアしてからテストを実行
  mockedUsedNavigate.mockClear();
  // expect.assertions(1);
  const user = userEvent.setup();
  render(
    <ChakraProvider value={defaultSystem}>
      <MemoryRouter initialEntries={["/cards/register"]}>
        <Routes>
          <Route path="/cards/register" element={<Register />} />
        </Routes>
      </MemoryRouter>
    </ChakraProvider>
  );

  // await:
  // Promiseが解決または拒否されるまで待機
  // Promiseが解決されると、その結果を返す
  // awaitは、async関数内でのみ使用できる
  // await user.type(screen.getByLabelText(/好きな英単語/i), "testuserk");
  // await user.type(screen.getByLabelText(/お名前/i), "xxxテスト太郎");
  // await user.type(screen.getByLabelText(/自己紹介/i), "xxxを学習しています");
  // await user.type(screen.getByLabelText("GitHub ID"), "github");
  // await user.type(screen.getByLabelText("Qiita ID"), "qiita");
  // await user.type(screen.getByLabelText("X ID"), "x");

  fireEvent.change(screen.getByLabelText(/好きな英単語/i), {
    target: { value: "testuserl" },
  });
  fireEvent.change(screen.getByLabelText(/お名前/i), {
    target: { value: "xxxテスト太郎" },
  });
  fireEvent.change(screen.getByLabelText(/自己紹介/i), {
    target: { value: "xxxを学習しています" },
  });
  fireEvent.change(screen.getByLabelText("GitHub ID"), {
    target: { value: "github" },
  });
  fireEvent.change(screen.getByLabelText("Qiita ID"), {
    target: { value: "qiita" },
  });
  fireEvent.change(screen.getByLabelText("X ID"), { target: { value: "x" } });

  // await waitFor(() => {
  //         const selectElement = screen.getByTestId("favorite-skill-select") as HTMLSelectElement;
  //         expect(selectElement.options.length).toBeGreaterThan(1); // 選択肢が読み込まれるまで待つ
  // }, { timeout: 5000 });

  // const selectElement = screen.getByTestId("favorite-skill-select");
  // await user.selectOptions(selectElement, "1");

  await waitFor(() => {
    const selectElement = screen.getByTestId(
      "favorite-skill-select"
    ) as HTMLSelectElement;
    expect(selectElement.options.length).toBeGreaterThan(1); // 選択肢が読み込まれるまで待つ
  });

  const selectElement = screen.getByTestId(
    "favorite-skill-select"
  ) as HTMLSelectElement;
  fireEvent.change(selectElement, { target: { value: "1" } });

  // await act
  // Reactの状態やエフェクトが更新される操作をラップし、その後のレンダリングが完了するまで待機
  // 主に、状態の変更やエフェクトの実行を伴う操作をテストするために使用される
  // selectOptionsは、以下の書き方にする必要がある
  // await act(async () => {
  //         // const selectElement = await screen.getByTestId("favorite-skill-select");
  //         await waitFor(() => {
  //                 user.selectOptions(selectElement, "1"); // "1"は"React"でもOK
  //         }, { timeout: 5000 });
  // });

  // const registerButton = await waitFor(() =>
  //         screen.getByTestId("register-button")
  // );

  // screen.debug();

  // await act(async () => {
  //         await waitFor(() => {
  //                 user.click(registerButton);
  //         });
  // });

  const registerButton = await waitFor(() =>
    screen.getByTestId("register-button")
  );

  screen.debug();

  await act(async () => {
    await waitFor(() => {
      fireEvent.click(registerButton);
    });
  });

  //  await waitFor
  // 目的:
  // 非同期操作が完了するまで待機
  // その後にアサーションを実行
  // 主に、非同期で更新されるDOM要素の存在を確認するために使用される。

  // 使用方法:
  // waitForは、指定されたコールバック関数が成功するまで繰り返し実行される
  // タイムアウトやインターバルを設定することもできる
  // await waitFor(() => {
  //         expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  // }, { timeout: 5000 });
  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});

describe("RegistrationPage.test.tsxの全体をテストする", () => {
  // it("タイトルが表示されていることを確認する", async () => {
  //         render(
  //                 <ChakraProvider value={defaultSystem}>
  //                         <MemoryRouter>
  //                                 <Register />
  //                         </MemoryRouter>
  //                 </ChakraProvider>
  //         )
  //         await waitFor(() => {
  //                 expect(screen.getByText("名刺新規登録")).toBeInTheDocument();
  //         });
  // });
  // test("戻るボタンをクリックすると/に遷移する", async () => {
  //         render(
  //                 <ChakraProvider value={defaultSystem}>
  //                         <MemoryRouter initialEntries={["/cards/register"]}>
  //                                 <Routes>
  //                                         <Route path="/cards/register" element={<Register />} />
  //                                 </Routes>
  //                         </MemoryRouter>
  //                 </ChakraProvider>
  //         );
  //         await waitFor(() => {
  //                 const backButtonRegister = screen.getByTestId("back-button-register");
  //                 fireEvent.click(backButtonRegister);
  //         });
  //         await waitFor(() => {
  //                 expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  //         });
  // });
});
