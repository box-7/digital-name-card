import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "../components/Card";
// デフォルトエクスポートをインポート
// import Register from "../pages/cards/Register";
// 名前付きエクスポートをインポート
import Register from "../pages/cards/Register";
import TopPage from "../components/TopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopPage />,
  },
  {
    path: "/cards/:id",
    element: <Card />,
  },
  {
    path: "/cards/register",
    element: <Register />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
