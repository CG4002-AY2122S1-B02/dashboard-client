import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Live from './components/live/Live';
import Account from './components/account/Account';
import { useState } from 'react';
import { PathLogin, PathCreateUsers } from './config';
import Test from './components/test/Test';
import OfflineAnalytics from './components/offlineAnalytics/OfflineAnalytics';

function App() {
  const [account, setAccount] = useState({
    "master": "CG4002",
    "loggedIn": true,
    "user1": "Jerry",
    "user2": "X2",
    "user3": "X3"
  })

  const login = (master, password) => {
    const payload = {
      "account_name": master,
      "password": password
    }

    fetch(PathLogin, {
      method: "post",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then((r) => {
      if (r.status === 200) {
        const x = { "loggedIn": true, "master": master }
        setAccount(a => ({ ...a, ...x }))
      } else {
        console.log(r.body.message)
      }
    })
  }

  const logout = () => {
    const x = { "loggedIn": false, "master": "", "user1": "", "user2": "", "user3": "" }
    setAccount(a => ({ ...a, ...x }))
  }

  const setUsers = (user1, user2, user3) => {
    if (user1 === user2 || user2 === user3 || user1 === user3) {
      console.log("each sensor must be worn by a unique user")
      return
    }

    const payload = {
      "account_name": account.master,
      "username_1": user1,
      "username_2": user2,
      "username_3": user3,
      "profile_url_1": "",
      "profile_url_2": "",
      "profile_url_3": "",
    }

    fetch(PathCreateUsers, {
      method: "post",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then((r) => {
      if (r.status === 200) {
        console.log(r.body)
        const x = { "user1": user1, "user2": user2, "user3": user3 }
        setAccount(a => ({ ...a, ...x }))
      } else {
        console.log(r.body.message)
      }
    })
  }

  const accountOperations = {
    "logout": logout,
    "login": login,
    "setUsers": setUsers,
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/account">
            <Account account={account} operations={accountOperations} />
          </Route>
          <Route path="/test">
            <Test account={account} />
          </Route>
          <Route path="/offline">
            <div className="scroll">
              <OfflineAnalytics account={account} />
            </div>
          </Route>
          <Route path="/">
          </Route>
        </Switch>
        <Live account={account} />
      </Router>
    </div>
  )
}

export default App;
