
const event=require("./eventschema")
const student=require("../Students/studentSchema")
const seatBooking=require('./seatBooking')
const stageSchema = require("./stageSchema")
const stageEventAllotment = require("./stageEventAllotment")
const volunteerSchema = require("../Volunteer/volunteerSchema")
const enrollment = require("../Students/enrollment")

    const addevent=(req,res)=>{
      console.log("here");
      const newevent=new event({
       eventname:req.body.eventname,
       category:req.body.category,
       duration:req.body.duration,
       eventtype:req.body.eventtype
      

  
     })
     newevent.save()
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
              msg:"Data not Inserted",
              Error:err
      })
     })
    

    }

    const viewevents=(req,res)=>{
      event.find({})
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
            msg:"Data not found",
            Error:err
        })
    })
    
    }
    const deletevent=async(req,res)=>{
      let flag=0
      await enrollment.find({eventid:req.params.id}).exec().then(data=>{
        if(data.length>0)
        flag=1
      })
      if(flag==0){
        await stageEventAllotment.findOneAndDelete({eventid:req.params.id}).exec().then(datas=>{
          console.log("deleted");
        })
        .catch(err=>{
          
          console.log(err);
      })
      await event.findByIdAndDelete({_id:(req.params.id)})
      .exec()
      .then(response=>{
          res.json({
            status:200,
              msg:"Deleted Doc"
          })
      })
      .catch(err=>{
          res.json({
            status:500,
              msg:"err"
          })
          console.log(err);
      })
    }
    else{
      res.json({
        status:500,
          msg:"Cannot be deleted as we have Enrollments for this event"
      })
    }
  }

  //View  Event by ID

const viewEventById=(req,res)=>{
  console.log(req.body.id);
    event.findById({_id:(req.params.id)}).exec()
    .then(data=>{
    emps=data
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  
  const editevent=(req,res)=>{
    event.findByIdAndUpdate({_id:req.params.id},
    {   
      eventname:req.body.eventname,
      category:req.body.category,
     duration:req.body.duration,
     eventtype:req.body.eventtype
    })
    .then(response=>{
        res.json({
        status:200,
        msg:"udated success"
        })
    })
    .catch(err=>{
        res.json({
            status:500,
            msg:"can't be updated"
        })
    })
}

// show availabe stages
const availableStages=async (req,res)=>{
  let na=[]
  if(req.body.date!=null){
  await stageEventAllotment.find({date:req.body.date})
  .exec().then(data=>{
    
    if(data.length>0){
    data.map(x=>{na.push(x.stageid)})
    console.log(na);
    }
  })
  .catch(err=>{
      res.json({
          status:500,
          msg:"can't be updated"
      })
  })
  await stageSchema.find({_id:{$nin:na}}).exec().then(data1=>{
    res.json({
      data:200,
      data:data1
    })
  }).catch(err=>{
    res.json({
      status:500,
      err:err
    })
  })
  }
  else{
    res.json({
      status:500,
      msg:"choose date"
  })
  }
  }
  
  // show availabe stages
const availableVolunteers=async (req,res)=>{
  let na=[]
  if(req.body.date!=null){
  await stageEventAllotment.find({date:req.body.date})
  .exec().then(data=>{
    
    if(data.length>0){
    data.map(x=>{na.push(x.vid)})
    console.log(na);
    }
  })
  .catch(err=>{
      res.json({
          status:500,
          msg:"can't be updated"
      })
  })
  await volunteerSchema.find({_id:{$nin:na},isactive:true}).exec().then(data1=>{
    res.json({
      data:200,
      data:data1
    })
  }).catch(err=>{
    res.json({
      status:500,
      err:err
    })
  })
  }
  else{
    res.json({
      status:500,
      msg:"choose date"
  })
  }
  }
   
const allottStageAndEvent=(req,res)=>{
 
  const allot=new stageEventAllotment({
    eventid:req.body.eventid,
    date:req.body.date,
    
      stageid:req.body.stageid
   
  })
  allot.save()
  .then(response=>{
      res.json({
      status:200,
      msg:"udated success"
      })
  })
  .catch(err=>{
      res.json({
          status:500,
          msg:"can't be updated"
      })
  })
}

    
const allottVolunteerAndEvent=(req,res)=>{
  stageEventAllotment.findOneAndUpdate({eventid:req.params.id},{
    vid:req.body.vid
  }).exec()

  .then(response=>{
      res.json({
      status:200,
      msg:"udated success"
      })
  })
  .catch(err=>{
      res.json({
          status:500,
          msg:"can't be updated"
      })
  })
}

     
const allottCordinatorAndEvent=(req,res)=>{
  stageEventAllotment.findOneAndUpdate({eventid:req.params.id},{
    coId:req.body.coId
  }).exec()

  .then(response=>{
      res.json({
      status:200,
      msg:"udated success"
      })
  })
  .catch(err=>{
      res.json({
          status:500,
          msg:"can't be updated"
      })
  })
}
 
  
const addStage=(req,res)=>{
  const stage=new stageSchema({
    stageNo:req.body.stageNo,
    sc:req.body.sc

 })
 stage.save()
 .then(data=>{
  res.json({
      status:200,
      msg:"Inserted successfully",
      data:data
  })
 })
 .catch(err=>{
  res.json({
      status:500,
          msg:"Data not Inserted",
          Error:err
  })
 })


}

const viewAllStages=(req,res)=>{
  stageSchema.find({})
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
        msg:"Data not found",
        Error:err
    })
})

}


