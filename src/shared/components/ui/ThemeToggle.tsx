import { useTheme } from "../../hooks/useTheme";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { Button } from "./ui-general/Button";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-14 h-14 p-0 bg-gray-100 dark:bg-gray-800 
                hover:bg-gray-200 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-200"
    >
      {isDark ? SunIcon : MoonIcon}
    </Button>
  );
}
