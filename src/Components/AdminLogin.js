import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let mail='admin';
    let pass='admin123'

    let navigate=useNavigate();

    const doLogin = (e) => {
        e.preventDefault();

        // const values={email: email, password: password}
        // console.log(values);
        if (mail==email && pass==password) {
            toast.success('Loggedin Successfully')
            localStorage.setItem('admin',1)
            navigate('/admin_home')
        }else{
            toast.error('Username or Password is incorrect')
        }
      };

  return (
    <div>
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-2 pt-5">
            <h4 class="text-secondary mb-3">Login</h4>
            <h1 class="display-4 m-0">Admin <span class="text-primary">Login</span></h1>
            
        </div>
        <div class=" flex-wrap m-n1 m-auto text-center pb-5">
                        {/* <Link to='/' class="btn btn-outline-primary m-1">Home</Link> */}
                    </div>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <form  onSubmit={doLogin} >
                        
                        <div class="control-group">
                            <input type="text" class="form-control p-4" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="password" class="form-control p-4" id="subject" placeholder="Password" required="required" data-validation-required-message="Please enter a subject" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            <p class="help-block text-danger"></p>
                        </div>
                        
                        <div>
                            <button class="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div class="col-12 mb-n2 p-0">
                <iframe style="width: 100%; height: 500px;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div> */}
        </div>
    </div>
    </div>
  )
}

export default AdminLogin
