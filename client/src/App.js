import React from 'react'
import { Home, Navbar, Login, SignIn, About, ContactUs, Admin ,Shopkeeper,OTP} from './Components/AllComponents'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Shopkeeper' element={<Shopkeeper />} />
        <Route path='/OTP/:email' element={<OTP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App