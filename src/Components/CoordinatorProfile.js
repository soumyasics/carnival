import React, { useEffect, useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../baseUrl';
import img from './Assests/StudentProfPic.json'
import Lottie from 'lottie-react'

function CoordinatorProfile() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('coordinatorId')==null){
            navigate('/')
        }
    })

    const [value, setValue] = useState({});

  useEffect(()=>{
    const id=localStorage.getItem("coordinatorId")
    console.log(id);



  axiosInstance.post(`/viewcoordinatorsById/${id}`)
  .then((res)=>{
    console.log(res);
    setValue(res.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })

  },[])

  return (
    <div>
      <CoordinatorNav/>
      <div class="container-fluid bg-light mt-5 p-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <img class="img-fluid w-100" src="img/feature.jpg" alt=""/>
                    <Lottie animationData={img} />
                </div>
                <div class="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
                    <h4 class="text-secondary mb-3">Profile</h4>
                    <h1 class="display-4 mb-4 text-primary">{value.name}</h1>
                    <div class="row py-2">
                        {/* <div class="col-12">
                            <div class="d-flex align-items-center mb-4">
                                <h5 class="text-truncate m-0">Name : {value.name}</h5>
                            </div>
                        </div> */}
                        <div class="col-12">
                            <div class="d-flex align-items-center mb-4">
                                <h5 class="text-truncate m-0">{value.email}</h5>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex align-items-center">
                                <h5 class="text-truncate m-0">{value.contact}</h5>
                            </div>
                        </div>
                        <div class="d-flex mb-3 mt-5">
                            <Link to='/coordinator_edit_profile' class="btn btn-secondary mr-3" href="">Edit</Link>
                            <Link class="btn btn-primary" onClick={()=>{localStorage.clear();window.location.reload(false)}}>Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CoordinatorProfile
