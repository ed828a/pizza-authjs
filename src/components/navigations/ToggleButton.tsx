import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { GoSun, GoMoon } from "react-icons/go";
type Props = {};

const ToggleButton = (props: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      className="mr-6"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <GoSun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <GoMoon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

export default ToggleButton;
