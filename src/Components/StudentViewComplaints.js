import React, { useEffect, useState } from 'react'
import StudentNav from './StudentNav'
import { Link } from 'react-router-dom'
import axiosInstance from '../baseUrl'
import { toast } from 'react-toastify'
import img3 from '../images/comp3.jpg'


function StudentViewComplaints() {

    const id = localStorage.getItem('studentId')

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post(`/viewComplaintsByStudid/${id}`)
        .then((response)=>{
            console.log(response);
            setArray(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleRemove = (id) => {
        axiosInstance.post(`/delComplaintsById/${id}`)
          .then((res) => {
            console.log(res);
            if(res.data.status==200){
                alert('Removed')
                setArray(prevArray => prevArray.filter(item => item._id !== id));
                // window.location.reload()
            }else{
                // alert.warning('Employee Already Exist')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <div>
      <StudentNav/>
      <div class="container py-5">
      <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Students</h4>
            <h1 class="display-4 m-0"><span class="text-primary">View</span> COMPLAINTS</h1>
            <div class="mb-5 mt-4">
                    <div class=" flex-wrap m-n1 m-auto">
                        <Link to='/student_complaint' class="btn btn-outline-primary m-1">Add Complaints</Link>
                        <Link to='/student_view_complaint' class="btn btn-outline-primary m-1">View Complaints</Link>
                    </div>
                </div>
        </div>
      <div class="col-lg-12 py-5 py-lg-0 px-3 px-lg-5 mt-5">
                    
                    <div class="row py-2" >
                        {
                            array.length?array.map((a)=>{
                                return(
                                    <div class="col-sm-6">
                            <div class="d-flex flex-column"  style={{minHeight:'400px'}}>
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-house font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Complaint ({a.date.slice(0,10)})</h5>

                                    
                                </div>
                                <p>{a.complaint}</p>
                                <p>Status {a.status}</p>
                                

                                <button class='btn btn-danger col-3 mb-5' onClick={() => handleRemove(a._id)}>Delete</button>
                                {a.response?<>
                                <p class="text-secondary mb-3">Responded by {a.respfrom}</p>
                                <p>{a.response}</p></>:''}
                            </div>
                        </div>
                                )
                            }):<h1>No complaints</h1>
                        }
                        
                        
                        
                        
                        
                    </div>
                </div>
    </div>
    </div>
  )
}

export default StudentViewComplaints
