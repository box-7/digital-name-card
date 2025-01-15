import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { Button } from "@/components/ui/button"
import { HStack } from "@chakra-ui/react";
import { Button, Stack, Theme } from "@chakra-ui/react";

function App() {
  return (
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
  );
}

export default App;
