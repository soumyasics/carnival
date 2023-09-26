import React, { useEffect, useState } from 'react'
import StudentNav from './StudentNav'
import axiosInstance from '../baseUrl';

function StudentViewWinners() {

    const [kalathilakam, setkalathilakam] = useState({ student: {} });
  const [kalaprathibha, setkalaprathibha] = useState({student: {}});

  useEffect(() => {
    axiosInstance
      .post("/findTopScorer")
      .then((response) => {
        console.log(response);
        if (response.data.kalathilakam) {
          setkalathilakam(response.data.kalathilakam);
        } if (response.data.kalaprathibha) {
          setkalaprathibha(response.data.kalaprathibha);
        }
        // setArray(response.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <StudentNav/>
      <div class="container py-5" style={{ minHeight: "500px" }}>
        <div class="row py-5">
          <div class="col-lg-6 pb-5 pb-lg-0 px-3 px-lg-5">
            <h4 class="text-secondary mb-3">Kalathilakam</h4>
            {kalathilakam.student && kalathilakam.student.name ? (
              <h1 class="display-4 mb-4">
                
                <span class="text-primary">{kalathilakam.student.name}</span>
              </h1>
            ) : (
              <h1 class="display-4 mb-4">
                <span class="text-primary">Not Published</span>
              </h1>
            )}
            {/* <h5 class="text-muted mb-3">Amet stet amet ut. Sit no vero vero no dolor. Sed erat ut sea. Just clita ut stet kasd at diam sit erat vero sit.</h5> */}
            <h6 class="text-secondary mb-3">{kalathilakam&&kalathilakam.totalScore?`Total Score : ${kalathilakam.totalScore}`:''}</h6>
            

            {/* <ul class="list-inline">
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Best In Industry</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Emergency Services</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>24/7 Customer Support</h5></li>
                </ul> */}
            {/* <a href="" class="btn btn-lg btn-primary mt-3 px-4">Learn More</a> */}
          </div>
          <div class="col-lg-6 pb-5 pb-lg-0 px-3 px-lg-5">
            <h4 class="text-secondary mb-3">Kalaprathibha</h4>
            {kalaprathibha.student && kalaprathibha.student.name ? (
              <h1 class="display-4 mb-4">
                
                <span class="text-primary">{kalaprathibha.student.name}</span>
              </h1>
            ) : (
              <h1 class="display-4 mb-4">
                <span class="text-primary">Not Published</span>
              </h1>
            )}
            {/* <h5 class="text-muted mb-3">Amet stet amet ut. Sit no vero vero no dolor. Sed erat ut sea. Just clita ut stet kasd at diam sit erat vero sit.</h5> */}
            <h6 class="text-secondary mb-3">{kalaprathibha&&kalaprathibha.totalScore?`Total Score : ${kalaprathibha.totalScore}`:''}</h6>

            {/* <ul class="list-inline">
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Best In Industry</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Emergency Services</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>24/7 Customer Support</h5></li>
                </ul> */}
            {/* <a href="" class="btn btn-lg btn-primary mt-3 px-4">Learn More</a> */}
          </div>
          {/* <div class="col-lg-5">
                <div class="row px-3">
                    <div class="col-12 p-0">
                        <img class="img-fluid w-100" src="img/about-1.jpg" alt="">
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src="img/about-2.jpg" alt="">
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src="img/about-3.jpg" alt="">
                    </div>
                </div>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default StudentViewWinners
