import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Configuracao from './Pages/Configuracao';
import Game from './Pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ Game } />
      <Route exact path="/configuracao" component={ Configuracao } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
