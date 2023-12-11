import React, { createContext, useContext, useState, ReactNode } from "react";

interface StateContextProps {
  user: User;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextProps>({
  user: {} as User,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => useContext(StateContext);
