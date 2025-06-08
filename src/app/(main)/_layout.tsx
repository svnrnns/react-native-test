import AuthGuard from '@/lib/guards/AuthGuard';
import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Stack
        initialRouteName="index"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </AuthGuard>
  );
}
