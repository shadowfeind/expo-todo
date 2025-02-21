import { Colors } from "@/constants/Colors";
import { createContext, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeColors = typeof Colors.light | typeof Colors.dark;

interface ThemeContextType {
  theme: ThemeColors;
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
}

type ThemeType = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Colors.light,
  colorScheme: "light",
  setColorScheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeType) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
