import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axiosInstance from "../baseUrl";
import { toast } from "react-toastify";

function BlogDetail({url}) {
  const { id } = useParams();

  const [data, setData] = useState({
    review: "",
  });
  const [data1,setdata1]=useState(false)

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
  }, [data1]);

  const onSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/addReview/${id}`, data)
      .then((res) => {
        console.log("woking", res);
        if (res.data.status == 200) {
          toast.success("Comment Added");
          setData({ ...data, review:''})
          setdata1(prev=>!prev)
          
          // navigate('/coordinator_view_programs')
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Failed");
      });
  };

  return (
    <div>
      <Navbar />
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
                // src={`http://43.204.92.123:4014/projects/carnival/${array.img[2].filename}`}

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

            <div style={{ padding: "30px", background: "#f6f6f6" }}>
              <h3 class="mb-4">Leave a comment</h3>
              <form onSubmit={onSubmit}>
                {/* <div class="form-group">
                            <label for="name">Name *</label>
                            <input type="text" class="form-control" id="name"/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" class="form-control" id="email"/>
                        </div>
                        <div class="form-group">
                            <label for="website">Website</label>
                            <input type="url" class="form-control" id="website"/>
                        </div> */}

                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea
                    id="message"
                    cols="30"
                    rows="5"
                    class="form-control"
                    onChange={(e) => {
                      setData({ ...data, review: e.target.value });
                    }}
                    value={data.review}
                    required
                  ></textarea>
                </div>
                <div class="form-group mb-0">
                  <input
                    type="submit"
                    value="Leave Comment"
                    class="btn btn-primary px-3"
                  />
                </div>
              </form>
            </div>
          </div>
          {/* <div class="col-lg-4 mt-5 mt-lg-0">
                <div class="mb-5">
                    <form action="">
                        <div class="input-group">
                            <input type="text" class="form-control form-control-lg" placeholder="Keyword"/>
                            <div class="input-group-append">
                                <span class="input-group-text bg-transparent text-primary"><i
                                        class="fa fa-search"></i></span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="mb-5">
                    <h3 class="mb-4">Categories</h3>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Web Design
                            <span class="badge badge-primary badge-pill">150</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Web Development
                            <span class="badge badge-primary badge-pill">131</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Online Marketing
                            <span class="badge badge-primary badge-pill">78</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Keyword Research
                            <span class="badge badge-primary badge-pill">56</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Email Marketing
                            <span class="badge badge-primary badge-pill">98</span>
                        </li>
                    </ul>
                </div>
                <div class="mb-5">
                    <img src="img/blog-1.jpg" alt="" class="img-fluid"/>
                </div>
                <div class="mb-5">
                    <h3 class="mb-4">Recent Post</h3>
                    <div class="d-flex align-items-center border-bottom mb-3 pb-3">
                        <img class="img-fluid" src="img/blog-1.jpg" style={{width:'80px',height:'80px'}}   alt=""/>
                        <div class="d-flex flex-column pl-3">
                            <a class="text-dark mb-2" href="">Lorem ipsum dolor sit amet consec adipis elit</a>
                            <div class="d-flex">
                                <small class="mr-3"><i class="fa fa-user text-muted"></i> Admin</small>
                                <small class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</small>
                                <small class="mr-3"><i class="fa fa-comments text-muted"></i> 15</small>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center border-bottom mb-3 pb-3">
                        <img class="img-fluid" src="img/blog-2.jpg" style={{width:'80px',height:'80px'}} alt=""/>
                        <div class="d-flex flex-column pl-3">
                            <a class="text-dark mb-2" href="">Lorem ipsum dolor sit amet consec adipis elit</a>
                            <div class="d-flex">
                                <small class="mr-3"><i class="fa fa-user text-muted"></i> Admin</small>
                                <small class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</small>
                                <small class="mr-3"><i class="fa fa-comments text-muted"></i> 15</small>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center border-bottom mb-3 pb-3">
                        <img class="img-fluid" src="img/blog-3.jpg" style={{width:'80px',height:'80px'}} alt=""/>
                        <div class="d-flex flex-column pl-3">
                            <a class="text-dark mb-2" href="">Lorem ipsum dolor sit amet consec adipis elit</a>
                            <div class="d-flex">
                                <small class="mr-3"><i class="fa fa-user text-muted"></i> Admin</small>
                                <small class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</small>
                                <small class="mr-3"><i class="fa fa-comments text-muted"></i> 15</small>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center border-bottom mb-3 pb-3">
                        <img class="img-fluid" src="img/blog-1.jpg" style={{width:'80px',height:'80px'}} alt=""/>
                        <div class="d-flex flex-column pl-3">
                            <a class="text-dark mb-2" href="">Lorem ipsum dolor sit amet consec adipis elit</a>
                            <div class="d-flex">
                                <small class="mr-3"><i class="fa fa-user text-muted"></i> Admin</small>
                                <small class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</small>
                                <small class="mr-3"><i class="fa fa-comments text-muted"></i> 15</small>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center border-bottom mb-3 pb-3">
                        <img class="img-fluid" src="img/blog-2.jpg" style={{width:'80px',height:'80px'}} alt=""/>
                        <div class="d-flex flex-column pl-3">
                            <a class="text-dark mb-2" href="">Lorem ipsum dolor sit amet consec adipis elit</a>
                            <div class="d-flex">
                                <small class="mr-3"><i class="fa fa-user text-muted"></i> Admin</small>
                                <small class="mr-3"><i class="fa fa-folder text-muted"></i> Web Design</small>
                                <small class="mr-3"><i class="fa fa-comments text-muted"></i> 15</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <img src="img/blog-2.jpg" alt="" class="img-fluid"/>
                </div>
                C
                <div class="mb-5">
                    <img src="img/blog-3.jpg" alt="" class="img-fluid"/>
                </div>
                <div>
                    <h3 class="mb-4">Plain Text</h3>
                    Aliquyam sed lorem stet diam dolor sed ut sit. Ut sanctus erat ea est aliquyam dolor et. Et no consetetur eos labore ea erat voluptua et. Et aliquyam dolore sed erat. Magna sanctus sed eos tempor rebum dolor, tempor takimata clita sit et elitr ut eirmod.
                </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
