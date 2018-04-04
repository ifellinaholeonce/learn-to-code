// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route } from 'react-router-dom';

import App from './App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Route to="/" render={(props) => <App {...props} />} />
  </BrowserRouter>,
  document.getElementById('react-root')
  );
