import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Home } from './Home';
import GroundStation from './GroundStation';
import Rules from './Rules';
import Sat1 from './Sat1';
import Sat2 from './Sat2';

function App() {
  return (
    <div>    
      <Router>
        <div>
          <NavBar />
          <div>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/Sat1'>
                <Sat1 />
              </Route>
              <Route exact path='/Sat2'>
                <Sat2 />
              </Route>
              <Router exact path='/ground-station'>
                <GroundStation />
              </Router>
              <Router exact path='/rules'>
                <Rules />
              </Router>
            </Switch>
          </div>
        </div>
      </Router > 
    </div>
  );
}

export default App;
