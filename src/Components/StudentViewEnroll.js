import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import axiosInstance from "../baseUrl";
import { Link } from "react-router-dom";

function StudentViewEnroll() {
  const id = localStorage.getItem("studentId");

  const [array, setArray] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewenrollmentsByStudentId/${id}`)
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
      <StudentNav />
      <div class="container-xxl py-5">
        <div class="container">
          {/* <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1> */}
          <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Enrollments</h4>
            <h1 class="display-4 m-0">
              My <span class="text-primary">ENROLLMENTS</span>
            </h1>
            <div class="mb-5 mt-4">
                    <div class=" flex-wrap m-n1 m-auto">
                        View Results
                    </div>
                </div>
          </div>
          <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <div class="tab-content">
              <div id="tab-1" class="tab-pane fade show p-0 active">
               
                  {array.length ? (
                    array.map((a) => {
                      return (
                        <Link to={`/student_enrollment_result/${a.eventid._id}`} style={{textDecoration:'none'}} >
                           <div class="job-item p-4 mb-4">
                        <div class="row g-4 shadow zoom">
                          <div class="col-sm-12 col-md-8 d-flex align-items-center">
                            <div class="text-start ps-4">
                              <h5 class="mb-3">{a.eventid.eventname}</h5>
                              <span class="text-truncate me-3">
                                <i class="fa fa-map-marker-alt text-primary me-2"></i>
                                {a.eventid.category}
                              </span>
                              <span class="text-truncate me-3">
                                <i class="far fa-clock text-primary me-2"></i>
                                {a.eventid.duration} mins
                              </span>
                              {/* <span class="text-truncate me-0">
                                <i class="far fa-money-bill-alt text-primary me-2"></i>
                                $123 - $456
                              </span> */}
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                            <div class="d-flex mb-3">
                              {/* <a class="btn btn-primary" href="">Apply Now</a> */}
                              <small class="text-truncate">
                                <i class="far fa-calendar-alt me-2"></i>Stage No
                              </small>
                              <h1 class="display-4 m-0 text-primary">{a.stageid.stageNo}</h1>
                              
                            </div>
                            {/* <small class="text-truncate">
                              <i class="far fa-calendar-alt text-primary me-2"></i>
                              Name...
                            </small> */}
                          </div>
                        </div>
                        </div>
                        </Link>

                      );
                    })
                  ) : (
                    <h1 style={{ textAlign: "center" }}>No Enrollments</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default StudentViewEnroll;
