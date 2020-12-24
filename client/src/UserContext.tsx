import React, { useState , createContext, Dispatch} from 'react';
import { User } from './types';

export const UserContext = React.createContext<[User, Dispatch<User>]>([{} as User, () => {}]);

export const UserProvider = (props : any) =>
{
    const [user, setUser] = useState( {} as User);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}