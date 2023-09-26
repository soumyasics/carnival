import React, { useEffect, useState } from 'react'
import AudienceNav from './AudienceNav'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../baseUrl';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import img from "./Assests/StdEditprof.json";

function AudienceEditProfile() {

    const [value, setValue] = useState({});
  const navigate = useNavigate();

  const id = localStorage.getItem("audienceId");

  useEffect(() => {
    axiosInstance.post(`/viewAudienceById/${id}`)
    .then((res) => {
      // console.log(res.data.desig);
      setValue(res.data.data);
    });
  }, []);

  const updatefcn = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/editAudienceById/${id}`, value)
      .then((response) => {
        console.log(response);
        if (response.data.status == 200) {
          toast.success("Profile Updated");
          navigate("/audience_profile");
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
      <AudienceNav/>
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
                  <div class="form-group">
                    <label for="email">Place *</label>
                    <input
                      type="text"
                      class="form-control"
                      value={value.place}
                      name="place"
                      onChange={changefn}
                      id="place"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Age *</label>
                    <input
                      type="number"
                      class="form-control"
                      value={value.age}
                      name="age"
                      onChange={changefn}
                      id="age"
                    />
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
  )
}

export default AudienceEditProfile
