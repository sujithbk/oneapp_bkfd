import React from 'react'
import  {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Landing from './pages/Landing'

import Navbar from './components/Navbar'
import { ThemeProvider } from './theme-context'
import Form from './components/Form'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes >
     <Route path='/' element={<Landing/>}/> 
     <Route path='/signup' element ={<Form/>}/>
     <Route path='/login' element ={<Login/>}/>
     <Route path='/home' element ={<Home/>}/>
    </Routes >
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App