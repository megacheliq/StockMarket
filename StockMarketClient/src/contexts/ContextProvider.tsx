import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    
}

interface StateContextProps {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextProps>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
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