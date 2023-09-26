import React, { useEffect, useState } from 'react'
import AudienceNav from './AudienceNav'
import axiosInstance from '../baseUrl';

function AudienceViewSeatBooking() {

    const [array,setArray]= useState([]);
    const id = localStorage.getItem('audienceId')


    useEffect(()=>{
        axiosInstance.post(`/viewSeatsByAudienceId/${id}`)
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
      <AudienceNav/>
      <div class="container-fluid pt-4 px-4 p-5" >
          <div class="bg-light text-center rounded p-5">
              <div class="d-flex align-items-center justify-content-between mb-5">
                  <h6 class="mb-0">Program Details</h6>
              </div>
              
              <div class="table-responsive" style={{overflowX:'auto'}}>
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                          <tr class="text-dark">
                              <th scope="col">Program Name</th>
                              <th scope="col">Event type</th>
                              <th scope="col">Stage No</th>
                          </tr>
                      </thead>
                      {
                              array.length?array.map((a)=>{
                                  return(
                      <tbody>
                         
                                      <tr>
                                      <td>{a.eventid.eventname}</td>
                                      <td>{a.eventid.eventtype}</td>
                                      <td>{a.stageid.stageNo}</td>
                                     
                                      
                                  </tr>
                             
                          
                          
                      </tbody>
                            )
                        }):<h1 style={{textAlign:'center',padding:'50px'}} >No Programs found</h1>
                    }
                  </table>
              </div>
             
          </div>
      </div>
    </div>
  )
}

export default AudienceViewSeatBooking
