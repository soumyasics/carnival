import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';

function AdminAllotStag() {
  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

    const {id}=useParams();
    console.log(id);

    const [stageNo,setStageNo]=useState([])

    const [stages,setStages]=useState({
        eventid:id,
        date:'',
        stageid:''
    })



    
    useEffect(() => {
        console.log(stages.date);
        axiosInstance
          .post(`/availableStages`,{date:stages.date})
          .then((response) => {
            console.log(response);
            setStageNo(response.data.data)
          })
          .catch((err) => {
            console.log(err);
          });
    
      }, [stages.date]);

      const onSubmit = (e) =>{
        console.log(stages);
        e.preventDefault();
          axiosInstance.post('/allottStageAndEvent',stages)
          .then((res)=>{
            console.log('woking',res);
            console.log(res.data);
            
      
            if (res.data.status==200) {
                // toast.success('Event Added')
                // console.log(res.data.data._id);
                navigate(`/admin_add_volunteer/${id}/${JSON.stringify(stages.date)}`)
              
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
                            <h5>Stage and Date</h5>
                            <div class="form-group">
                                <label><h6 style={{color:'black'}} >Enter Date</h6></label>
                                <input type="date" class="form-control border-0 p-4" placeholder=""  onChange={(e)=>{setStages({...stages,date:e.target.value})}} required />

                            </div>
                            <div class="form-group">
                                <select class="custom-select border-0 px-4" style={{height: "47px"}} onChange={(e)=>{setStages({...stages,stageid:e.target.value})}} required >
                                    <option selected>Select Stages</option>
                                    {
                                        stageNo.length?stageNo.map((a)=>{
                            return(
                                <option value={a._id}>{a.stageNo}</option>
                            )

                        }):<option >no stage available for that date</option>
                      }
                                </select>
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

export default AdminAllotStag
