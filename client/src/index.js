import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import reportWebVitals from './reportWebVitals';
import "bulma";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// the createStore component is needed in order to create the Central Store
import { createStore } from 'redux';
// the Provider component makes the redux store available to any nested component
import { Provider } from 'react-redux';
// the reducer receives actions, then updates the application state
import reducer from './components/store/reducer'
import { setAuthenticationHeader } from './components/utils/authenticate';
import requireAuth from './components/requireAuth';
import * as actionCreators from './components/store/creators/actionCreators';
import BaseLayout from './components/BaseLayout'
import LandingPage from './components/LandingPage'
import MyPartiesPage from './components/MyPartiesPage'
import ProfilePage from './components/ProfilePage'
import GamesPage from './components/GamesPage'
import SearchPage from './components/SearchPage'
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

// creates the Central Store (which stores the entire application state)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('jsonwebtoken');
setAuthenticationHeader(token)

// perform a dispatch to change the global state based on the token
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
            <Route path = "/games" component = {GamesPage} />
            <Route path = "/about" component = {SearchPage} />
            <Route path = "/login" component = {LoginPage} />
            <Route path = "/registration" component = {RegistrationPage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
