import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import {BrowserRouter} from 'react-router-dom';
import  {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducer from './Reducer/reducer'
import thunk from 'redux-thunk'

const store = createStore(reducer,applyMiddleware(thunk));

axios.defaults.headers.authorization = localStorage.getItem("token");
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.authorization = token;
  return config;
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

