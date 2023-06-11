import React, { useState } from 'react';
import './LoginScreen.css';
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        {/* https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png */}
        <img
          className='loginScreen__logo'
          src='https://th.bing.com/th/id/R.2ea85d7448475a744c1485c2eac3d3d1?rik=LOSTtarBPEnY%2fw&riu=http%3a%2f%2fwww.freepnglogos.com%2fuploads%2fnetflix-logo-0.png&ehk=PaZLUHaWmwAMEzdIDx7zGpBu053ZpXipTljxBidJnfU%3d&risl=&pid=ImgRaw&r=0'
          alt=''
        />
        <button onClick={() => setSignIn(true)} className='loginScreen__button'>Sign In</button>

        <div className='loginScreen__gradient' />
      </div>

      <div className='loginScreen__body'>

        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited films, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className='loginScreen__input'>
              <form>
                <input type='email' placeholder='Email Address' />
                <button onClick={() => setSignIn(true)}>GET STARTED</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginScreen