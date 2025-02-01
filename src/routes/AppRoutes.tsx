import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "../components/Card";
// デフォルトエクスポートをインポート
// import Register from "../pages/cards/Register";
// 名前付きエクスポートをインポート
import Register  from "../pages/cards/Register";

// 仮のHomeコンポーネントを定義
const Home: React.FC = () => {
  return <div>Home</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // 仮でデフォルトルートを追加
  },
  {
    path: "/cards/:id",
    element: <Card />,
  },
  {
        path:"/cards/register",
        element: <Register />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
