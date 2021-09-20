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

function App() {
  const [account, setAccount] = useState({
    "master": "Master xxxx",
    "loggedIn": false,
    "user1": "",
    "user2": "",
    "user3": ""
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
    const x = { "loggedIn": false }
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
          <Route path="/analytics">
          </Route>
          <Route path="/">
            <Live account={account} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
