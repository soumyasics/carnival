import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axiosInstance from '../baseUrl';
import { Link, useNavigate } from 'react-router-dom';

function AdminViewStages() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })
    
    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewAllStages")
        .then((response)=>{
            console.log(response.data.data);
            setArray(response.data.data)
            console.log(array);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleRemove = (id) => {
        axiosInstance.post(`/deletStage/${id}`)
          .then(() => {
            setArray(prevArray => prevArray.filter(item => item._id !== id));
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <div>
      <AdminNav/>
      <div class="container-fluid pt-4 px-4 p-5" >
          <div class="bg-light text-center rounded p-5">
              <div class="d-flex align-items-center justify-content-between mb-5">
                  <h6 class="mb-0">Stage Details</h6>
                  <Link to="/admin_stage_&_seat">Add Stage</Link>
              </div>
              <div class="table-responsive" style={{overflowX:'auto'}}>
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                          <tr class="text-dark">
                              <th scope="col">Seat No</th>
                              <th scope="col">Seat Capacity</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              array.length?array.map((a)=>{
                                  return(
                                      <tr>
                                      <td>{a.stageNo}</td>
                                      <td>{a.sc}</td>
                                      <td>
                                        <Link to={`/admin_editStages/${a._id}`} ><button class="btn btn-sm btn-primary" style={{marginRight:'5px'}} >Edit</button></Link>
                                        <button class="btn btn-sm btn-danger" onClick={() => handleRemove(a._id)}>Remove</button>
                                      </td>
                                  </tr>
                                  )
                              }):<h1 style={{textAlign:'center',padding:'50px'}} >No Stages found</h1>
                          }
                          
                          
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AdminViewStages
