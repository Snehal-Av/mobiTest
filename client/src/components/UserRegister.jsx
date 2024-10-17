import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthProvider'
// import { useAuth } from '../Auth/AuthProvider'


const Register = () => {


  const [user,setUser]=useState({
    email:"",
    phone:"",

  })

  const {storeTokenInLS}=useAuth()

 const handleInput=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  
  setUser({...user,[name]:value})
  console.log(user);

  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
       await axios.post("http://localhost:7001/register",user)
       
        .then((response)=>{
          setUser(response.data)
          storeTokenInLS(response.data.token)
        
          console.log(response);
          // navigate('/login')
        })
      }
      
      catch (error) {
        console.log(error.message);
      }
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
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
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

export default Register 