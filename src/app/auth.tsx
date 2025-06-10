import LucideIcon from '@/lib/LucideIcon';
import { useSession } from '@/lib/session/provider';
import { useRouter } from 'expo-router';
import { setItemAsync } from 'expo-secure-store';
import { useColorScheme } from 'nativewind';
import { useCallback, useState } from 'react';
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
  const { setSession } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async () => {
    setLoading(true);
    const sampleSession = {
      email: 'someone@mail.com',
      name: 'Lasaña Friolera',
    };

    await setItemAsync('user', JSON.stringify(sampleSession));
    setSession(sampleSession);

    setLoading(false);
    router.replace('/(main)');
  }, [router, setSession]);

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
          <Pressable
            onPress={signIn}
            className={`${loading && 'pointer-events-none opacity-60'}`}
          >
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
