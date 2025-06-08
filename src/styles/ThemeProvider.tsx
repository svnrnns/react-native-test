import { useColorScheme } from 'nativewind';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { View } from 'react-native';
import { dark, light, themes } from './themes';

const ThemeContext = createContext<Record<string, string>>({});

export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const selectedTheme = themes[colorScheme ?? 'light'] ?? themes['light'];
  const variables = useMemo(() => {
    if (colorScheme === 'light') return light;
    if (colorScheme === 'dark') return dark;
    return light;
  }, [colorScheme]);
  return (
    <ThemeContext.Provider value={variables}>
      <View
        style={[selectedTheme, { flex: 1 }]}
        className="flex-1"
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useThemeVariables() {
  const variables = useContext(ThemeContext);
  if (!variables)
    throw new Error('useThemeVariables must be inside a ThemeContext');
  return variables;
}
