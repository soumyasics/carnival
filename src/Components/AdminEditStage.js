import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../baseUrl';
import Lottie from 'lottie-react'
import img from './Assests/editPrgm.json'
import { toast } from 'react-toastify';


function AdminEditStage() {
  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

    const {id}=useParams();
    const [value, setValue] = useState({});

  useEffect(() => {
    axiosInstance.post(`/viewStageById/${id}`)
    .then((res) => {
        console.log(res);
      // console.log(res.data.desig);
      setValue(res.data.data);
    });
  }, []);

  const updatefcn=(e)=>{
          e.preventDefault();
      
          axiosInstance.post(`/editStage/${id}`,value)
          .then((response)=>{
            console.log(response);
            if (response.data.status==200) {
              toast.success('Updated')
              navigate('/admin_viewStages')
            }
      
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      
        const changefn = (e)=>{
      setValue({...value, [e.target.name]:e.target.value})
        }
      
        useEffect(()=>{
          console.log(value);
        })

  return (
    <div>
      <AdminNav/>
      <div class="container-fluid bg-light mt-5 p-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <img class="img-fluid w-100" src="img/feature.jpg" alt=""/>
                    <Lottie animationData={img} />
                </div>
                <div class="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
                    <div style={{padding: '30px', background: '#f6f6f6'}}>
                    <h3 class="mb-4">Edit Stages</h3>
                    <form onSubmit={updatefcn} >
                        <div class="form-group">
                            <label for="number">Stage No *</label>
                            <input type="number" class="form-control" value={value.stageNo} onChange={changefn} name="stageNo" id='stageNo' required  />
                        </div>
                        <div class="form-group">
                            <label for="number">Stage Capacity *</label>
                            <input type="number" class="form-control" value={value.sc} onChange={changefn} name="sc" id='sc' required />
                        </div>
                        
                        <div class="form-group mb-0">
                            <button type="submit"  class="btn btn-primary px-3" >Update</button>
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

export default AdminEditStage
