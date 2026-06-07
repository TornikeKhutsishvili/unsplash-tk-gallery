import { useAppDispatch, useAppSelector } from "./useHooks";
import { setTheme, toggleTheme } from "../../features/store/slice/themeSlice";
import type { ThemeMode } from "../../core/interfaces/store.interfaces";

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    isDark: mode === 'dark',
    toggle: () => dispatch(toggleTheme()),
    setMode: (m: ThemeMode) => dispatch(setTheme(m)),
  };
}