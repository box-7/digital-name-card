import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Card from '../components/Card';

const router = createBrowserRouter([
  {
    path: '/cards/:id',
    element: <Card />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default AppRoutes;