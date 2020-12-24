import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Candidates from './components/Candidates';
import Profile from './components/Profile';
import Nav from './components/Nav';
import './App.css';
import {UserProvider} from './UserContext';
import Users from './components/Users';

export default function App()
{
  return (
    <UserProvider>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact>
              <Candidates />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}