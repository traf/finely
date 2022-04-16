import { useCallback, useEffect, useMemo, useState } from 'react';
import { lightMode, darkMode } from '@root/stitches.config';

type ThemeMode = 'light' | 'dark';

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const storedTheme = localStorage.getItem('theme') as ThemeMode;
    return storedTheme ? storedTheme : 'dark';
  });

  const themeClassName = useMemo(() => {
    return theme === 'light' ? lightMode : darkMode;
  }, [theme]);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setTheme(mode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', mode);
      }
    },
    [setTheme]
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? lightMode : darkMode);
    root.classList.add(theme === 'dark' ? darkMode : lightMode);
  }, [theme, themeClassName]);

  return { theme, setThemeMode, themeClassName };
}
