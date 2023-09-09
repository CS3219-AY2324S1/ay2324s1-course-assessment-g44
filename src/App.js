import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router,Route } from 'react-router-dom'

function App() {
  return (
      <div className="main">
        <Router>
          <h2 className="main-header">Peer Prep (Team 44)</h2>
          <div>
            <Route exact path='/create' component={Create} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Route exact path='/read' component={Read} />
          </div>
            <Route path='/update' component={Update} />
        </Router>
      </div>
  );
}

export default App;
