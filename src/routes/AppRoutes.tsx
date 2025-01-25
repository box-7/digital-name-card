import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "../components/Card";

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
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
