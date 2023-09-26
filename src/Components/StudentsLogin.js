import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../baseUrl'


function StudentsLogin() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate=useNavigate();

    const doLogin=(e)=>{
        e.preventDefault();

        const values={email:email,password:password}

        axiosInstance.post("/studentlogin",values)
        .then((response)=>{
            
            if (response.status==200) {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("studentId", response.data.user._id );
                toast.success("Loggedin Successfully")
                navigate("/student_home")
                console.log(response.data.user._id);
            } else{
                toast.error("Login Failed... Check your email/password")  

            }
        })
        .catch((err)=>{
            console.log('error',err);
            toast.error("Login Failed... Check your email/password")  
              })

    }
  return (
    <div>
        <Navbar/>
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Login</h4>
            <h1 class="display-4 m-0">Student <span class="text-primary">Login</span></h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" onSubmit={doLogin}>
                        
                        <div class="control-group">
                            <input type="email" class="form-control p-4" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="password" class="form-control p-4" id="subject" placeholder="Password" required="required" data-validation-required-message="Please enter a subject" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            <p class="help-block text-danger"></p>
                        </div>
                        
                        <div>
                            <button class="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Login</button>
                        </div>
                        <div class='d-flex justify-content-between'>
                        <p class='mt-2' >Don't have an Account? <Link to='/student_signup' >SignIn</Link></p>
                        <p class='' ><Link to='/student_forgot_password' >Forgot Password</Link></p>
                        </div>
                        

                    </form>
                </div>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default StudentsLogin
