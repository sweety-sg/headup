import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// CSS
import './App.css';
import { BrowserRouter } from 'react-router-dom';

// axios.defaults.baseURL = 'http://localhost:8000/headup';
// axios.defaults.withCredentials = true
// axios.defaults.xsrfCookieName = 'arxivapp_csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

ReactDOM.render(
  <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);
