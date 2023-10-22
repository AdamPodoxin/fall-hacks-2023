import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import FormPage from './formPage.tsx'
// import Directory from './directory.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Directory /> */}
    <FormPage />
  </React.StrictMode>,
)
