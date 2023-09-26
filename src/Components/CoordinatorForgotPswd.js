import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { useFormik } from 'formik';
import { forgotPasswordScheme } from './Schema';

function CoordinatorForgotPswd() {

    const navigate=useNavigate();

    const onSubmit=(e)=>{


        axiosInstance.post("/forgotPwdCordinator",values)
        .then((response)=>{
            console.log(response);
            
            if (response.data.status===200) {
                toast.success("Updated Successfully")
                navigate("/coordinator_login")
            }else{
                toast.error("Failed... Check your email")
            }
        })
        .catch((err)=>{
            console.log('error',err);
            toast.error("Failed... Check your email")  
              })

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
        initialValues: {
            email: "",
            password: "",
          },
          validationSchema: forgotPasswordScheme,
          onSubmit,
          
    })

  return (
    <div>
        <Navbar/>
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Coordinator</h4>
            <h1 class="display-4 m-0">Update <span class="text-primary">Password</span></h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" onSubmit={handleSubmit}>
                        
                        <div class="control-group">
                            <input type="email" class="form-control p-4" value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" placeholder="Your Email" />
                            <p class="help-block text-danger"> {errors.email && touched.email && (<span className="err">{errors.email}</span>)}</p>
                        </div>
                        <div class="control-group">
                            <input type="password" class="form-control p-4" value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" placeholder="Password" />
                            <p class="help-block text-danger">{errors.password && touched.password && (<p className="err">{errors.password}</p>)}</p>
                        </div>
                        
                        <div>
                            <button class="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Update</button>
                        </div>
                        {/* <div class='d-flex justify-content-between'>
                            <p class='mt-2' >Don't have an Account? <Link to='/coordinator_signup' >SignIn</Link></p>
                            <p class='mt-2' ><Link to='/coordinator_signup' >Forgot Password</Link></p>

                        </div> */}
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

export default CoordinatorForgotPswd
