import React, { useEffect, useState } from 'react'
import VolunteerNav from './VolunteerNav'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../baseUrl';

function VolunteerViewEnrollments() {

    const {id}=useParams();
    const { a } = useParams();

    const event = JSON.parse(a)
  
      const [array,setArray]= useState([]);
  
      useEffect(()=>{
          axiosInstance.post(`/viewenrollmentsByEventId/${id}`)
          .then((response)=>{
              console.log(response);
              setArray(response.data.data)
          })
          .catch((err)=>{
              console.log(err);
          })
      },[])

  return (
    <div>
      <VolunteerNav/>
      <div class="container-fluid bg-light pt-5">
        <div class="container py-5">
            <div class="row pb-3">
                    <h1 class="display-4 mb-4">Enrollments for <span class="text-primary">{event.a}</span></h1>
                    {
                        array.length?array.map((a)=>{
                            return(
                               <div class="col-md-6 col-lg-4 mb-4">   
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                        <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                        <h3 class="mb-3">Chest No : {a.chestNo}</h3>
                        <Link to={`/volunteer_viewVotes/${a._id}`} class="text-uppercase font-weight-bold" >View votes</Link>
                        <Link to={`/volunteer_addscore/${a._id}/${a.eventid}/${a.stid._id}`} class="text-uppercase font-weight-bold" >Add Score</Link>
                    </div>
                </div> 
                            )
                        }):<h1>No Enrollments</h1>
                    }
                
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default VolunteerViewEnrollments
