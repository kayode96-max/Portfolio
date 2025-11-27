'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode, useSyncExternalStore, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const defaultContext: ThemeContextType = {
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'dark',
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

// External store for tracking resolved theme
let resolvedThemeStore: 'light' | 'dark' = 'dark';
let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return resolvedThemeStore;
}

function getServerSnapshot() {
  return 'dark' as const;
}

function updateResolvedTheme(theme: 'light' | 'dark') {
  resolvedThemeStore = theme;
  listeners.forEach((listener) => listener());
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const savedTheme = localStorage.getItem('theme') as Theme;
  return savedTheme || 'system';
}

// Custom hook for safe mounted state
function useMounted() {
  const [mounted, setMounted] = useState(false);
  
  // Use useLayoutEffect to avoid flicker, with useEffect fallback for SSR
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  
  useIsomorphicLayoutEffect(() => {
    // This is an intentional sync state update to prevent hydration mismatch
    setMounted(true);
  }, []);
  
  return mounted;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const mounted = useMounted();
  const resolvedTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Initialize resolved theme on mount
  useEffect(() => {
    if (!mounted) return;
    const initialResolved = resolveTheme(theme);
    updateResolvedTheme(initialResolved);
  }, [mounted, theme]);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const currentTheme = resolveTheme(theme);
    root.classList.add(currentTheme);
    updateResolvedTheme(currentTheme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const newTheme = getSystemTheme();
      root.classList.add(newTheme);
      updateResolvedTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, theme]);

  // Always provide context, even when not mounted
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
