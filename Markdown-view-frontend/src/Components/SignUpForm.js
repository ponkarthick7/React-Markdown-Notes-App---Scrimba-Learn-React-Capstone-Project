import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {Form, Grid, Header } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import { FormStyles, ActionStyles, InputGroupStyles } from '../CustomStyles';
import UseCredentialValidationAndLoader from '../Hooks/UseCredentialValidationAndLoader';
import UsePasswordDisplayToggle from '../Hooks/UsePasswordDisplayToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SignUpForm(){

    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const {error, setError, validateEmail, determineRoute, renderLoadingAnimation, displayForm} = UseCredentialValidationAndLoader();
    const {displayPw, icon, toggleDisplayPw, displayConditions, validPassword} = UsePasswordDisplayToggle(signUpPassword);
    
    async function signUp(){
      try {
        validateEmail(signUpEmail);
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        console.log("User created successfully");
        determineRoute();
      }
      catch(e) {
        switch (e.code){
          case "auth/email-already-in-use": setError("There is already an account associated with this email address. Please log in."); break;
        }
      }
    }

    return (
      <>
        {displayForm && (
          <Grid className = 'login-form' style={FormStyles}>
          <Grid.Column>
            <Header as='h2' color='teal' textAlign='center'>
              <div className = "logo-and-header">Create a new account</div>
            </Header>
          <Form size='large' className = "form">
              <div style = {InputGroupStyles}>
                <label htmlFor = "email">Email</label>
                <input onChange = {(e) => setSignUpEmail(e.target.value)} value = {signUpEmail} className = "email-field" placeholder='Email' />
              </div>
              <div style = {InputGroupStyles}>
                <label htmlFor = "password">Password</label>
                <div className = "inputIconWrapper">
                  <input
                    className = "password-field"
                    value = {signUpPassword}
                    onChange = {(e) => setSignUpPassword(e.target.value)}
                    placeholder='Password'
                    type= {displayPw ? "text" : "password"} 
                  />
                  <FontAwesomeIcon className = "icon" icon = {icon} onClick = {toggleDisplayPw}/>
                </div>
              </div>
              <div className = "pwConditions">
                {displayConditions()}
              </div>
              <div style = {{color: "rgb(255,0,0)", marginTop: "7px", textAlign: "center"}}>{error}</div>
              <div style={ActionStyles}>
                <button disabled = {!validPassword} onClick = {signUp} className = "btn">
                  Sign Up
                </button>
                <div className = "message-box">Already have an account? <Link style = {{textDecoration: "none", fontWeight: "bold", color: "#000"}} to = '/login'><span className = "bold">Log in!</span></Link></div>
              </div>
          </Form>
          </Grid.Column>
        </Grid>
        )}
        {renderLoadingAnimation()}
      </>
    )
}