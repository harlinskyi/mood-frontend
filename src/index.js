import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useStore } from 'react-redux';
import { authUser } from './actions/auth';
import App from './App';
import store from './store';

const token = localStorage.authToken;

if(token) {
  authUser(token, store.dispatch);
  //store.dispatch({type: REGISTER_AUTH});
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);