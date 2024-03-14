import React, {createContext, useState, useEffect} from "react"

const LoggedInContext = createContext();

export default function LoggedInContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const toggleLoginStatus = () => setIsLoggedIn(prevStatus => !prevStatus);
  const toggleSignOutStatus = () => setIsSignedOut(true);

  useEffect(() => {
    // if the user logs in, and then decides to sign out, reset the two values so when a new user 
      // logs in, the buttons don't remain on the screen
    if (isSignedOut){
      setIsLoggedIn(false);
      setIsSignedOut(false);
    }
  }, [isSignedOut])

  return (
    <LoggedInContext.Provider value = {{isLoggedIn, toggleLoginStatus, isSignedOut, toggleSignOutStatus}}>
        {children}
    </LoggedInContext.Provider>
  )
}

export {LoggedInContext}
