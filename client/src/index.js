import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import "bulma";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/store/reducer'
import { setAuthenticationHeader } from './components/utils/authenticate';
import requireAuth from './components/requireAuth';
import * as actionCreators from './components/store/creators/actionCreators';

// Components
import BaseLayout from './components/BaseLayout'
import LandingPage from './components/LandingPage'
import MyPartiesPage from './components/MyPartiesPage'
import ProfilePage from './components/ProfilePage'
import AboutPage from './components/AboutPage'
import LoginPage from './components/LoginPage';
import FindPartyPage from './components/FindPartyPage';
import Chat from './components/Chat/Chat'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const token = localStorage.getItem('jsonwebtoken');
setAuthenticationHeader(token)
if(token) {
  store.dispatch(actionCreators.userLogin(token))
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path = "/" component = {LandingPage} />
            <Route path = "/my-parties" component = {requireAuth(MyPartiesPage)} />
            <Route path = "/profile" component = {requireAuth(ProfilePage)} />
            <Route path = "/find-party" component = {FindPartyPage} />
            <Route path = "/about" component = {AboutPage} />
            <Route path = "/login" component = {LoginPage} />
            <Route path = "/party/:partyId" component = {requireAuth(Chat)} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);