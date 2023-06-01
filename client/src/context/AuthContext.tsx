import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { signIn } from "../api/users";
import { User } from "../api/users/typings";

export interface AuthState {
  user?: User;
  logIn: (username: string, password: string) => Promise<User | undefined>;
  logOut: () => void;
}

const AuthContext = createContext<AuthState | null>({
  logIn: (username: string, password: string) => Promise.resolve(undefined),
  logOut: () => Promise.resolve(),
});

export const useAuth = (): AuthState | null => {
  return useContext(AuthContext);
};

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem("c_user");
    setUser(localUser ? JSON.parse(localUser) : undefined);
    setLoading(false);
  }, []);

  const logIn = async (username: string, password: string) => {
    const user = await signIn({ username, password });
    setUser(user);
    return user;
  };

  const logOut = () => {
    localStorage.removeItem("c_user");
    window.location.reload();
  };

  const value: AuthState = {
    user,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
