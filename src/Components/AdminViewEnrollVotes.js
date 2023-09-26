import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseUrl";
import { toast } from "react-toastify";

function AdminViewEnrollVotes() {

  const navigate=useNavigate()
  useEffect(()=>{
      if(localStorage.getItem('admin')==null){
          navigate('/')
      }
  })

  const { id } = useParams();
  const { a } = useParams();

  console.log(id);

  const event = JSON.parse(a);

  const [array, setArray] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewenrollmentsByEventId/${id}`)
      .then((response) => {
        console.log(response);
        setArray(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateScore = (eid) => {
    axiosInstance
      .post(`/generateScore/${eid}`)
      .then((res) => {
        console.log("woking", res);
        if (res.data.status == 200) {
          toast.success("Score Added");
        } else if (res.data.status == 500) {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Failed");
      });
  };

  const generateGrade = (e) => {
    axiosInstance
      .post(`/generateGrade/${id}`)
      .then((res) => {
        console.log("woking", res);
        if (res.data.status == 200) {
          toast.success("Grade Added");
        } else if (res.data.status == 500) {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Failed");
      });
  };

  return (
    <div>
      <AdminNav />
      <div class="container-fluid bg-light pt-5">
        <div class="container py-5">
          <div class="row pb-3">
            <h1 class="display-4 mb-4">
              Enrollments for <span class="text-primary">{event.a}</span>
            </h1>
            
            {array.length ? (
              array.map((a) => {
                return (
                  <div class="col-md-6 col-lg-4 mb-4">
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                      <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                      <h3 class="mb-3">Chest No : {a.chestNo}</h3>
                      <Link
                        to={`/admin_viewVotes/${a._id}/${id}`}
                        class="text-uppercase font-weight-bold"
                      >
                        View votes
                      </Link>
                      <button
                        type="button"
                        class="btn btn-primary mt-3"
                        style={{
                          background: "#181818",
                          borderColor: "#181818",
                        }}
                        onClick={() => {
                          generateScore(a._id);
                        }}
                      >
                        Generate Score
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Enrollments</h1>
            )}
            
          </div>
          <div style={{ width: "400px", margin: "5px auto",textAlign:'center' }}>
              <button
                type="button"
                class="btn btn-primary"
                style={{ marginRight: "3px" }}
                onClick={() => {
                  generateGrade();
                }}
              >
                Generate Grade
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewEnrollVotes;
