import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import Lottie from "lottie-react";
import img from "./Assests/StdEditprof.json";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseUrl";
import { toast } from "react-toastify";

function StudentEditProf() {
  
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  const id = localStorage.getItem("studentId");

  useEffect(() => {
    axiosInstance.post(`/viewstudentbyid/${id}`).then((res) => {
      // console.log(res.data.desig);
      setValue(res.data.data);
    });
  }, []);

  const updatefcn = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/editstudentbyid/${id}`, value)
      .then((response) => {
        console.log(response);
        if (response.data.status == 200) {
          toast.success("Profile Updated");
          navigate("/student_profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changefn = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(value);
  });

  return (
    <div>
      <StudentNav />
      <div class="container-fluid bg-light mt-5 p-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5">
              <img class="img-fluid w-100" src="img/feature.jpg" alt="" />
              <Lottie animationData={img} />
            </div>
            <div class="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <div style={{ padding: "30px", background: "#f6f6f6" }}>
                <h3 class="mb-4">Edit Profile</h3>
                <form onSubmit={updatefcn}>
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      value={value.name}
                      name="name"
                      onChange={changefn}
                      id="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input
                      type="email"
                      class="form-control"
                      value={value.email}
                      name="email"
                      onChange={changefn}
                      id="email"
                    />
                  </div>
                  <label for="name">Section *</label>
                  <div class="form-group" style={{border: '1px solid #ced4da'}}>
                                    <select class="custom-select border-0 px-4" name="section" onChange={changefn} value={value.section} >
                                        <option value='' disabled>Select A Section</option>
                                        <option value="Lower Primary">Lower Primary</option>
                                        <option value="Upper Primary">Upper Primary</option>
                                        <option value="Higher Secondary">Higher Secondary</option>
                                    </select>
                        </div>

                  <div class="form-group mb-0">
                    <button type="submit" class="btn btn-primary px-3">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEditProf;
