import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content flex">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/orders' element={<Order/>} />
          {/* Add a default route or 404 page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

const NotFound = () => {
  return <h1>404 - Not Found</h1>;
}

export default App
