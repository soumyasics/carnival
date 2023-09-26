import React, { useEffect, useState } from 'react'
import axiosInstance from '../baseUrl';
import StudentNav from './StudentNav';
import { useParams } from 'react-router-dom';

function StudentViewEnrollResult() {


    const {eventid}=useParams();
    const id = localStorage.getItem("studentId");
    console.log(id);

  const [array, setArray] = useState({});
  const [msg, setmsg] = useState();

  useEffect(() => {
    axiosInstance
      .post(`/viewGradesByStudid/${id}`,{eventid:eventid})
      .then((response) => {
        console.log(response.data);
        if(response.data.status==200)
        setArray(response.data);
        setmsg(response.data.msg)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <StudentNav/>
      <div class="container py-5">
        <div class="row py-5">
            <div class="col-lg-12 pb-5 pb-lg-0 px-3 px-lg-5">
                <h4 class="text-secondary mb-3">Result</h4>
              
                <h1 class="display-4 mb-4"><span class="text-primary">{array.data?`You Got ${array.data}`:<>{msg}</>}</span> </h1>
                {/* <h5 class="text-muted mb-3">Amet stet amet ut. Sit no vero vero no dolor. Sed erat ut sea. Just clita ut stet kasd at diam sit erat vero sit.</h5>
                <p class="mb-4">Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo</p>
                <ul class="list-inline">
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Best In Industry</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Emergency Services</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>24/7 Customer Support</h5></li>
                </ul>
                <a href="" class="btn btn-lg btn-primary mt-3 px-4">Learn More</a> */}
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

export default StudentViewEnrollResult
