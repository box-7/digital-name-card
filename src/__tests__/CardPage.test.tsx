import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Card from "../components/Card";

// Jest のモック関数
// jest.fn()は、呼び出されたことの確認、呼び出し回数や引数を記録できる
const mockedUsedNavigate = jest.fn();

// react-router-domモジュールを部分的にモック化
// (import { useNavigate } from "react-router-dom";の部分)
jest.mock("react-router-dom", () => ({
  // 元のモジュールの他の機能は保持
  ...jest.requireActual("react-router-dom"),
  // テスト時に、useNavigate()を呼び出すと、mockedUsedNavigateが返される
  // (front側はnavigate(`/cards/${id}`))

  // navigate 関数はモック化された mockedUsedNavigate 関数であるため、
  // mockedUsedNavigate が "/" ,"/cards/${id}"という引数で呼び出されたことを確認できる
  useNavigate: () => mockedUsedNavigate,
}));

describe("Cardページの確認", () => {
  test("名前が表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const nameText = screen.getByTestId("name-text");
      // expect(nameText.textContent).toBeInTheDocument();
      expect(nameText.textContent).toBe("テスト太郎");
    });
  });

  test("自己紹介が表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const introductionText = screen.getByTestId("introduction-text");
      // console.log("introductionText:", introductionText.textContent);
      // textareaの内容だから、toBeInTheDocument()は使えない?
      // expect(introductionText.textContent).toBeInTheDocument();
      expect(introductionText.textContent).toBe("Reactを学習しています");
    });
  });

  test("技術が表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    // スキルテキストが表示されるまで待機し、内容を検証
    await waitFor(
      () => {
        const skillText = screen.getByTestId("skill");
        expect(skillText).toBeInTheDocument();
        expect(skillText.textContent).toBe("React");
      },
      {
        timeout: 5000, // タイムアウトを5秒に設定
        interval: 100, // チェック間隔を100msに設定
      }
    );

    //     await waitFor(async () => {
    // //  const skillText = await screen.getByTestId("skill"); // GitHub Actionsだとこける
    //       const skillText = await waitFor(() => screen.getByTestId("skill"));
    //       // console.log("skillText:", skillText.textContent);
    //       // memoizedProps: 現在のレンダリング結果を保持しているプロパティであり、通常は textContent に対応します。
    //       // console.log("skillText:", skillText);
    //       await waitFor(async () => {
    //         expect(skillText.textContent).toBe("React");
    //       });
    // });
  });

  test("戻るボタンをクリックすると/に遷移する", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const backButton = screen.getByTestId("back-button");
      fireEvent.click(backButton);
    });

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("GitHubのアイコンが表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const githubIcon = screen.getByTestId("github-icon");
      expect(githubIcon).toBeInTheDocument();
    });
  });

  test("Twitterのアイコンが表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const qiitaIcon = screen.getByTestId("qiita-icon");
      expect(qiitaIcon).toBeInTheDocument();
    });
  });

  test("Twitterのアイコンが表示されている", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const xIcon = screen.getByTestId("x-icon");
      expect(xIcon).toBeInTheDocument();
    });
  });
});
