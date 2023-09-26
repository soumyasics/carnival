import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { VolunteerRegSchema } from './Schema';

function VolunteerSignin() {

    const navigate= useNavigate();


    const onSubmit = (e) =>{
        // e.preventDefault();
          console.log('hi');
          axiosInstance.post('/vounteersRegistration',values)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            if (res.data.status==200) {
              toast.success("Registration Successful")
              navigate('/volunteer_login')
            }else{
              toast.error("Registration Failed")
      
            }
          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Registration Failed")
      
          })
        }
      
        const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
          useFormik({
              initialValues: {
                  name: "",
                  email: "",
                  password: "",
                  contact: "",
                  aadhar: "",
                },
                validationSchema: VolunteerRegSchema,
                onSubmit,
                
          })

  return (
    <div>
      <Navbar/>
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Signup</h4>
            <h1 class="display-4 m-0">Volunteer <span class="text-primary">Signup</span></h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 mb-5">
                <div class="contact-form">
                    <div id="success"></div>
                    <form onSubmit={handleSubmit}>
                        <div class="control-group">
                            <input type="text" class="form-control p-4" value={values.name} onChange={handleChange} onBlur={handleBlur} id='name' placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
                            <p class="help-block text-danger">{errors.name && touched.name && (<span className="err">{errors.name}</span>)}</p>
                        </div>
                        <div class="control-group">
                            <input type="email" class="form-control p-4" value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                            <p class="help-block text-danger">{errors.email && touched.email && (<span className="err">{errors.email}</span>)}</p>
                        </div>
                        <div class="control-group">
                            <input type="number" class="form-control p-4" value={values.contact} onChange={handleChange} onBlur={handleBlur} id='contact' placeholder="Contact" required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger">{errors.contact && touched.contact && (<span className="err">{errors.contact}</span>)}</p>

                        </div>
                        <div class="control-group">
                            <input type="number" class="form-control p-4" value={values.aadhar} onChange={handleChange} onBlur={handleBlur} id='aadhar' placeholder="Aadhar Number" required="required"  />
                            <p class="help-block text-danger">{errors.aadhar && touched.aadhar && (<span className="err">{errors.aadhar}</span>)}</p>

                        </div>
                        <div class="control-group">
                            <input type="password" class="form-control p-4" value={values.password} onChange={handleChange} onBlur={handleBlur} id='password' placeholder="Password" required="required" data-validation-required-message="Please enter a subject" />
                            <p class="help-block text-danger">{errors.password && touched.password && (<span className="err">{errors.password}</span>)}</p>

                        </div>
                        
                        <div>
                            <button class="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
           
        </div>
    </div>
    </div>
  )
}

export default VolunteerSignin
