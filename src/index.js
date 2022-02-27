import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  // once passed the store object, we'll be able to give that redux store context to the rest of the app
  // So, we can dispatch actions to that store or can pull values off of the store and into our Component.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);