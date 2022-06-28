import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Configuracao from './Pages/Configuracao';

export default function App() {
  return (
    <Switch>
      <Route exact path="/configuracao" component={ Configuracao } />
      <Route exact path="/" component={ Login } />
      {/* <Route path="/carteira" component={ Wallet } /> */}
    </Switch>
  );
}
