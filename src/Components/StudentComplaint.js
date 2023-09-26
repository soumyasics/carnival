import React, { useState } from 'react'
import StudentNav from './StudentNav'
import img3 from '../images/comp3.jpg'
import axiosInstance from '../baseUrl'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function StudentComplaint() {

    const id = localStorage.getItem('studentId')

    const [complaint,setComplaint]=useState({
        id:id,
        complaint:'',
    })

    const doLogin=(e)=>{
        e.preventDefault();

        axiosInstance.post("/addComplaint",complaint)
        .then((response)=>{
            console.log(response);
            if(response.data.status==200){
                toast.success('Complaint Registered')
            }
            
        })
        .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")  
              })

    }

  return (
    <div>
      <StudentNav/>
      <div class="container py-5">
        <div class="row py-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Students</h4>
            <h1 class="display-4 m-0"><span class="text-primary">Add</span> COMPLAINTS</h1>
            <div class="mb-5 mt-4">
                    <div class=" flex-wrap m-n1 m-auto">
                        <Link to='/student_complaint' class="btn btn-outline-primary m-1">Add Complaints</Link>
                        <Link to='/student_view_complaint' class="btn btn-outline-primary m-1">View Complaints</Link>
                    </div>
                </div>
        </div>
        <div class="col-lg-5">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5" onSubmit={doLogin} >
                            <div class="form-group">
                                <textarea type="text" class="form-control border-0 p-4" placeholder="Add complaints" required onChange={(e)=>{setComplaint({...complaint,complaint:e.target.value})}} />
                            </div>
                            <div>
                                <button class="btn btn-dark btn-block border-0 py-3" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            <div class="col-lg-7">
                <div class="row px-3">
                    <div class="col-12 p-0">
                        <img class="img-fluid w-100" src={img3} alt=""/>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default StudentComplaint
