// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import { HStack } from "@chakra-ui/react";
import { Button, Stack, Theme } from "@chakra-ui/react";
// import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
// import Card from "./components/Card";
import React, { useEffect, useState } from "react";
// import supabase from "../supabase";

import AppRoutes from "./routes/AppRoutes";
const App: React.FC = () => {
  return (
    <>
      <AppRoutes />

      <Button variant="surface" colorPalette="teal" size="sm">
        Auto Button
      </Button>
    </>
  );
};
export default App;
