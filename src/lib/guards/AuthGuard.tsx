import { useSession } from '@/lib/session/provider';
import { Redirect } from 'expo-router';
import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { session, isLoading } = useSession();

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (!session) return <Redirect href="/auth" />;

  return children;
}
