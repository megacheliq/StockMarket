class StateContextProps {
    public user: User | null;
    public token: string | null;
    public setUser: (user: User) => void;
    public setToken: (token: string | null) => void;
  
    constructor(
      user: User | null,
      token: string | null,
      setUser: (user: User) => void,
      setToken: (token: string | null) => void
    ) {
      this.user = user;
      this.token = token;
      this.setUser = setUser;
      this.setToken = setToken;
    }
}