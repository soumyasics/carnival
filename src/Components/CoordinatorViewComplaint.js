import React, { useEffect, useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import axiosInstance from '../baseUrl';
import { Link } from 'react-router-dom';

function CoordinatorViewComplaint() {

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewComplaints")
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
      <div class="container-fluid pt-4 px-4 p-5" >
                <div class="bg-light text-center rounded p-5">
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <h6 class="mb-0">Complaint Details</h6>
                        {/* <a href="">Add program</a> */}
                    </div>
                    <div class="table-responsive" style={{overflowX:'auto'}}>
                    
                        <table class="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Complaint</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                    {/* <th scope="col">Stage</th> */}
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            {
                                    array.length?array.map((a)=>{
                                        return(
                            <tbody>
                                
                                            <tr>
                                            <td>{a.studid.name}</td>
                                            <td>{a.complaint}</td>
                                            <td>{a.date.slice(0,10)}</td>
                                            <td>
                                               <Link to={`/coordinator_addcomplaint_status/${a._id}`}> <button class="btn btn-sm btn-danger" >status</button></Link>
                                            </td>
                                            {/* <td>{a.dateofjoin.slice(0,10)}</td> */}
                                            {/* <td><button class="btn btn-sm btn-primary">View</button></td> */}
                                        </tr>
                                  
                                
                                
                            </tbody>
                             )
                            }):<h1 style={{textAlign:'center',padding:'50px'}} >No Complaints</h1>
                        }
                        </table>
                             
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CoordinatorViewComplaint
