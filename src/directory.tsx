import Navbar from './components/Navbar'
import Button from './components/ButtonHero'
import { HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import './styles/App.css'
import './styles/directory.css'

function Directory() {

  return (
    <>
        <Navbar />
        <div className='main-text-wrapper'>
          <h1 className='main-text'>
            Please select your user type
          </h1>
        </div>
        <div className='options'>
            <div className='button-indi'>
              <Button>
                <div className='icons'>
                  <PersonIcon />
                </div>
                {"Refugee"}
              </Button>
            </div>
            <div className='button-indi'>
              <Button>
                <div className='icons'>
                  <HomeIcon scale={20}/>
                </div>
                {"Owner"}
              </Button>
            </div>
        </div>
    </>
  )
}

export default Directory
