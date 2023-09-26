import React, { useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function CoordinatorAddScore() {

    const {id}=useParams();
    const {eid}=useParams();
    const {sid}=useParams();
    const navigate=useNavigate()

    const [data,setData]=useState({
        eventid:eid,
        studId:sid,
        score:0
    })

    const onSubmit = (e) =>{
        e.preventDefault();
          axiosInstance.post(`/addScoreCoordinator/${id}`,data)
          .then((res)=>{
            console.log('woking',res);
            if(res.data.status==200){
                toast.success('Score Added')
                // navigate('/coordinator_view_programs')
            }
          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")
      
          })
        }

  return (
    <div>
      <CoordinatorNav/>
      <div class="container-fluid bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5" onSubmit={onSubmit} >
                            <h5>Enter Score</h5>
                            <div class="form-group">
                                {/* <label><h6 style={{color:'black'}} ></h6></label> */}
                                <input type="number" class="form-control border-0 p-4" placeholder="Out of 100"  onChange={(e)=>{setData({...data,score:e.target.value})}} required />

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

export default CoordinatorAddScore
