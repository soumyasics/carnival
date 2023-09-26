import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import CoordinatorNav from './CoordinatorNav';

function CoordinatorViewVotes() {

    const {id}= useParams();

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
      <CoordinatorNav/>
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

export default CoordinatorViewVotes
