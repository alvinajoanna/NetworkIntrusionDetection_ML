import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/globals.css';
import App from './App';
import LandingPage from './landing';
import Login from "./login";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<LandingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
