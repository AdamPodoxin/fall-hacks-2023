import Button from './components/ButtonHero'
import logo from './assets/logo.png'
import './styles/App.css'
import { login } from './lib/api/user';
import { Owner } from './lib/api/owner';
import { useState } from 'react';
import { Refugee } from './lib/api/refugee';

function App() {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [refugee, setRefugee] = useState<Refugee | null>(null);

  const [showSignIn, setShowSignIn] = useState(false);

  const logInFlow = async () => {
    const loginResult = await login();

    if (loginResult === null) {
      setShowSignIn(true);
    }
    else if (loginResult?.userType === "owner") {
      setOwner(loginResult.user);
    } else {
      setRefugee(loginResult.user)
    }
  }

  return (
    <>
      {showSignIn && <p style={{ color: "black" }}>Sign In</p>}

      {!showSignIn && <>
        <div>
          <a href="" target="_blank">
            <img src={logo} width={60} height={100} className="logo" alt="Hostas logo" />
          </a>
        </div>
        <h1>Hosta</h1>
        <div className="card">
          <Button onClick={logInFlow} />
        </div>
        <p className="slogan">
          Helping refugees turn over a new leaf
        </p>
      </>}

    </>
  )
}

export default App
