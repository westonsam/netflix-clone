import React, { useRef } from 'react';
import "./SignUpScreen.css";
import { auth } from '../firebase-handler';

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser)
    })
    .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword (
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser)
    }).catch((error) => alert(error.message));
  };


  return (
    <div className='signUpScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} type='email' placeholder='Email' />
            <input ref={passwordRef} type='password' placeholder='password' />
            <button type='submit' onClick={signIn}>Sign In</button>

            <h4>
            <span className='signUpScreen__grey'>New to Netflix? </span> 
            <span className='signUpScreen__link' onClick={register}>Sign Up Now</span>
            </h4>
        </form>
    </div>
  )
}

export default SignUpScreen