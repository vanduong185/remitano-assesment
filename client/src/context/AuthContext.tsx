import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { signIn } from "../api/users";
import { Token, User } from "../api/users/typings";

export interface AuthState {
  user?: User;
  token?: Token;
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
  const [token, setToken] = useState<Token>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLocal = localStorage.getItem("c_user");
    const userData = userLocal ? JSON.parse(userLocal) : undefined;
    if (userData) {
      setUser(userData.user);
      setToken(userData.token);
    }
    setLoading(false);
  }, []);

  const logIn = async (username: string, password: string) => {
    const response = await signIn({ username, password });
    if (response) {
      localStorage.setItem("c_user", JSON.stringify(response));
      const { user, token } = response;
      setUser(user);
      setToken(token);
      return user;
    }
  };

  const logOut = () => {
    localStorage.removeItem("c_user");
    window.location.reload();
  };

  const value: AuthState = {
    user,
    token,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
