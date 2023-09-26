import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StudentNav from './StudentNav';
import axiosInstance from '../baseUrl';

function StudentHome() {
    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/vieweventsByDate")
        .then((response)=>{
            console.log(response.data.data);
            setArray(response.data.data)
            console.log(array);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div>
        <StudentNav/>
      <div class="container pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
            <h4 class="text-secondary mb-3">Students</h4>
            <h1 class="display-4 m-0"><span class="text-primary">View Programs at</span> CARNIVAL</h1>
            <div class="mb-5 mt-4">
                    <div class=" flex-wrap m-n1 m-auto">
                        <Link to='/student_home' class="btn btn-outline-primary m-1">View Programmes</Link>
                        <Link to='/student_result' class="btn btn-outline-primary m-1">View Results</Link>
                        <Link to='/student_view_winners' class="btn btn-outline-primary m-1">View Winners</Link>
                    </div>
                </div>
        </div>
        <div class="row pb-3">
            {
                array.length?array.map((a)=>{
                    return(
                        <div class="col-lg-4 mb-4">
                <div class="card border-0 mb-2">
                    <img class="card-img-top" src="img/blog-1.jpg" alt=""/>
                    <div class="card-body bg-light p-4">
                        <h4 class="card-title text-truncate">{a.eventname}</h4>
                        <div class="d-flex mb-3">
                            <small class="mr-2"><i class="fa fa-user text-muted"></i> {a.category}</small>
                           
                        </div>
                        {/* <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet, diam sea est diam eos, rebum sit vero stet justo</p> */}
                        <Link class="font-weight-bold" to={`/student_program_view/${a._id}`}>Show More</Link>
                    </div>
                </div>
            </div>
                    )
                }):<h1 style={{textAlign:'center',padding:'50px'}} >No Events found</h1>
            }
        </div>
    </div>
    </div>
  )
}

export default StudentHome
