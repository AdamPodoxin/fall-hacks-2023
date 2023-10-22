import Navbar from './components/Navbar'
import Button from './components/ButtonHero'
import './styles/App.css'
import './styles/directory.css'

function Directory() {

  return (
    <>
        <Navbar />
        <div className='options'>
            <div className='button-indi'>
                <Button children={"Refugee"}/>
            </div>
            <div className='button-indi'>
                <Button children={"Host"} />
            </div>
        </div>
    </>
  )
}

export default Directory
