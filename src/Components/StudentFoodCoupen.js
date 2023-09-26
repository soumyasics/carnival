import React from 'react'
import StudentNav from './StudentNav'
import { Link } from 'react-router-dom'

function StudentFoodCoupen() {
  return (
    <div>
      <StudentNav/>
      <div class="container py-5">
        <div class="row py-5">
            <div class="col-lg-12 pb-5 pb-lg-0 px-3 px-lg-5">
                <h4 class="text-secondary mb-3">Student</h4>
                <h1 class="display-4 mb-4"><span class="text-primary">Food Coupen</span> at <span class="text-secondary">Carnival</span></h1>
                <h5 class="text-muted mb-3">Welcome to CARNIVAL! Our innovative solution is designed to revolutionize the way people access and enjoy food.</h5>
                <p class="mb-4">With a mission to tackle food insecurity and promote affordability, our platform offers digital coupons that unlock significant discounts at partnering restaurants, cafes, and grocery stores. By bridging the gap between food establishments and customers in need, we aim to ensure that no one goes hungry in our community.</p>
                {/* <ul class="list-inline">
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Best In Industry</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Emergency Services</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>24/7 Customer Support</h5></li>
                </ul> */}
                <Link to='/student_generate_coupen' class="btn btn-lg btn-primary mt-3 px-4">Generate Now</Link>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default StudentFoodCoupen
