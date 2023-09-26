import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import axiosInstance from '../baseUrl';

function AdminViewPrgm() {

    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('admin')==null){
            navigate('/')
        }
    })
    const [array,setArray]= useState([]);

    useEffect(()=>{
        axiosInstance.post("/viewevents")
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
        axiosInstance.post(`/deletevent/${id}`)
          .then((res) => {
            console.log(res);
            if(res.data.status==200)
            alert("deleted")
        else
        alert("Can Not Be deleted as we Have enrollments")
           // setArray(prevArray => prevArray.filter(item => item._id !== id));
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
                  <h6 class="mb-0">Program Details</h6>
                  <Link to="/admin_addprograms">Add program</Link>
              </div>
              <div class="table-responsive" style={{overflowX:'auto'}}>
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                          <tr class="text-dark">
                              <th scope="col">Program Name</th>
                              <th scope="col">Category</th>
                              <th scope="col">Event type</th>
                              <th scope="col">Duration</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              array.length?array.map((a)=>{
                                  return(
                                      <tr>
                                      <td>{a.eventname}</td>
                                      <td>{a.category}</td>
                                      <td>{a.eventtype}</td>
                                      <td>{a.duration} min</td>
                                      <td>
                                      <Link to={`/admin_view_enroll/${a._id}/${JSON.stringify({a:a.eventname})}`} ><button class="btn btn-sm btn-success" style={{marginRight:'5px'}} >View</button></Link>
                                        <Link to={`/admin_editprograms/${a._id}`} ><button class="btn btn-sm btn-primary" style={{marginRight:'5px'}} >Edit</button></Link>
                                        <button class="btn btn-sm btn-danger" onClick={() => handleRemove(a._id)}>Remove</button>
                                      </td>
                                  </tr>
                                  )
                              }):<h1 style={{textAlign:'center',padding:'50px'}} >No Programs found</h1>
                          }
                          
                          
                      </tbody>
                  </table>
                  <Link to='/admin_view_winner' ><button class="btn btn-sm btn-warning mt-4">View Winner</button></Link>

              </div>
          </div>
      </div>
    </div>
  )
}
// function AdminViewPrgm() {
//     const [array, setArray] = useState([]);
  
//     useEffect(() => {
//       axiosInstance.post("/viewevents")
//         .then((response) => {
//           console.log(response.data.data);
//           setArray(response.data.data);
//           console.log(array);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, []);
  
//     const handleRemove = (id) => {
//       axiosInstance.post(`/deletevent/${id}`)
//         .then(() => {
//           setArray(prevArray => prevArray.filter(item => item._id !== id));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
  
//     return (
//       <div>
        
//         <div class="container-fluid pt-4 px-4 p-5">
//           <div class="bg-light text-center rounded p-5">
//             <tbody>
//               {array.map((a) => (
//                 <tr key={a._id}>
//                   <td>
//                     <button class="btn btn-sm btn-primary" style={{ marginRight: '5px' }}>Edit</button>
//                     <button class="btn btn-sm btn-danger" onClick={() => handleRemove(a._id)}>Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

export default AdminViewPrgm
