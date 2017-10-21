import React from 'react';
import { Route } from 'react-router-dom';
import Page from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';


const App = () => (
  <div>
    <Route path="/" exact component={Page} />
    <Route path="/login" exact component={LoginPage} />
  </div>
);

export default App;
