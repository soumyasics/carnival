import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axiosInstance from '../baseUrl'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AdminStageAndSeat() {
  
  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

    const [stage,setStage]=useState({stageNo:'',sc:''})

    // const navigate=useNavigate();
    
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(stage);
          axiosInstance.post('/addStage',stage)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            
      
            if (res.data.status==200) {
              toast.success("Added succesfully")
            }else{
              toast.error("Failed")
      
            }
          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")
      
          })
        }

  return (
    <div>
      <AdminNav/>
      <div class="container-fluid bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="bg-primary py-5 px-4 px-sm-5">
                        <form class="py-5" onSubmit={onSubmit} >
                            <h5>Add Stage</h5>
                            <div class="form-group">
                                <input type="number" class="form-control border-0 p-4" onChange={(e)=>{setStage({...stage,stageNo:e.target.value})}} placeholder="Stage Name" required="required" />
                                <p class="help-block" style={{color:'#ffff'}} ></p>

                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control border-0 p-4" onChange={(e)=>{setStage({...stage,sc:e.target.value})}} placeholder="Number of seats" required="required" />
                                <p class="help-block" style={{color:'#ffff'}} ></p>

                            </div>
                            
                            <div>
                                <button class="btn btn-dark btn-block border-0 py-3" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminStageAndSeat
