import React, { createContext, useContext, useState, ReactNode } from 'react';

const StateContext = createContext<StateContextProps>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);