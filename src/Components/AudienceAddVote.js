import React, { useEffect, useState } from 'react'
import AudienceNav from './AudienceNav'
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function AudienceAddVote() {

    const id=localStorage.getItem('audienceId')

    const [array,setarray]= useState([]);

    useEffect(()=>{
        

        axiosInstance.post(`/viewTodayEventsforAud/${id}`)
        .then((response)=>{
            console.log(response);
            setarray(response.data.data)
           
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const onSubmit = (e) =>{
      axiosInstance.post(`/addVote/${id}`,{eid:e})
      .then((res)=>{
        console.log(res);
        if (res.data.status==200) {
            toast.success('Voted')
          
        }else if(res.data.status==500){
          toast.error(res.data.msg)
  
        }else{
            toast.error('Failed')
        }
      })
      .catch((err)=>{
        console.log('error',err);
        toast.error("Failed")
  
      })
    }

  return (
    <div>
      <AudienceNav/>
      <div class="container-fluid bg-light pt-5">
        <div class="container py-5">
          
            <div class="row pb-3">
            {
            array.length?array.map((a)=>{
              return(
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                        <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                        <h3 class="mb-3">Chest No: {a.chestNo}</h3>
                        <p>{a.stid.name}</p>
                        <p>Event : {a.eventid.eventname}</p>
                        <p>Category : {a.eventid.category}</p>
                        <button class="btn btn-dark btn-block border-0 py-3 mt-4" onClick={()=>{onSubmit(a._id)}}>Add vote</button>
                    </div>
                </div>
                 )
                }):<h1>No Enrollments Vote</h1>
              }
            </div>
             
            
        </div>
    </div>
    </div>
  )
}

export default AudienceAddVote
