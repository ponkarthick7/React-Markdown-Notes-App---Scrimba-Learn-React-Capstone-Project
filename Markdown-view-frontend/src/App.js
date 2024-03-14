import React, {useState, useEffect, useContext} from "react"
import {Routes, Route, useNavigate} from "react-router-dom"
import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm"
import Main from "./Main"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { LoggedInContext } from "./Context/AuthenticationProvider"
import AuthButtons from "./Components/AuthButtons"

export default function App(){
  // eslint-disable-next-line
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const {isLoggedIn, isSignedOut, toggleSignOutStatus} = useContext(LoggedInContext);

  useEffect(() => {
    const setup = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    })
    return setup;
  }, [])

  return (
    <>
      {(!isLoggedIn || isSignedOut) && <AuthButtons />}
      <Routes>
        <Route exact path = "/notes-app" element = {
          <Main currentUser = {user?.email} signOut = {() => {
            toggleSignOutStatus();
            navigate("/login");
          }}/>} 
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}