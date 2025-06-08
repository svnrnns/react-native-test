import { useSession } from '@/lib/session/provider';
import { Redirect } from 'expo-router';
import { PropsWithChildren } from 'react';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { session } = useSession();

  if (!session) return <Redirect href="/auth" />;

  return children;
}
