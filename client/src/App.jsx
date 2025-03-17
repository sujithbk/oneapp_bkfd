import React from 'react'
import  {BrowserRouter ,Routes ,Route, Link} from 'react-router-dom'
import Landing from './pages/Landing'

import Navbar from './components/Navbar'
import { ThemeProvider } from './theme-context'
import Form from './components/Form'
import Login from './components/Login'
import Home from './pages/Home'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/ProfileEdit'
import Describtion from './components/profile/Describtion'
import Links from './components/profile/Links'
import Professional from './components/profile/Professional'


function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Routes >
     <Route path='/' element={<Landing/>}/> 
     <Route path='/signup' element ={<Form/>}/>
     <Route path='/login' element ={<Login/>}/>
     <Route path='/home' element ={<Home/>}/>
     <Route path='/profile' element={<ProfileEdit/>}/>
     <Route path='/description' element={<Describtion/>}/>
     <Route path='/links' element={<Links/>}/>
     <Route path='/profession' element={<Professional/>}/>
     
    </Routes >
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App