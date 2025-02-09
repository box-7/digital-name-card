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
      const nameText = screen.getByText(/テスト太郎/i);
      expect(nameText).toBeInTheDocument();
    });
  });
});
