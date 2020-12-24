import React, {useState, useContext} from 'react';
import GoogleLogin from 'react-google-login';
import {UserContext} from '../UserContext';
import { User } from '../types';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav()
{
    const [user, setUser] = useContext(UserContext);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");

    const responseGoogle = (response : any) => {
        setName(response.profileObj.name);
        setUrl(response.profileObj.imageUrl);
        setEmail(response.profileObj.email);
        setUser({
            email : response.profileObj.email, 
            name: response.profileObj.name,
            imageUrl: response.profileObj.imageUrl
        } as User);
    }

    const navStyle ={
        color : 'white'
        }

    return(
        <nav>
            <h3>i-Hire</h3>
            <ul className='nav-links'>
                <Link to="/" style={navStyle}>
                    <li>Home</li>
                </Link>
                <Link to="/users" style={navStyle}>
                    <li>Users</li>
                </Link>
                <li>
                    {!(user.email) ? 
                        <GoogleLogin
                        clientId="196080040047-ekhqmbbviun44vk3i4ldifje55ml1rts.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}/>
                        : <Link to="/profile" style={navStyle}>Profile</Link>
                }
                </li>
            </ul>
        </nav>
    );
}