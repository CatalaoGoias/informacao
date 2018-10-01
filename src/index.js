import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import registerServiceWorker from './registerServiceWorker';

// Determine Environment --> Development or Production
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4741';
} else {
  // For Github Pages
  axios.defaults.baseURL = 'https://pure-peak-49729.herokuapp.com'
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
