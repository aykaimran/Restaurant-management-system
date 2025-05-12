import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Navbar from './components/navbar/Navbar'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ReserveTable from './components/Reservation/ReserveTable' // Add this import

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/reserve-table' element={<ReserveTable />} /> {/* Add this route */}
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App