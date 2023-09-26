import React, { useEffect, useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import axiosInstance from '../baseUrl';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CoordinatorViewBlogs({url}) {

  const [array, setArray] = useState([]);
  const id = localStorage.getItem('coordinatorId')

  useEffect(() => {
    axiosInstance
      .post(`/viewMyBlogsByCid/${id}`)
      .then((response) => {
        console.log(response);
        setArray(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRemove = (id) => {
    axiosInstance.post(`/deleteBlogsById/${id}`)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success('Removed')
          setArray(prevArray => prevArray.filter(item => item._id !== id));

        } else {
          toast.error('failed')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <CoordinatorNav />
      <div class="container pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
          <h4 class="text-secondary mb-3">Blog</h4>
          <h1 class="display-4 m-0"><span class="text-primary">My</span> Blogs</h1>
        </div>

        <div class="row pb-3">
          {
            array.length ? array.map((a) => {
              return (
                <div class="col-lg-4 mb-4">
                  <div class="card border-0 mb-2">

                    {/* <img class="card-img-top" src={`http://43.204.92.123:4014/${a.img[0].filename}`} alt="" /> */}

                     <img class="card-img-top" src={`${url}/${a.img[0].filename}`} alt="" style={{height:'250px',objectFit:'cover'}} />
                    <div class="card-body bg-light p-4">
                      <h4 class="card-title text-truncate">{a.title}</h4>
                      {/* <div class="d-flex mb-3">
                            <small class="mr-2"><i class="fa fa-user text-muted"></i> Admin</small>
                            <small class="mr-2"><i class="fa fa-folder text-muted"></i> Web Design</small>
                            <small class="mr-2"><i class="fa fa-comments text-muted"></i> 15</small>
                        </div> */}
                      <p>{a.p1.slice(0, 100)}... <Link class="font-weight-bold" to={`/coordinator_blog_detail/${a._id}`}>Read More</Link></p>
                      <button class='btn btn-danger' onClick={() => { handleRemove(a._id) }} >Remove</button>
                    </div>
                  </div>
                </div>
              )
            }) : <h1 style={{ padding: '20px', textAlign: 'center' }} >No Blog Added</h1>
          }


        </div>
      </div>
    </div>
  )
}

export default CoordinatorViewBlogs
