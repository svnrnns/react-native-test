import { createContext, PropsWithChildren, useContext } from 'react';

type AuthType = {
  session: string | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const SessionContext = createContext<AuthType | undefined>(undefined);

export function SessionProvider({ children }: PropsWithChildren) {
  const sampleType: AuthType = {
    session: null,
    isLoading: false,
    signIn: () => {},
    signOut: () => {},
  };

  return (
    <SessionContext.Provider value={sampleType}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession must be inside a SessionContext');
  return session;
}
