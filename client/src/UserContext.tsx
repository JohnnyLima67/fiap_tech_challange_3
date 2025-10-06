// UserContext.tsx
import { createContext, useState } from "react";

interface IUserInfo {
  username?: string;
  id?: string;
  role?: string;
  // adicione outras propriedades conforme necessário
}

interface IUserContext {
  userInfo: IUserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
}

export const UserContext = createContext<IUserContext>({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}