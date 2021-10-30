import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { authUser } from './actions/auth';
import App from './App';
import store, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

const token = localStorage.authToken;

if (token) {
  console.log("User is logged-in [Token true]")
  authUser(token, store.dispatch);;
}
if (!localStorage.language) {
  localStorage.setItem("language", "EN");
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);