//view stage allotmemts
const viewStageAllotments=(req,res)=>{
  stageEventAllotment.find({}).populate('stageid').populate('eventid')
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
        msg:"Data not found",
        Error:err
    })
})

}
//view stage allotmemts By Event Id
const viewStageAllotmentsByEventid=(req,res)=>{
  stageEventAllotment.find({eventid:req.params.id}).populate('stageid')
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
        msg:"Data not found",
        Error:err
    })
})

}
//view stage allotmemts By Stage Id
const viewStageAllotmentsByStageid=(req,res)=>{
  stageEventAllotment.find({stageid:req.params.id}).populate('eventid')
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
        msg:"Data not found",
        Error:err
    })
})

}

const deletStage=(req,res)=>{
    stageSchema.findByIdAndDelete({_id:req.params.id})
  .exec()
  .then(response=>{
      res.json({
        status:200,
          msg:"Deleted Doc"
      })
  })
  .catch(err=>{
      res.json({
        status:500,
          msg:"err"
      })
      console.log(err);
  })
}



//View  stage by ID---------------------------------------------------------------------------------------------------

const viewStageById=(req,res)=>{
  console.log(req.body.id);
  stageSchema.findById({_id:(req.params.id)}).exec()
    .then(data=>{
    emps=data
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }


const editStage=(req,res)=>{
stageSchema.findByIdAndUpdate({_id:req.params.id},
{   
  stageNo:req.body.stageNo,
  sc:req.body.sc

})
.then(response=>{
    res.json({
    status:200,
    msg:"udated success"
    })
})
.catch(err=>{
    res.json({
        status:500,
        msg:"can't be updated"
    })
})
}

const bookSeat=async(req,res)=>{
  let flag=0,stage,sc=0,count=0;
  await seatBooking.find({aid:req.body.aid,
    eventid:req.body.eventid
    }).exec().then(data=>{
      if(data.length>0){
       flag=1
      }
      else
      flag=0
    }).catch(err=>{
      console.log(err);
    })
    if(flag==0){
await stageEventAllotment.findOne({eventid:req.body.eventid}).then(data1=>{
  //console.log(data1);
  stage=data1.stageid
  console.log("stage :",stage);
}).catch(err=>{
  console.log(err);
})
await stageSchema.findById({_id:stage}).then(data2=>{
  //console.log(data2);
  sc=data2.sc
  console.log("sc:",sc);
}).catch(err=>{
  console.log(err);
})
// await stageSchema.findById({_id:stage}).then(data2=>{
//   sc=data2.sc
//   console.log("sc:",sc);

// }).catch(err=>{
//   console.log(err);
// })
await seatBooking.countDocuments({eventid:req.body.eventid}).then(data3=>{
 
  count=data3
   console.log("count : ",count);
 
}).catch(err=>{
  console.log(err);
})
if(sc>count){
const seat=new seatBooking({
  aid:req.body.aid,
  eventid:req.body.eventid,
  stageid:stage

})
await seat.save()
.then(data=>{
 res.json({
     status:200,
     msg:"Inserted successfully",
     data:data
 })
})
.catch(err=>{
 res.json({
     status:500,
         msg:"Data not Inserted",
         Error:err
 })
})
}
else{
  res.json({
    status:500,
        msg:"Sorry !! No Seats Available"
})
}

    }
  else{
    res.json({
      status:500,
          msg:"You Are Already Reserved Your Seat !!"
         
  })
  }

}

//view my reserved seats
const viewSeatsByAudienceId=(req,res)=>{
  seatBooking.find({aid:req.params.id}).populate('eventid').populate('aid').populate('stageid')
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
        msg:"Data not found",
        Error:err
    })
})

}

// view events by date
const vieweventsByDate=async(req,res)=>{
  let date1=new Date()
  let events=[]
  await stageEventAllotment.find({}).exec().then(dats=>{

    dats.map(x=>{
      if(x.date.getDate()==date1.getDate())
      events.push(x.eventid)
    })
    // events=dats
  })
  event.find({_id:{$in:events}})
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
        msg:"Data not found",
        Error:err
    })
})
}





module.exports={addevent,
  viewevents,
  deletevent,
  editevent,
  availableStages,
  addStage,
  editStage,
  deletStage,
  viewAllStages,
  allottStageAndEvent,
viewStageAllotments,
viewStageAllotmentsByEventid,
viewStageAllotmentsByStageid,viewStageById,viewEventById,bookSeat,viewSeatsByAudienceId,
allottCordinatorAndEvent,availableVolunteers,allottVolunteerAndEvent,vieweventsByDate
}