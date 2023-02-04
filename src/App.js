import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Instruction from "./pages/Instruction"
import Register from "./pages/Register"
import Login from "./pages/Login"
import AdDashboard from "./pages/admin/Dashboard"
import AdUser from "./pages/admin/User"


const App = () => {
  
  return (
    <div className='bg-gray-800 h-full min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/instruction" element={<Instruction/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin/dashboard" element={<AdDashboard/>} exact />
          <Route path="/admin/user/:userId" element={<AdUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
