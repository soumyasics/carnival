import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axiosInstance from '../baseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminViewVotes() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })

    const {id}= useParams();
    const {eid}= useParams();

    console.log(id);
    console.log(eid);

    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post(`/viewVotesforEid/${id}`)
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
      <AdminNav/>
      <div class="mb-5" style={{padding:'20px 100px'}}>
                    <h3 class="mb-4 mt-5">Total Votes <span class='text-secondary'>{array.length}</span></h3>
                    {
                        array.length?array.map((a)=>{
                            return(
                                <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                           {a.aid.name}
                        </li>
                        
                    </ul> 
                            )
                        }):<h1>No Votes</h1>
                    }
                   

                    
                   
                </div>
    </div>
  )
}

export default AdminViewVotes
