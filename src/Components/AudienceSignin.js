import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { AudienceRegSchema } from './Schema';

function AudienceSignin() {

    const navigate= useNavigate();


    const onSubmit = (e) =>{
        // e.preventDefault();
          console.log('hi');
          axiosInstance.post('/audienceRegistration',values)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            if (res.data.status==200) {
              toast.success("Registration Successful")
              navigate('/audience_login')
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
                  age: "",
                  place: "",
                },
                validationSchema: AudienceRegSchema,
                onSubmit,
                
          })

  return (
    <div>
      <Navbar/>
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Signup</h4>
            <h1 class="display-4 m-0">Audience <span class="text-primary">Signup</span></h1>
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
                            <input type="text" class="form-control p-4" value={values.place} onChange={handleChange} onBlur={handleBlur} id='place' placeholder="Place" required="required" />
                            <p class="help-block text-danger">{errors.place && touched.place && (<span className="err">{errors.place}</span>)}</p>

                        </div>
                        <div class="control-group">
                            <input type="number" class="form-control p-4" value={values.age} onChange={handleChange} onBlur={handleBlur} id='age' placeholder="Age" required="required"  />
                            <p class="help-block text-danger">{errors.age && touched.age && (<span className="err">{errors.age}</span>)}</p>

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

export default AudienceSignin
