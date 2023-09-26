import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { AddPrgmSchema } from './Schema';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../baseUrl';


function AdminAddPrgm() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })

    
    const onSubmit = (e) =>{
        console.log(values);
        // e.preventDefault();
          axiosInstance.post('/addevent',values)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            
      
            if (res.data.status==200) {
                console.log(res.data.data._id);
                navigate(`/admin_allot_stage/${res.data.data._id}`)
              
            }else{
              toast.error("Failed")
      
            }
          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")
      
          })
        }

        const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
          useFormik({
              initialValues: {
                  eventname:'',
                  category:'',
                  duration:'',
                  eventtype:'',
                  
                },
                validationSchema: AddPrgmSchema,
                onSubmit,
                
          })

  return (
    <div>
        <AdminNav/>
      <div class="container-fluid bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5" onSubmit={handleSubmit} >
                            <h5>Add program</h5>
                            <div class="form-group">
                                <input type="text" class="form-control border-0 p-4" placeholder="Event Name" required="required" value={values.eventname} onChange={handleChange} onBlur={handleBlur} id='eventname' />
                                <p class="help-block" style={{color:'#ffff'}} >{errors.eventname && touched.eventname && (<span className="err">{errors.eventname}</span>)}</p>

                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control border-0 p-4" placeholder="Category" required="required" value={values.category} onChange={handleChange} onBlur={handleBlur} id='category' />
                                <p class="help-block" style={{color:'#ffff'}} >{errors.category && touched.category && (<span className="err">{errors.category}</span>)}</p>

                            </div>
                            
                            <div class="form-group">
                                <div class="time" id="time" data-target-input="nearest">
                                    <input type="number" class="form-control border-0 p-4 datetimepicker-input" placeholder="in min" data-target="#time" data-toggle="datetimepicker" value={values.duration} onChange={handleChange} onBlur={handleBlur} id='duration'/>
                                    <p class="help-block" style={{color:'#ffff'}} >{errors.duration && touched.duration && (<span className="err">{errors.duration}</span>)}</p>

                                </div>
                            </div>
                            
                            <div class="form-group">
                                <div class="time d-flex justify-content-between" id="time" data-target-input="nearest">
                                    <label style={{color:'white'}} ><h5>Event Type</h5></label>
                                    <div>
                                        <input type="radio"   onChange={handleChange} onBlur={handleBlur} name='eventtype' id='eventtype' style={{marginRight:'15px'}}  value='Single Item' /><label  ><h5 style={{marginRight:'15px'}}>Single</h5></label>
                                    <input type="radio"  onChange={handleChange} onBlur={handleBlur} id='eventtype' name='eventtype' style={{marginRight:'15px'}} value='Group Item' /><label ><h5>Group</h5></label>
                                    </div>
                                   
                                    <p class="help-block" style={{color:'#ffff'}} >{errors.eventtype && touched.eventtype && (<span className="err">{errors.eventtype}</span>)}</p>

                                </div>
                            </div>
                           
                            <div>
                                <button class="btn btn-dark btn-block border-0 py-3" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminAddPrgm
