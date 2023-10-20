import React from "react";
import { User, emptyUser } from "./classes/User";

interface UserProviderProps {
    user: User;
    setUser: Function;
}

export const UserContext = React.createContext<UserProviderProps>({user: emptyUser, setUser: () => {}});
