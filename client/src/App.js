import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Characters from './components/Characters.js'
import SingleCharacter from './components/SingleCharacter.js'
import TierList from './components/TierList'

import CreateTier from './components/CreateTier.js'

function App() {
  return (
    <div className="App">
      <navbar className='navbar'>
        <div className='logo'>
          <img src='' alt=''/>
        </div>
      </navbar>
      <Router>
        <Switch>
          <Route exact path="/">
            <TierList/>
          </Route>
          <Route exact path="/all-characters" component={Characters}/>
          <Route exact path="/character/:characterId" component={SingleCharacter} />
          <Route exact path="/create-tier" component={CreateTier} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
