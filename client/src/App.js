import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
          <img className='logo-img' src='/img/meleehell.png' alt=''/>
        </div>
        <nav>
          <a className='nav-link' href='/'>Home</a>
          <a className='nav-link' href='/all-characters'>All Characters</a>
        </nav>
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
      <div className='footer'>
          <div className='bottom-nav'>
            <a className='bottom-nav-link' href=''>Git Hub</a>
          </div>
      </div>
    </div>
  );
}

export default App;
