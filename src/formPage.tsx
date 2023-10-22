import Navbar from './components/Navbar'
import Form from './components/Form'
import Button from './components/ButtonHero'
import './styles/App.css'

function FormPage() {

  return (
    <>
      <Navbar />
      <Form />
      <Button>
        {"Submit"}
      </Button>
    </>
  )
}

export default FormPage
