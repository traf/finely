import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect } from 'react';

// queries
import { useQueryUserData } from '../queries/useQueryUserData';
import { useMutationLogout } from '../queries/useMutationLogout';

interface UserContextData {
  walletAddress: string;
  logout: () => void;
}

const initialData: UserContextData = {
  walletAddress: null,
  logout: () => null
};

const UserContext = createContext<UserContextData>(initialData);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: userData, isLoading: isUserDataLoading } = useQueryUserData();

  const logoutMutation = useMutationLogout();

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
    router.push(process.env.NEXT_PUBLIC_MARKETING_SITE_URL);
  }, []);

  useEffect(() => {
    if (isUserDataLoading) {
      return;
    }

    if (!userData?.walletAddress) {
      logout();
    }
  }, [userData?.walletAddress, isUserDataLoading]);

  return (
    <UserContext.Provider value={{ walletAddress: userData?.walletAddress, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return useContext(UserContext);
}
