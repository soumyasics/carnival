import React, { useEffect, useState } from 'react'
import CoordinatorNav from './CoordinatorNav'
import { useParams } from 'react-router-dom';
import axiosInstance from '../baseUrl';

function CoordinatorViewSingleBlog({url}) {

    const { id } = useParams();

//   const [data, setData] = useState({
//     review: "",
//   });

  const [array, setArray] = useState({
    img: [{ filename: "" }, { filename: "" }, { filename: "" }],
    reviews: [],
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewBlogsById/${id}`)
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
      <CoordinatorNav/>
      <div class="container py-5">
        <div class="row pt-5">
          <div class="col-lg-12">
            <div class="d-flex flex-column text-left mb-4">
              <h4 class="text-secondary mb-3">Blog Detail</h4>
              <h1 class="mb-3">{array.title}</h1>
              {/* <div class="d-index-flex mb-2">
                        <span class="mr-3"><i class="fa fa-user text-muted"></i> Admin</span>
                        <span class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</span>
                        <span class="mr-3"><i class="fa fa-comments text-muted"></i> 15</span>
                    </div> */}
            </div>

            <div class="mb-5">
              <img
                class="img-fluid w-100 mb-4"
                // src={`http://43.204.92.123:4014/${array.img[0].filename}`}

                src={`${url}/${array.img[0].filename}`}
                alt="Image"
              />
              <p>{array.p1}</p>
              <img
                class="img-fluid w-50 float-left mr-4 mb-3"
                // src={`http://43.204.92.123:4014/${array.img[1].filename}`}

                src={`${url}/${array.img[1].filename}`}
                alt="Image"
              />
              <p>{array.p2}</p>
              <img
                class="img-fluid w-50 float-right ml-4 mb-3"
                // src={`http://43.204.92.123:4014/${array.img[2].filename}`}

                src={`${url}/${array.img[2].filename}`}
                alt="Image"
              />
              <p>{array.p3}</p>
            </div>

           

            <div class="mb-5">
              {array.reviews.length != 0 ? (
                <h3 class="mb-4">{array.reviews.length} Comments</h3>
              ) : (
                <h3 class="mb-4">No Comments</h3>
              )}
              
              {array.reviews.length ? (
                  array.reviews.map((a) => {
                    return (
              <div >
                
                <div >
                  {/* <h6>
                    John Doe{" "}
                    <small>
                      <i>01 Jan 2045 at 12:00pm</i>
                    </small>
                  </h6> */}
                  <p>
                  <span style={{marginRight:'10px'}} ><i class="ri-discuss-fill"></i></span>{a}
                  </p>
                </div>
              </div>
                );
              })
            ) : (
              ''
            )}
            
            </div>

            {/*  */}
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default CoordinatorViewSingleBlog
