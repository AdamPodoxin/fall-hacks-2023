import Button from './components/ButtonHero'
import logo from './assets/logo.png'
import './styles/App.css'

function App() {

  return (
    <>
      <div className="leaf-logo">
        <img src={logo} width={70} height={100} className="logo" alt="Hostas logo" />
      </div>
      <h1>Hosta</h1>
      <div className="card">
        <Button />
      </div>
      <p className="slogan">
        Helping refugees turn over a new leaf
      </p>
    </>
  )
}

export default App
