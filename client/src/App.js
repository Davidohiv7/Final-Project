import React from 'react';
import NavBar from './Views/NavBar/NavBar'
import Home from './Views/Home/Home'

import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route
        path='/'
        render={() => <NavBar/>}
      />

      <Route
        exact path='/'
        render={() => <Home/>}
      />

    </div>
  );
}

export default App;
