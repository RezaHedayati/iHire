import React, {useState, useContext} from 'react';
import GoogleLogin from 'react-google-login';
import {UserContext} from '../UserContext';
import { User } from '../types';

function Header(){
    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <h3 className="text-capitalise text-center">
                Welcome {user.name}...
            </h3>
        </div>);
}

export default Header;