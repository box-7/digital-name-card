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
import * as supabaseOperations from "../lib/supabaseOperations";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// spyOnはexport で書かれた関数でないと、モック化できない
// jest.spyOn(supabaseOperations, "insertUsers").mockResolvedValueOnce(undefined);

jest.mock("../lib/supabaseOperations", () => ({
  // 他の関数は実際の実装を使用する
  ...jest.requireActual("../lib/supabaseOperations"),
  insertUsers: jest.fn(),
  insertUserSkill: jest.fn(),
  // スキルデータのモックを追加 // ないと通らない
  getSkills: jest.fn().mockResolvedValue([
    { id: "1", name: "React" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "GitHub" },
  ]),
}));

// 目的
// 以下設定により、insertUsers 関数をモック関数として扱うことができ、テスト内で関数の呼び出しや引数を検証することができる
// supabaseOperations.insertUsers  supabaseOperations モジュールからインポートされた insertUsers 関数
// TypeScriptの型アサーション(as)を使用して、insertUsers 関数を jest.MockedFunction 型に変換
// jest.MockedFunctionは、Jestのモック関数の型を表す
// typeof supabaseOperations.insertUsers は、insertUsers 関数の型を取得
const mockInsertUsers = supabaseOperations.insertUsers as jest.MockedFunction<
  typeof supabaseOperations.insertUsers
>;
const mockInsertUserSkill =
  supabaseOperations.insertUserSkill as jest.MockedFunction<
    typeof supabaseOperations.insertUserSkill
  >;
const mockGetSkills = supabaseOperations.getSkills as jest.MockedFunction<
  typeof supabaseOperations.getSkills
>;

mockInsertUsers.mockImplementation(async (user) => {
  if (!user.user_id || !user.name || !user.description) {
    throw new Error("Required fields are missing");
  }

  // 渡されたデータの検証 // なくても通る
  // expect(user).toEqual(expect.objectContaining({
  //         user_id: "testusera",
  //         name: "xxxテスト太郎",
  //         description: "xxxを学習しています",
  //         github_id: "github",
  //         qiita_id: "qiita",
  //         x_id: "x"
  // }));

  // 関数が正常に終了した場合、Promise.resolve()を返し、非同期関数が成功したことを示す
  return Promise.resolve();
});

mockInsertUserSkill.mockImplementation(async (userSkill) => {
  // 必要なフィールドの存在チェック
  if (!userSkill.user_id || !userSkill.skill_id) {
    throw new Error("Required fields are missing");
  }

  // 渡されたデータの検証 // なくても通る
  // expect(userSkill).toEqual(expect.objectContaining({
  //         user_id: "testusera",
  //         // interfaceに定義している通り、number型で指定
  //         skill_id: 1
  // }));

  return Promise.resolve();
});

// テストファイルの先頭で timeout を設定
jest.setTimeout(30000);

describe("Register component", () => {
  // モック関数の呼び出し履歴をクリア  前のテストケースでの呼び出し履歴がリセットされ、次のテストケースがクリーンな状態で開始される
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
    mockInsertUsers.mockClear();
    mockInsertUserSkill.mockClear();
    mockGetSkills.mockClear();
  });

  it("全項目を入力して登録ボタンを押すと/に遷移し、データがSupabaseに登録される", async () => {
    // モックをクリア
    // テストの独立性を保つ: 各テストケースが他のテストケースの影響を受けないようにするために、モック関数の呼び出し履歴をリセット
    // 正確な検証: 特定のテストケースでモック関数が正しく呼び出されたかどうかを検証するために、呼び出し履歴をクリアしてからテストを実行

    // expect.assertions(1);

    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/register"]}>
          <Routes>
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    const selectElement = await waitFor(async () =>
      screen.getByTestId("favorite-skill-select")
    );

    await waitFor(
      async () => {
        expect(selectElement).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/好きな英単語/i), {
        target: { value: "testusera" },
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
      fireEvent.change(screen.getByLabelText("X ID"), {
        target: { value: "x" },
      });

      screen.debug();
    });

    await act(async () => {
      // TypeScriptの型はnumberだが、入力値は文字列で良い
      fireEvent.change(selectElement, { target: { value: "1" } });
    });
    const registerButton = await waitFor(() =>
      screen.getByTestId("register-button")
    );

    await waitFor(() => {
      fireEvent.click(registerButton);
    });

    await waitFor(
      () => {
        expect(mockInsertUsers).toHaveBeenCalled();
        expect(mockInsertUserSkill).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
      },
      { timeout: 5000 }
    );
  });
});

// userEventの書き方
// const user = userEvent.setup();

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

// await waitFor(() => {
//         const selectElement = screen.getByTestId("favorite-skill-select") as HTMLSelectElement;
//         expect(selectElement.options.length).toBeGreaterThan(1); // 選択肢が読み込まれるまで待つ
// }, { timeout: 5000 });

// const selectElement = screen.getByTestId("favorite-skill-select");
// await user.selectOptions(selectElement, "1");

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

//  await waitFor
// 目的:
// 非同期操作が完了するまで待機
// その後にアサーションを実行
// 主に、非同期で更新されるDOM要素の存在を確認するために使用される。

// 使用方法:
// waitForは、指定されたコールバック関数が成功するまで繰り返し実行される
// タイムアウトやインターバルを設定することもできる
//タイムアウトを設定しないと、エラーになる
// await waitFor(
//         () => {
//                 expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
//         },
//         { timeout: 5000 }
// );
// });

describe("RegistrationPage.test.tsxの全体をテストする", () => {
  it("タイトルが表示されていることを確認する", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </ChakraProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("名刺新規登録")).toBeInTheDocument();
    });
  });
  test("戻るボタンをクリックすると/に遷移する", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/register"]}>
          <Routes>
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );
    await waitFor(() => {
      const backButtonRegister = screen.getByTestId("back-button-register");
      fireEvent.click(backButtonRegister);
    });
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
  });
});
