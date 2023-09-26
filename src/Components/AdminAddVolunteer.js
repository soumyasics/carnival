import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axiosInstance from '../baseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminAddVolunteer() {

  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

    const [array,setArray]= useState([]);
    const [coor,setCoor]= useState([]);
    const {id}=useParams();
    const {date}=useParams();

    const [volunteer,setVolunteer]=useState({
        vid:'',
    })

    const [coordinator,setcoordinator]=useState({
        coId:'',
    })

    const eDate=JSON.parse(date)
    console.log(eDate);

    useEffect(() => {

        axiosInstance
          .post(`/availableVolunteers`,{date:eDate})
          .then((response) => {
            console.log(response);
            setArray(response.data.data)
          })
          .catch((err) => {
            console.log(err);
          });

          axiosInstance
          .post(`/viewcoordinators`)
          .then((response) => {
            console.log(response);
            setCoor(response.data.data)
          })
          .catch((err) => {
            console.log(err);
          });
    
      }, []);

      const onSubmit = (e) =>{
        e.preventDefault();
          axiosInstance.post(`/allottVolunteerAndEvent/${id}`,volunteer)
          .then((res)=>{
            console.log('vol',res);

          })
          .catch((err)=>{
            console.log('error',err);
            toast.error("Failed")
      
          })

          axiosInstance.post(`/allottCordinatorAndEvent/${id}`,coordinator)
          .then((res)=>{
            console.log('coor',res);
            if(res.data.status==200){
                navigate('/admin_view_program')
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
                            <h5>Add Volunteer & Coordinator</h5>
                            {/* <div class="form-group">
                                <label><h6 style={{color:'black'}} >Enter Date</h6></label>
                                <input type="date" class="form-control border-0 p-4" placeholder=""  onChange={(e)=>{setStages({...stages,date:e.target.value})}} required />

                            </div> */}
                            <div class="form-group">
                                <select class="custom-select border-0 px-4" style={{height: "47px"}} onChange={(e)=>{setVolunteer({...volunteer,vid:e.target.value})}}  required >
                                    <option selected>Select Volunteer</option>
                                    {
                                        array.length?array.map((a)=>{
                            return(
                                <option value={a._id}>{a.name}</option>
                            )

                        }):<option>No Volunteers Available</option>
                      }
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <select class="custom-select border-0 px-4" style={{height: "47px"}} onChange={(e)=>{setcoordinator({...coordinator,coId:e.target.value})}}  required >
                                    <option selected>Select Coordinator</option>
                                    {
                                        coor?coor.map((a)=>{
                            return(
                                <option value={a._id}>{a.name}</option>
                            )

                        }):''
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

export default AdminAddVolunteer
