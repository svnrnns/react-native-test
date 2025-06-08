import LucideIcon from '@/lib/LucideIcon';
import { useColorScheme } from 'nativewind';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function AuthScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="h-screen w-screen bg-body flex items-center justify-center">
        <View className="flex flex-col gap-1.5 w-72">
          <Text className="text-3xl font-semibold text-heading">
            Welcome back
          </Text>
          <Text className="text-font">
            Sign in to continue to the application.
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholder="somoene@mail.com"
            keyboardType="email-address"
            className="w-full mt-6 bg-box text-heading placeholder:text-placeholder py-3 px-4 rounded-lg"
          />
          <TextInput
            autoCapitalize="none"
            placeholder="•••••••••"
            secureTextEntry={true}
            className="w-full mt-1.5 bg-box text-heading placeholder:text-placeholder py-3 px-4 rounded-lg"
          />
          <Pressable>
            <Text className="p-3 mt-6 leading-none rounded-lg text-center bg-main text-white font-medium">
              Sign in
            </Text>
          </Pressable>
          <Pressable onPress={() => toggleColorScheme()}>
            <View className="mt-6 flex gap-1.5 flex-row items-center justify-center">
              <LucideIcon
                name="Moon"
                className="size-5 color-info"
              />
              <Text className="text-info font-medium">Change Theme</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <StatusBar />
    </KeyboardAvoidingView>
  );
}
