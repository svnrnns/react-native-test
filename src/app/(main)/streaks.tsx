import MainTabBar from '@/features/main/MainTabBar';
import { SafeAreaView, Text, View } from 'react-native';

export default function StreaksScreen() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        className="bg-body"
      >
        <View className="flex-1 bg-indigo-50 flex items-center justify-center">
          <Text className="">Streaks</Text>
        </View>
      </SafeAreaView>
      <MainTabBar />
    </>
  );
}
