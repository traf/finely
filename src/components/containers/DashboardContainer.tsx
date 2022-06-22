import { UserContextProvider } from '@root/src/context/UserContext';

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
