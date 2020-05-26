import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.scss'
import Characters from './components/Characters.js'
import SingleCharacter from './components/SingleCharacter.js'
import TierList from './components/TierList'
import CreateCharacter from './components/CreateCharacter'
import AdminCharacters from './components/AdminCharacters'

import CreateTier from './components/CreateTier.js'
import AdminSingleCharacter from './components/AdminSingleCharacter'
import AdminTierList from './components/AdminTierList'

function App() {
  return (
    <div className="App">

      <Router>
        <div className='navbar'>
          <div className='logo'>
            <img className='logo-img' src='/img/smash.png' alt='' />
          </div>
          <nav>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/all-characters'>All Characters</Link>
          </nav>
        </div>
        <div className='content'>
          <div className='spacer'></div>
        <Switch>
          <Route exact path="/">
            <TierList />
          </Route>
          <Route exact path="/all-characters" component={Characters} />
          <Route exact path="/character/:characterId" component={SingleCharacter} />
          <Route exact path="/admin-create-tier" component={CreateTier} />
          <Route exact path="/admin-tier-list" component={AdminTierList} />
          <Route exact path="/admin-create-character" component={CreateCharacter}/>
          <Route exact path="/admin-characters" component={AdminCharacters}/>
          <Route exact path="/admin-character/:characterId" component={AdminSingleCharacter}/>


        </Switch>
        </div>
        
        <div className='footer'>
          <div className='bottom-nav'>
            <a className='bottom-nav-link' href='https://github.com/greattechpk'>Git Hub</a>
          </div>
        </div>

      </Router>
    </div>

  );
}

export default App;
