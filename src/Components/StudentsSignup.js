import React from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { StudentRegSchema } from "./Schema";
import axiosInstance from "../baseUrl";

function StudentsSignup() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log("hi");
    axiosInstance
      .post("/addstudent", values)
      .then((res) => {
        console.log("woking", res);
        console.log(res.data);
        if (res.data.status == 200) {
          toast.success("Registration Successful");
          navigate("/student_login");
        } else {
          toast.error("Registration Failed");
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Registration Failed");
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        section: "",
        gender: "",
      },
      validationSchema: StudentRegSchema,
      onSubmit,
    });

  return (
    <div>
      <Navbar />
      <div class="container-fluid pt-5">
        <div class="d-flex flex-column text-center mb-5 pt-5">
          <h4 class="text-secondary mb-3">Signup</h4>
          <h1 class="display-4 m-0">
            Students <span class="text-primary">Signup</span>
          </h1>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 mb-5">
            <div class="contact-form">
              <div id="success"></div>
              <form name="sentMessage" id="contactForm" onSubmit={handleSubmit}>
                <div class="control-group">
                  <input
                    type="text"
                    class="form-control p-4"
                    placeholder="Your Name"
                    required="required"
                    data-validation-required-message="Please enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                  />
                  <p class="help-block text-danger">
                    {errors.name && touched.name && (
                      <span className="err">{errors.name}</span>
                    )}
                  </p>
                </div>
                <div class="control-group">
                  <input
                    type="email"
                    class="form-control p-4"
                    id="email"
                    placeholder="Your Email"
                    required="required"
                    data-validation-required-message="Please enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p class="help-block text-danger">
                    {errors.email && touched.email && (
                      <p className="err">{errors.email}</p>
                    )}
                  </p>
                </div>

                <div class="form-group" style={{ border: "1px solid #ced4da" }}>
                  <select
                    class="custom-select border-0 px-4"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <p class="help-block text-danger">
                  {errors.gender && touched.gender && (
                    <p className="err">{errors.gender}</p>
                  )}
                </p>

                <div class="form-group" style={{ border: "1px solid #ced4da" }}>
                  <select
                    class="custom-select border-0 px-4"
                    name="section"
                    value={values.section}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Select Section
                    </option>
                    <option value="Lower Primary">Lower Primary</option>
                    <option value="Upper Primary">Upper Primary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                  </select>
                </div>
                <p class="help-block text-danger">
                  {errors.section && touched.section && (
                    <p className="err">{errors.section}</p>
                  )}
                </p>
                <div class="control-group">
                  <input
                    type="password"
                    class="form-control p-4"
                    id="password"
                    placeholder="Your Password"
                    required="required"
                    data-validation-required-message="Please enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <p class="help-block text-danger">
                  {errors.password && touched.password && (
                    <p className="err">{errors.password}</p>
                  )}
                </p>

                <div>
                  <button
                    class="btn btn-primary py-3 px-5"
                    type="submit"
                    id="sendMessageButton"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsSignup;
