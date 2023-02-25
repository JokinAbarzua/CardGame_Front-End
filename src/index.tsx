import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { environment } from "./environment"
import { getCurrentToken, getCurrentUser } from './User/userService';
import { updateSessionToken, updateSessionUser } from './User/userStore';

axios.defaults.baseURL = environment.backendUrl;
axios.defaults.headers.post['Content-Type'] = "application/json"
let currentToken = getCurrentToken();
axios.defaults.headers.common['Authorization'] = currentToken
let currentUser = getCurrentUser()

if (currentToken !== undefined && currentUser !== undefined){
  updateSessionToken(currentToken);
  updateSessionUser(currentUser)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
