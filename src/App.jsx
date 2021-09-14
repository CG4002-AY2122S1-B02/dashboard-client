import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Live from './components/live/Live';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Live />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
