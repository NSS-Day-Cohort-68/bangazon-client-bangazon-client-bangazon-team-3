import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile } from "../data/auth"
import { useRouter } from "next/router"
import { getUserStore } from "../data/stores.js"

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    const authRoutes = ["/login", "/register"]
    if (token) {
      localStorage.setItem("token", token)
      if (!authRoutes.includes(router.pathname)) {
        // get user profile
        getUserProfile()
          // returns profile data as response
          .then((profileData) => {
            // if profile data exists
            if (profileData) {
              // use that data to set profile
              setProfile(profileData)
              // invoke our getUserStore (if user has a store)
              return getUserStore() // Fetch user store after setting profile
            }
          })
          // if user has a store, store data returns as response
          .then((storeData) => {
            // set profile with prevProfile expanded to add store value to profile object
            setProfile((prevProfile) => ({ ...prevProfile, store: storeData }))
          })
      }
    }
  }, [token, router.pathname])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
