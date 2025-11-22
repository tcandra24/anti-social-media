"use client";

import { createContext, useState } from "react";

type User = {
  email: string;
  name: string;
  avatar_url: string;
};

type UserProvider = {
  user: User;
  setUser: (payload: User) => void;
};

export const UserProviderContext = createContext<UserProvider>({
  user: {
    email: "",
    name: "",
    avatar_url: "",
  },
  setUser: () => {},
});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    avatar_url: "",
  });

  return <UserProviderContext.Provider value={{ user, setUser }}>{children}</UserProviderContext.Provider>;
}
