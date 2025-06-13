import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StreaksScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      className="bg-body"
      edges={['top']}
    >
      <View className="flex-1 bg-indigo-50 flex items-center justify-center">
        <Text className="">Streaks</Text>
      </View>
    </SafeAreaView>
  );
}
