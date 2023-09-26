
const votesSchema = require("./votesSchema");
const seatBooking = require("../Admin/seatBooking");
const stageEventAllotment = require("../Admin/stageEventAllotment")
const mongoose=require('mongoose');
const enrollment = require("../Students/enrollment");
const resultSchema = require("../Result/resultSchema");

const addVote=async(req,res)=>{
    let flag=true
await votesSchema.findOne({aid:req.params.id,eid:req.body.eid}).exec().then(data=>{
    if(data)
    flag=false
}).catch(err=>{
    console.log(err);
})
if(flag==true){
    let count=0
    await votesSchema.findOne({eid:req.body.eid}).exec().then(data=>{
        if(data)
        count=data.count
    })
    const newStudent=new votesSchema({
     count:count+1,
     aid:req.params.id,
     eid:req.body.eid
    })
    newStudent.save()
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
else{
    res.json({
        status:500,
            msg:"You have already voted for this performance"
           
    })
}
 }
 
 
 const viewVotesforAdmin=(req,res)=>{
    votesSchema.find({}).populate('aid').populate('eid')
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

  
  const viewVotesforEid=(req,res)=>{
    votesSchema.find({eid:req.params.id}).populate('aid')
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

  // view today's events for audience

  const viewTodayEventsforAud=async(req,res)=>{
    let date=new Date()
    eventssss=[],events=[]

    await seatBooking.find({aid:req.params.id}).populate('eventid')
  .exec()
  .then(data=>{
  
data.map(x=>{
    eventssss.push(x.eventid._id)
})
  })
  console.log("eventsss",eventssss);
    await stageEventAllotment.find({eventid:{$in:eventssss}})
    .exec()
    .then(datas=>{
        datas.map(x=>{
     
     console.log("datasd",x.date,"fsfds",date);
        if(x.date.getDate()==date.getDate()){
            console.log("true");
            events.push(x.eventid._id)
            console.log("events",events);
        }
    
    })
    
  
})
console.log("nowe",events);
await enrollment.find({eventid:{$in:events}}).populate('stid').exec().then(data3=>{
    
res.json({
      status:200,
      msg:"success",
    
      data:data3
    })
})
.catch(err=>{
    console.log(err);
    res.json({
        status:500,
        msg:"Data not found",
        Error:err
    })
})

  
  }

 module.exports={addVote,viewVotesforAdmin,viewVotesforEid,viewTodayEventsforAud}