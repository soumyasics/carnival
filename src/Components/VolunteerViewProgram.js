import React, { useEffect, useState } from "react";
import VolunteerNav from "./VolunteerNav";
import axiosInstance from "../baseUrl";
import { Link } from "react-router-dom";

function VolunteerViewProgram() {
  const [array, setArray] = useState([]);
  const id=localStorage.getItem('volunteerId')

  useEffect(() => {
    axiosInstance
      .post(`/viewEventsByVId/${id}`)
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
      <VolunteerNav />
      <div class="container-fluid bg-light pt-5">
        <div class="container py-5">
          <div class="d-flex flex-column text-center mb-5">
            <h4 class="text-secondary mb-3">Volunteer</h4>
            <h1 class="display-4 m-0">
              <span class="text-primary">View</span> Programs
            </h1>
          </div>
          <div class="row pb-3">
            {array.length ? (
              array.map((a) => {
                return (
                  <div class="col-md-6 col-lg-4 mb-4">
                    <Link to={`/volunteer_view_enroll/${a.eventid._id}/${JSON.stringify({a:a.eventid.eventname})}`} style={{textDecoration:'none'}}>
                    <div
                      class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5 zoom"
                      style={{ minHeight: "350px" }}
                    >
                      <h3 class="flaticon-house display-3 font-weight-normal text-secondary mb-3"></h3>
                      <h3 class="mb-3">{a.eventid.eventname}</h3>
                      <p>{a.eventid.category}</p>
                      <p>{a.eventid.section}</p>
                      <p>{a.eventid.eventtype}</p>
                      <a class="text-uppercase font-weight-bold text-decoration-none">
                        {a.eventid.duration} mins
                      </a>
                    </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <h1 style={{ textAlign: "center", padding: "50px" }}>
                No Programs found
              </h1>
            )}

            {/* <div class="col-md-6 col-lg-4 mb-4">
                    <div class="d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                        <h3 class="flaticon-food display-3 font-weight-normal text-secondary mb-3"></h3>
                        <h3 class="mb-3">Pet Feeding</h3>
                        <p>Diam amet eos at no eos sit lorem, amet rebum ipsum clita stet, diam sea est magna diam eos, rebum sit vero stet ipsum justo</p>
                        <a class="text-uppercase font-weight-bold" href="">Read More</a>
                    </div>
                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerViewProgram;
