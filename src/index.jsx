import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

/** Pages */
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Error } from './pages/Error';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/dashboard/:id" index element={<Home/>}/>
      {/* <Route exact path="/dashboard/:id" index element={<Dashboard/>}/> */}
      <Route exact path="*" element={<Error />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
