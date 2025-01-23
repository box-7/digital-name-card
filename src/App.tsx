import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { HStack } from "@chakra-ui/react";
import { Button, Stack, Theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Card from "./components/Card";

import AppRoutes from "./routes/AppRoutes";
const App: React.FC = () => {
  return (
    <>
      <AppRoutes />

      <Stack align="flex-start">
        <Button variant="surface" colorPalette="teal">
          Auto Button
        </Button>
        <Theme p="4" appearance="dark" colorPalette="teal">
          <Button variant="surface">Dark Button</Button>
        </Theme>
        <Theme p="4" appearance="light" colorPalette="teal">
          <Button variant="surface">Light Button</Button>
        </Theme>
      </Stack>
    </>
  );
};
export default App;

// (

// const router = createBrowserRouter([
//         // {
//         //   path: '/',
//         //   element: <Home />,
//         // },
//         // {
//         //   path: '/about',
//         //   element: <About />,
//         // },
//         {
//           path: '/cards/:id',
//           element: <Card />,
//         },
//       ]);

// function App() {
//   return (
//     <Stack align="flex-start">
//       <Button variant="surface" colorPalette="teal">
//         Auto Button
//       </Button>
//       <Theme p="4" appearance="dark" colorPalette="teal">
//         <Button variant="surface">Dark Button</Button>
//       </Theme>
//       <Theme p="4" appearance="light" colorPalette="teal">
//         <Button variant="surface">Light Button</Button>
//       </Theme>
//     </Stack>
//   );
// }

// export default App;
