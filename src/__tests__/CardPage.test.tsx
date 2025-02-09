import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Card from "../components/Card";

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
      console.log("introductionText:", introductionText.textContent);
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

    await waitFor(() => {
      const skillText = screen.getByTestId("skill");
      // console.log("skillText:", skillText.textContent);
      // memoizedProps: 現在のレンダリング結果を保持しているプロパティであり、通常は textContent に対応します。
      // console.log("skillText:", skillText);
      expect(skillText.textContent).toBe("React");
    });
  });
});
