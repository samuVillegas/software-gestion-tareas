import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";


// Import pages
import Home from '../pages/Home';
import Code from '../pages/CodeVerification'
import Task from '../pages/TaskList';
import Register from '../pages/RegisterUser';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/code" component={Code} />
        <Route exact path="/TaskList" component={Task} />
        <Route exact path="/registerUser" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
