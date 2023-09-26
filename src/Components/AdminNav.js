import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div>
        <div class="container-fluid bg-dark px-0">
        <div class="row gx-0">
        <div class="row py-3 px-lg-5">
             <div class="col-lg-4">
                 <Link to='/admin_home' class="navbar-brand d-none d-lg-block">
                     <h1 class="m-0 display-5 text-capitalize" style={{color:'white'}}><span class="text-primary">Ad</span>min</h1>
                 </Link>
             </div>
           <div class="col-lg-8 text-center text-lg-right">

         </div>
        </div>
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
              <a href="" class="navbar-brand d-block d-lg-none">
              <h1 class="m-0 display-5 text-capitalize" style={{color:'white'}}  ><span class="text-primary">Ad</span>min </h1>
              </a>

              <button
                type="button"
                class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                 <div class="navbar-nav mr-auto py-0">
                     <Link to='/admin_home' class="nav-item nav-link ">Home</Link>
                     <Link to='/admin_view_program' class="nav-item nav-link">Programs</Link>
                     <Link to='/admin_coordinator' class="nav-item nav-link">Coordinator</Link>
                     <Link to='/admin_volunteers' class="nav-item nav-link">Volunteers</Link>
                     <Link to='/admin_audience' class="nav-item nav-link">Audience</Link>
                     <Link to='/admin_result' class="nav-item nav-link">Results</Link> 
                     <Link to='/admin_viewStages' class="nav-item nav-link">Stage</Link> 
                     <Link to='/admin_viewComplaints' class="nav-item nav-link">Complaints</Link> 
                     <Link onClick={()=>{localStorage.clear();window.location.reload(false)}} class="nav-item nav-link">Logout</Link> 
                 </div>
             </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
