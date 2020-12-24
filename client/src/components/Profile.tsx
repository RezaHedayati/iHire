import React, { useContext } from 'react';
import '../App.css';
import {UserContext} from '../UserContext';

export default function Profile()
{
    const [user, setUser] = useContext(UserContext);

    return(<div>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <img src={user.imageUrl}/>
    </div>);
}