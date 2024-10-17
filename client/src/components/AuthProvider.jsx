import { createContext, useContext } from "react";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{

  const storeTokenInLS=(serverToken)=>{
     return localStorage.setItem("token",JSON.stringify({serverToken}))
    }
    const getTokenInLS=(getToken)=>{
      return localStorage.getItem(getToken)
     }

  return(
    <AuthContext.Provider value={{storeTokenInLS,getTokenInLS}} >
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    const AuthContextValue=useContext(AuthContext)
    return AuthContextValue
}