import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';
// import { useAuth } from '../Auth/AuthProvider';

const LogInPage = () => {
  const navigate=useNavigate()
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const {storeTokenInLS}=useAuth()

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:7001/login", userLogin)
      .then((res) => {
        storeTokenInLS(res.data.token)
        setUserLogin(res.data)
        navigate('/file') 
        console.log(res.data);
      })

  }
  // const logOut=()=>{
  //   removeTokenLS('token')
  // }

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-imag">
                <img
                  src="./img/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"

                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"

                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit">
                    LogIn Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}

export default LogInPage