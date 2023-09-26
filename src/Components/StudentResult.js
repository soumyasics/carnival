import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentNav from './StudentNav'
import axiosInstance from '../baseUrl';

function StudentResult() {

    const [array, setArray] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllGrades`)
      .then((response) => {
        console.log(response);
        setArray(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <StudentNav/>
      <div>
        <div class="container-xxl py-5">
            <div class="container">
                {/* <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1> */}
                <div class="d-flex flex-column text-center mb-5 pt-5">
                <h4 class="text-secondary mb-3">Results</h4>
                <h1 class="display-4 m-0">View Results at <span class="text-primary">CARNIVAL!</span></h1>
                <div class="mb-5 mt-4">
                    {/* <div class=" flex-wrap m-n1 m-auto ">
                        <Link to='/audience_view_program' class="btn btn-outline-primary m-1">View Programmes</Link>
                        <Link to='/audience_result' class="btn btn-outline-primary m-1">View Results</Link>
                    </div> */}
                </div>
            </div>
                <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                   
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">
                            {
                                array.length?array.map((a)=>{
                                    return(
                                        <div class="job-item p-4 mb-4">
                                            
                                <div class="row g-4 shadow">
                                    <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                        <div class="text-start ps-4">
                                            <h4 class="mb-3">{a.eventid.eventname}</h4>
                                            <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>{a.eventid.category}</span>
                                            <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>{a.eventid.eventtype}</span>
                                            <h6 class="text-truncate me-0 mt-2" style={{color:'#65c178'}}><i class="far fa-money-bill-alt text-primary me-2"></i>{a.gradeB!=null?`B Grade - ${a.gradeB.name}`:'No Participants for B Grade'}</h6>
                                            <h6 class="text-truncate me-0" style={{color:'#65c178'}}><i class="far fa-money-bill-alt text-primary me-2"></i>{a.gradeC!=null?`C Grade - ${a.gradeC.name}`:'No Participants for C Grade'}</h6>
                                            
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <div class="d-flex mb-3">
                                        <h2 class=" m-0 text-primary"><span></span>{a.gradeA!=null?`A Grade - ${a.gradeA.name}`:'Not Published'}</h2><span class="text-truncate"><i class="far fa-calendar-alt me-2"></i>{a.gradeA!=null?`A Grade`:''}</span>

                                        </div>
                                        {/* <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Name...</small> */}
                                    </div>
                                </div>
                            </div>
                                    )
                                }):<h1 style={{padding:'20px',textAlign:'center'}} >No Results Published</h1>
                            }
                            
                            
                        </div>
                        
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    
  )
}

export default StudentResult
