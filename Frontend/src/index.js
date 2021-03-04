import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import {BrowserRouter} from 'react-router-dom';
import  {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './Reducer/reducer'

const store = createStore(reducer);

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

