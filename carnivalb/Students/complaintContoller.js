
const complaints = require("./complaints");

const addComplaint=async(req,res)=>{
let date=new Date()
    const newCom=new complaints({
        studid:req.body.id,
        complaint:req.body.complaint,
        status:"pending",
        date:date

    })
    newCom.save()
    .then(data=>{
     res.json({
         status:200,
         msg:"Inserted successfully",
         data:data
     })
    })
    .catch(err=>{
     console.log(err);
     res.json({
         status:500,
             msg:"Data not Inserted"
            
    })
})

 }
 
 
 const viewComplaints=(req,res)=>{
    complaints.find({}).populate('studid').sort({date:1})
    .exec()
    .then(data=>{
      console.log(data);
      res.json({
        status:200,
        msg:"success",
        data:data
      })
    
    })
  .catch(err=>{
    console.log(err);

      res.json({
          status:500,
          msg:"Data not Obtained",
          Error:err
          
      })
  })
  
  }

  
 
 const updateComplaints=(req,res)=>{
    complaints.findByIdAndUpdate({_id:req.params.id},{
        status:req.body.status,
        respfrom:req.body.respfrom,
        cid:req.body.cid,
        vid:req.body.vid,
        response:req.body.response,        
    })
    .exec()
    .then(data=>{
      res.json({
        status:200,
        msg:"success"
      })
    
    })
  .catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"Data not Obtained",
          Error:err
      })
  })
  
  }

  const viewComplaintsByStudid=(req,res)=>{
    complaints.find({studid:req.params.id}).sort({date:1})
    .exec()
    .then(data=>{
      res.json({
        status:200,
        msg:"success",
        data:data
      })
    
    })
  .catch(err=>{
      res.json({
          status:500,
          msg:"Data not Obtained",
          Error:err
      })
  })
  
  }
  

  const delComplaintsById=(req,res)=>{
    complaints.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(data=>{
      res.json({
        status:200,
        msg:"removed"
      })
    
    })
  .catch(err=>{
      res.json({
          status:500,
          msg:"Data not Obtained",
          Error:err
      })
  })
  
  }
  

 module.exports={addComplaint,viewComplaints,updateComplaints,viewComplaintsByStudid,delComplaintsById}