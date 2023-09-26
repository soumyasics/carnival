import React, { useEffect, useState } from "react";
import CoordinatorNav from "./CoordinatorNav";
import axiosInstance from "../baseUrl";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CoordinatorAddBlog() {
  const cid = localStorage.getItem("coordinatorId");

  const [title, setTitle] = useState('');
  const [p1, setParagraph1] = useState('');
  const [p2, setParagraph2] = useState('');
  const [p3, setParagraph3] = useState('');
  const [img, setImages] = useState([]);

  const handleImageChange = (e) => {
    // Handles multiple files selected
    const files = e.target.files;
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
    }

    setImages(imageFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (p1.length < 700 || p2.length < 700 || p3.length < 700) {
      // Display an error message here, e.g., using toast from "react-toastify" library
      toast.error('Paragraphs should have a minimum length of 700 characters.');
      return;
    }
    console.log(p1.length);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('p1', p1);
    formData.append('p2', p2);
    formData.append('p3', p3);

    for (let i = 0; i < img.length; i++) {
      formData.append('img', img[i]);
    }

    console.log('hi',formData);

    

    axiosInstance
      .post(`/addBlog/${cid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        if(response.status==200){
          toast.success('Added')

        }else{
          toast.error('Failed')
        }
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed')

        // Handle error, e.g., show an error message
      });
  };


 

  return (
    <div>
      <CoordinatorNav />
      <div class="container-fluid bg-light">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="bg-primary py-5 px-4 px-sm-5">
                <form class="py-5" onSubmit={handleSubmit}>
                  <div class='d-flex justify-content-between' >
                      <h5>Add</h5>
                      <Link to={'/coordinator_view_blogs'} style={{textDecoration:'none'}}><h5>View Blogs</h5></Link>

                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control border-0 p-4"
                      placeholder="Title"
                      name="title"
                      value={title} onChange={(e) => setTitle(e.target.value)} 
                      required
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      type="text"
                      class="form-control border-0 p-4"
                      placeholder="Paragraph 1"
                      name="p1"
                      minLength={1000}
                      value={p1} onChange={(e) => setParagraph1(e.target.value)} 
                      required
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      type="text"
                      class="form-control border-0 p-4"
                      placeholder="Paragraph 2"
                      name="p2"
                      minLength={1000}
                      value={p2} onChange={(e) => setParagraph2(e.target.value)} 
                      required
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      type="text"
                      class="form-control border-0 p-4"
                      placeholder="Paragraph 3"
                      name="p3"
                      minLength={1000}
                      value={p3} onChange={(e) => setParagraph3(e.target.value)} 
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control border-0 p-4"
                      id="formFile"
                     name="img"
                      
                      onChange={handleImageChange}
                      multiple
                      required
                    />
                  </div>

                  <div>
                    <button
                      class="btn btn-dark btn-block border-0 py-3"
                      type="submit"
                    >
                      Add
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

export default CoordinatorAddBlog;
