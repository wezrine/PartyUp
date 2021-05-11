import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import BaseLayout from './components/BaseLayout'
import LandingPage from './components/LandingPage'
import PartiesPage from './components/PartiesPage'
import ProfilePage from './components/ProfilePage'
import GamesPage from './components/GamesPage'
import SearchPage from './components/SearchPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseLayout>
        <Route exact path = "/" component = {LandingPage} />
        <Route path = "/parties" component = {PartiesPage} />
        <Route path = "/profile" component = {ProfilePage} />
        <Route path = "/games" component = {GamesPage} />
        <Route path = "/search" component = {SearchPage} />
      </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
