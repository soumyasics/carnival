import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import axiosInstance from '../baseUrl';
import { useNavigate } from 'react-router-dom';

function AdminReultView() {

  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

    const [array, setArray] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllGrades`)
      .then((response) => {
        console.log(response);
        setArray(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AdminNav/>
      
      <div class="container-fluid pt-4 px-4 p-5" >
          <div class="bg-light text-center rounded p-5">
              <div class="d-flex align-items-center justify-content-between mb-5">
                  <h6 class="mb-0">Result</h6>
                  {/* <Link href="">Add coordinator</Link> */}
              </div>
              <div class="table-responsive" style={{overflowX:'auto'}}>
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                          <tr class="text-dark">
                              <th scope="col">Event Name</th>
                              <th scope="col">Winner</th>
                              
                              {/* <th scope="col">Action</th> */}
                          </tr>
                      </thead>
                      <tbody>
                          {
                              array.length?array.map((a)=>{
                                  return(
                                      <tr>
                                      <td>{a.eventid.eventname}</td>
                                      <td>{a.gradeA!=null?`A Grade - ${a.gradeA.name}`:'No Participants for A Grade'}<br/>{a.gradeB!=null?`B Grade - ${a.gradeB.name}`:'No Participants for B Grade'}<br/>{a.gradeC!=null?`C Grade - ${a.gradeC.name}`:'No Participants for C Grade'}</td>
                                      
                                  </tr>
                                  )
                              }):<h1>No Results Found</h1>
                          }
                          
                          
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AdminReultView
