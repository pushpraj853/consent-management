export const themeConfig = {
  base: "base-ui",
  baseColor: "zinc",
  radius: "0.625rem",
  font: {
    sans: "Inter Variable",
    heading: "Inter Variable",
  },
  iconLibrary: "lucide",
  menuAccent: "subtle",
  menuColor: "default",
  defaultTheme: "light",
  enableSystem: false,
  showThemeToggle: false,
} as const;

export type ThemeConfig = typeof themeConfig;
