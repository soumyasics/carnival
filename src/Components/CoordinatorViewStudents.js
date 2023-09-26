import React, { useEffect, useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import axiosInstance from '../baseUrl';

function CoordinatorViewStudents() {

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewstudents")
        .then((response)=>{
            console.log(response);
                setArray(response.data.data)
          
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

  return (
    <div>
      <CoordinatorNav/>
      <div class="container-fluid bg-light pt-5">
        <div class="container py-5">
            <div class="d-flex flex-column text-center mb-5">
                <h4 class="text-secondary mb-3">Coordinator</h4>
                <h1 class="display-4 m-0"><span class="text-primary">View</span> Students</h1>
            </div>
            <div class="row pb-3">
                {
                    array.length?array.map((a)=>{
                        return(
                            <div class="col-md-6 col-lg-4 mb-4">
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                        <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                        <h3 class="mb-3">{a.name}</h3>
                        <p>{a.email}</p>
                        <p>{a.section}</p>
                    </div>
                </div>
                        )
                    }) :<h1 style={{textAlign:'center',padding:'50px'}} >No Students found</h1>
                }
                
                {/* <div class="col-md-6 col-lg-4 mb-4">
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                        <h3 class="flaticon-food display-3 font-weight-normal text-secondary mb-3"></h3>
                        <h3 class="mb-3">Pet Feeding</h3>
                        <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet, diam sea est magna diam eos, rebum sit vero stet ipsum justo</p>
                        <a class="text-uppercase font-weight-bold" href="">Read More</a>
                    </div>
                </div> */}
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default CoordinatorViewStudents
