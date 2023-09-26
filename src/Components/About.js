import React from 'react'
import img1 from '../images/about-1.jpg'
import img2 from '../images/about-2.jpg'
import img3 from '../images/about-3.jpg'
import Navbar from './Navbar'

function About() {
  return (
    <div>
      <div class="container py-5">
        <div class="row py-5">
            <div class="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
                <h4 class="text-secondary mb-3">About Us</h4>
                <h1 class="display-4 mb-4"><span class="text-primary">Carnival</span> </h1>
                <h5 class="text-muted mb-3">Festivals promote cultural diversity and understanding. They allow young people to learn about different cultures, traditions, and practices.</h5>
                <p class="mb-4">Through music, dance, drama, and other forms of artistic expression, young people can share their culture and heritage with others and learn about new cultures. This promotes intercultural dialogue and understanding, which is crucial for building a peaceful and harmonious world..</p>
                {/* <ul class="list-inline">
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Best In Industry</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>Emergency Services</h5></li>
                    <li><h5><i class="fa fa-check-double text-secondary mr-3"></i>24/7 Customer Support</h5></li>
                </ul>
                <a href="" class="btn btn-lg btn-primary mt-3 px-4">Learn More</a> */}
            </div>
            <div class="col-lg-5">
                <div class="row px-3">
                    <div class="col-12 p-0">
                        <img class="img-fluid w-100" src={img1} alt=""/>
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src={img2} alt=""/>
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src={img3} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default About
