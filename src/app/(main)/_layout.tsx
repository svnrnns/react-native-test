import MainTabBar from '@/features/main/MainTabBar';
import AuthGuard from '@/lib/guards/AuthGuard';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <View className="flex-1">
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
      </View>
      <MainTabBar />
    </AuthGuard>
  );
}
