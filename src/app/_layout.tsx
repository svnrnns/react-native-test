import { ThemeProvider } from '@/styles/ThemeProvider';
import '../styles/tailwind.css';

import { SessionProvider } from '@/lib/session/provider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Stack
          initialRouteName="(main)"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="(main)" />
          <Stack.Screen name="auth" />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
