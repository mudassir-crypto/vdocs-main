import React, { useState, useContext, createContext, useEffect} from "react"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [account, setAccount] = useState("")

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if(userInfo){
      setUser(userInfo)
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