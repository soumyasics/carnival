import React, { useEffect, useState } from 'react'
import axiosInstance from '../baseUrl';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router-dom';

function AdminAudience() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewAllaudience")
        .then((response)=>{
            console.log(response.data.data);
            setArray(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleRemove = (id) => {
        axiosInstance.post(`/deleteAudience/${id}`)
          .then((res) => {
            console.log(res);
            if(res.data.status==200){
                alert('Rejected')
                setArray(prevArray => prevArray.filter(item => item._id !== id));
                // window.location.reload()
            }else{
                // alert.warning('Employee Already Exist')
            }
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
                        <h6 class="mb-0">Participants Details</h6>
                        {/* <a href="">Add program</a> */}
                    </div>
                    <div class="table-responsive" style={{overflowX:'auto'}}>
                    
                        <table class="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">Name</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Place</th>
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
                                            <td>{a.name}</td>
                                            <td>{a.email}</td>
                                            <td>{a.place}</td>
                                            <td>
                                                <button class="btn btn-sm btn-danger" onClick={() => handleRemove(a._id)} >Delete</button>
                                            </td>
                                            {/* <td>{a.dateofjoin.slice(0,10)}</td> */}
                                            {/* <td><button class="btn btn-sm btn-primary">View</button></td> */}
                                        </tr>
                                  
                                
                                
                            </tbody>
                             )
                            }):<h1 style={{textAlign:'center',padding:'50px'}} >No new requests</h1>
                        }
                        </table>
                             
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AdminAudience
