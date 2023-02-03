import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Instruction from "./pages/Instruction"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useStateContext } from "./context/ContextProvider"

const App = () => {
  const { setUser } = useStateContext()

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  //   if(userInfo){
  //     setUser(userInfo)
  //   }
  // }, [])
  
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;