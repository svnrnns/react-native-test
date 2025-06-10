import { getItemAsync } from 'expo-secure-store';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface Session {
  email: string;
  name: string;
}
type AuthType = {
  session: Session | undefined;
  isLoading: boolean;
  setSession: (session: Session) => void;
};

const SessionContext = createContext<AuthType | undefined>(undefined);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      // await deleteItemAsync('user');
      setIsLoading(true);
      const storeSession = await getItemAsync('user');
      if (storeSession) setSession(JSON.parse(storeSession) as Session);
      setIsLoading(false);
    };

    fetch();
  }, []);

  const authValue = useMemo<AuthType>(() => {
    return {
      session,
      isLoading,
      setSession,
    };
  }, [session, isLoading]);

  return (
    <SessionContext.Provider value={authValue}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession must be inside a SessionContext');
  return session;
}
