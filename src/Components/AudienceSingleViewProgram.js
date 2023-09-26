import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import AudienceNav from './AudienceNav';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function AudienceSingleViewProgram() {

    const {id} = useParams();
    const aid=localStorage.getItem('audienceId')
    const navigate=useNavigate();

    const [event,setevent]= useState({});
    const [array,setarray]= useState([]);

    useEffect(()=>{
        axiosInstance.post(`/viewEventById/${id}`)
        .then((response)=>{
            console.log(response);
            setevent(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })

        axiosInstance.post(`/viewStageAllotmentsByEventid/${id}`)
        .then((response)=>{
            console.log(response);
            setarray(response.data.data)
           
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const onSubmit = (e) =>{
        axiosInstance.post('/bookSeat',{aid:aid,eventid:id})
        .then((res)=>{
          console.log(res);
          if (res.data.status==200) {
              toast.success('Seat booked')
            navigate('/audience_view_bookings')
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
      <div class="container-fluid bg-light p-5" style={{minHeight:'500px'}}>
        <div class="container pt-5">
            <div class="row align-items-center">
                
                <div class="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
                    <h4 class="text-secondary mb-3">Book Seats for</h4>
                    <h1 class="display-4 mb-4">Carnival's <span class="text-primary">{event.eventname}</span></h1>
                    <p>Secure your spot and immerse yourself in the thrilling Carnival experience by booking tickets for our captivating programs!</p>
                    
                </div>
                <div class="col-lg-5">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                       <div class="row py-2">

                        {
                            array.length?array.map((a)=>{
                                return(
                                    <>
                                    <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-house font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Stage</h5>
                                </div>
                                <p style={{color:'white'}} >{a.stageid.stageNo}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-food font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Date</h5>
                                </div>
                                <p style={{color:'white'}}>{a.date.slice(0,10)}</p>
                            </div>
                        </div>
                        {/* <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-grooming font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Time</h5>
                                </div>
                                <p style={{color:'white'}} class="m-0">10.00 am</p>
                            </div>
                        </div> */}
                        {/* <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-toy font-weight-normal text-secondary "></h1>
                                    <h5 class="text-truncate m-0">Seat availability</h5>
                                </div>
                                <p style={{color:'white'}} class="m-0">{a.stageid.sc}</p>
                            </div>
                        </div> */}
                                    </>
                                )
                            }):''
                        }

                        
                        <div>
                                <button class="btn btn-dark btn-block border-0 py-3 mt-4" type="submit" onClick={()=>{onSubmit()}} >Book Now</button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AudienceSingleViewProgram


