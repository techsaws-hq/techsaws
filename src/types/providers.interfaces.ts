export type ThemeContextType = {
  lightTheme: boolean;
  darkTheme: boolean;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
};