import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios';
import axiosInstance from '../baseUrl';
import { useNavigate } from 'react-router-dom';

function AdminHome() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewstudents")
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
        <AdminNav/>
      
            <div class="container-fluid pt-4 px-4 p-5" >
                <div class="bg-light text-center rounded p-5">
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <h6 class="mb-0">Participants Details</h6>
                        {/* <a href="">Add program</a> */}
                    </div>
                    <div class="table-responsive" style={{overflowX:'auto'}}>
                        <table class="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">Name</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Section</th>
                                    {/* <th scope="col">Stage</th> */}
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    array.map((a)=>{
                                        return(
                                            <tr>
                                            <td>{a.name}</td>
                                            <td>{a.email}</td>
                                            <td>{a.section}</td>
                                            {/* <td>{a.dateofjoin.slice(0,10)}</td> */}
                                            {/* <td><button class="btn btn-sm btn-primary">View</button></td> */}
                                        </tr>
                                        )
                                    })
                                }
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AdminHome
