import AuthGuard from '@/lib/guards/AuthGuard';
import { Tabs } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="streaks" />
        <Tabs.Screen name="add-habit" />
      </Tabs>
    </AuthGuard>
  );
}
