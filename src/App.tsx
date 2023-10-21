import Button  from './components/ButtonHero'
import logo from './assets/logo.png'
import './styles/App.css'

function App() {

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={logo} width={200} height={200} className="logo" alt="Hostas logo" />
        </a>
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
