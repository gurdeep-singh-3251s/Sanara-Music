import React from 'react'
import "./Login.css"
import { loginUrl } from './Spotify'
import logo from './sanora.png'


function Login() {
  return (
    <div className='login'>
      <div className="bg-img"></div>
      <div className="text">
        <img src={logo} alt="sanora" />
        <h2>Wanna Feel the Vibe - <br /> Listen Millions of Songs. <br />Free With Us </h2>
        <div></div>
        <div className="bottom">
        <a id='login-btn' href={loginUrl}>LOG IN</a>
        <p><input type="checkbox" name="" id="" />I have Read all the <a href="">Terms and Conditions</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login