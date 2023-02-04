import React, { useState, useContext, createContext, useEffect} from "react"
import axios from "axios"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [account, setAccount] = useState("")

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const fetchUser = async (token) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/getCurrentUser`, config)

        setUser(data.user)
        
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    if(userInfo){
      //setUser(userInfo)
      fetchUser(userInfo)
    }
  }, [])
  

  return (
    <StateContext.Provider
      value={{
        user, setUser, account, setAccount
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)