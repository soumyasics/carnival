import React, { useState } from 'react'
import VolunteerNav from './VolunteerNav'
import { useParams } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function VolunteerAddComplaintStatus() {

    const {id} = useParams();
    const vid=localStorage.getItem('volunteerId')

    const [status,setStatus]=useState({
        status:'',
        respfrom:'Coordinator',
        vid:vid,
        response:'',
    })

    console.log(status);

    const onSubmit = (e) =>{
        console.log(status);
        e.preventDefault();
          axiosInstance.post(`/updateComplaints/${id}`,status)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            
      
            if (res.data.status==200) {
                toast.success('Success')
                // console.log(res.data.data._id);
              
            }else{
              toast.error("Failed")
      
            }
          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")
      
          })
        }

  return (
    <div>
      <VolunteerNav/>
      <div class="container-fluid bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5" onSubmit={onSubmit} >
                            <h5>Add</h5>
                           
                            <div class="form-group">
                                <select class="custom-select border-0 px-4" style={{height: "47px"}} name='status' onChange={(e)=>{setStatus({...status,status:e.target.value})}}  required >
                                    <option >Select</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Solved'>Solved</option>
                                    
                                </select>
                            </div>
                            <div class="form-group">
                                
                                <input type="text" class="form-control border-0 p-4" placeholder="Response" onChange={(e)=>{setStatus({...status,response:e.target.value})}}   required />

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

export default VolunteerAddComplaintStatus
