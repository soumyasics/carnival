import React, { useEffect, useState } from 'react'
import StudentNav from './StudentNav'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function StudentSinglePrgm() {
    const {id} = useParams();

    const [value,setValue] = useState({});
    const [stage,setStage] = useState([]);
    const stid=localStorage.getItem('studentId')
    const navigate=useNavigate();  
  
    useEffect(() => {
      axiosInstance.post(`/viewEventById/${id}`)
      .then((res)=>{
      console.log(res);
      setValue(res.data.data)
      
    })
    }, []);

    useEffect(() => {
      axiosInstance.post(`/viewStageAllotmentsByEventid/${id}`)
      .then((res)=>{
      console.log(res);
      setStage(res.data.data)
      
    })
    }, []);

    const onSubmit = (e) =>{
          axiosInstance.post('/enroll',{eventid:id,stid:stid})
          .then((res)=>{
            console.log(res);
            if (res.data.status==200) {
                toast.success('Registered')
              
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
        <StudentNav/>
      <div class="container-fluid bg-light">
        <div class="container">
            <div class="row align-items-center">
                
                <div class="col-lg-10 py-5 py-lg-0 px-3 px-lg-5 mt-5">
                    <h4 class="text-secondary mb-3">Apply Program</h4>
                    <h1 class="display-4 mb-4">Join the  <span class="text-primary">Carnival Journey</span></h1>
                    <p>Embark on a thrilling adventure by applying for your desired programs at the Carnival. Register now and secure your spot in the captivating lineup of events.</p>
                    <div class="row py-2">
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-house font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Program name</h5>
                                </div>
                                <p>{value.eventname}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-food font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Category</h5>
                                </div>
                                <p>{value.category}</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-grooming font-weight-normal text-secondary m-0 "></h1>
                                    <h5 class="text-truncate m-0">Duration</h5>
                                </div>
                                <p >{value.duration} mins</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-toy font-weight-normal text-secondary "></h1>
                                    <h5 class="text-truncate m-0">Event Type</h5>
                                </div>
                                <p >{value.eventtype}</p>
                            </div>
                        </div>
                        {
                            stage.map((a)=>{
                                return(
                                    <>
                                   <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-toy font-weight-normal text-secondary "></h1>
                                    <h5 class="text-truncate m-0">Stage No</h5>
                                </div>
                                <p >{a.stageid.stageNo}</p>
                            </div>
                        </div> 
                        <div class="col-sm-6">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <h1 class="flaticon-toy font-weight-normal text-secondary "></h1>
                                    <h5 class="text-truncate m-0">Date</h5>
                                </div>
                                <p >{a.date.slice(0,10)}</p>
                            </div>
                        </div>
                        </>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>
                <div class='col-4 mt-3 mb-5' >
                    <button class="btn btn-dark btn-block border-0 py-3" onClick={()=>{onSubmit()}} >Enroll Now</button>
                </div>
                {/* <div class="col-lg-5">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5">
                            <div class="form-group">
                                <input type="text" class="form-control border-0 p-4" placeholder="Your Name" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0 p-4" placeholder="Your Email" required="required" />
                            </div>
                            <div class="form-group">
                                <div class="date" id="date" data-target-input="nearest">
                                    <input type="text" class="form-control border-0 p-4 datetimepicker-input" placeholder="Reservation Date" data-target="#date" data-toggle="datetimepicker"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="time" id="time" data-target-input="nearest">
                                    <input type="text" class="form-control border-0 p-4 datetimepicker-input" placeholder="Reservation Time" data-target="#time" data-toggle="datetimepicker"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <select class="custom-select border-0 px-4" style={{height:'47px'}}>
                                    <option selected>Select A Service</option>
                                    <option value="1">Service 1</option>
                                    <option value="2">Service 1</option>
                                    <option value="3">Service 1</option>
                                </select>
                            </div>
                            <div>
                                <button class="btn btn-dark btn-block border-0 py-3" type="submit">Book Now</button>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
    </div>
  )
}

export default StudentSinglePrgm
