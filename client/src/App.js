import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Characters from './components/Characters.js'
import SingleCharacter from './components/SingleCharacter.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Characters />
          </Route>

          <Route exact path="/character/:characterId" component={SingleCharacter} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
