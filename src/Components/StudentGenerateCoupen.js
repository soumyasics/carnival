import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import axiosInstance from "../baseUrl";
import QRCode from "react-qr-code";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

function StudentGenerateCoupen() {
  const [data, setData] = useState({});
  const [isButtonClickedToday, setIsButtonClickedToday] = useState(false);

  const id = localStorage.getItem("studentId");
  const today = new Date().toISOString().slice(0, 10);


  useEffect(() => {
    axiosInstance
      .post(`/viewstudentbyid/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDownloadClick = () => {
    const divToDownload = document.getElementById('divToDownload');

    html2canvas(divToDownload)
      .then((canvas) => {
        
        canvas.toBlob((blob) => {
          saveAs(blob, 'carnival_foodcoupen.png');
        });
      });
      const today = new Date().toISOString().slice(0, 10);//--------
      localStorage.setItem(`buttonClickedDate_${id}`, today);
    setIsButtonClickedToday(true);//---------
  };


useEffect(() => {
  const lastClickedDate = localStorage.getItem(`buttonClickedDate_${id}`);

  setIsButtonClickedToday(today === lastClickedDate);
}, [id]);

  return (
    <div >
      <StudentNav />
   
      <div
      id="divToDownload"
        style={{
          minHeight: "300px",
          margin: "0 auto",
          maxWidth: 300,
          width: "100%",
          padding:'50px 40px 20px 40px'
        }}
      >
        <b><p class=" mb-4 text-center"><span class="text-primary">Carnival's </span>  <span class="text-secondary">Food Coupen</span></p></b>

        <QRCode
          size={400}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={data}
          viewBox={`0 0 256 256`}
        />
        <div style={{textAlign:'center',marginTop:'15px'}} >
            <p>Name : <b>{data.name}</b></p>
            <p>E-mail : {data.email}</p>
            <p>Section : {data.section}</p>
            <p>Date : {today}</p>
        </div>
       
      </div>
        <div style={{
          margin: "auto",
          maxWidth: 300,
          width: "100%",
          textAlign:'center'
        }}>
                  {/* <button class='btn btn-success' onClick={handleDownloadClick} >Download Now</button> */}
                  {isButtonClickedToday ? (
            <p class='text-danger' >Sorry, You have already generated today's coupen</p>
          ) : (
            <button className='btn btn-success' onClick={handleDownloadClick}>Download Now</button>
          )}
        </div>

    </div>
  );
}

export default StudentGenerateCoupen;
