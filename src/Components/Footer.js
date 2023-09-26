import React from 'react'

function Footer() {
  return (
    <div>
      <div class="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
        <div class="row pt-5">
            <div class="col-lg-4 col-md-12 mb-5">
                <h1 class="mb-3 display-5 text-capitalize text-white"><span class="text-primary">Car</span>nival</h1>
                <p class="m-0">Welcome to CARNIVAL, a dynamic platform that brings together students, coordinators, and audience members for an unforgettable experience of vibrant events, thrilling performances, and exciting competitions. Dive into a world of creativity, talent, and celebration, where participants showcase their skills, viewers revel in the awe-inspiring spectacles, and coordinators ensure a seamless journey for all. Join us in this grand celebration of joy, passion, and camaraderie at CARNIVAL!</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-6 mb-5">
                        <h5 class="text-primary mb-4">Get In Touch</h5>
                        <p><i class="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                        <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                        {/* <div class="d-flex justify-content-start mt-4">
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width:'36px',height:'36px'}}  href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width:'36px',height:'36px'}} href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width:'36px',height:'36px'}} href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width:'36px',height:'36px'}} href="#"><i class="fab fa-instagram"></i></a>
                        </div> */}
                    </div>
                    <div class="col-md-6 mb-5">
                        <h5 class="text-primary mb-4">Popular Links</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <span class="text-white mb-2" ><i class="fa fa-angle-right mr-2"></i>Home</span>
                            <span class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>About Us</span>
                            <span class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Our Services</span>
                            <span class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Our Team</span>
                            <span class="text-white" href="#"><i class="fa fa-angle-right mr-2"></i>Contact Us</span>
                        </div>
                    </div>
                    {/* <div class="col-md-4 mb-5">
                        <h5 class="text-primary mb-4">Newsletter</h5>
                        <form action="">
                            <div class="form-group">
                                <input type="text" class="form-control border-0" placeholder="Your Name" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control border-0" placeholder="Your Email" required="required" />
                            </div>
                            <div>
                                <button class="btn btn-lg btn-primary btn-block border-0" type="submit">Submit Now</button>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer
