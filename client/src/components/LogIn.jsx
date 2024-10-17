import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
// import { useAuth } from '../Auth/AuthProvider';

const LogInPage = () => {
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
        
        console.log(res.data);
      })

  }

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
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
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"

                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"

                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    LOgIn Now
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