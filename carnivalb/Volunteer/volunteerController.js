const vounteers=require("./volunteerSchema")
const jwt=require('jsonwebtoken')
const mongoose= require("mongoose")
const secret = 'your-secret-key'; // Replace this with your own secret key
const stageEventAllotment=require('../Admin/stageEventAllotment')
const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

// vounteers registration

const vounteersRegistration=(req,res)=>{
   const newStudent=new vounteers({
    name:req.body.name,
    contact:req.body.contact,
    email:req.body.email,
    aadhar:req.body.aadhar,
    password:req.body.password
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
            msg:"Data not Inserted",
            Error:err.stack
    })
   })
}

// login vounteers



const loginvounteers = (req, res) => {
  
  const { email, password } = req.body;

  vounteers.findOne({ email }).exec().then (user => {
   

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

      if (user.password!=password) {
        return res.status(500).json({ msg: 'incorrect pwd' });
      }

    
      const token = createToken(user);

      res.status(200).json({ user, token });
    })
    .catch(err=>{
      console.log(err);
        return res.status(500).json({ msg: 'Something went wrong' });
      
    })
  
};
//validate


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1",token);
  console.log("secret",secret);
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: 'Unauthorized' ,err:err});
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: 'ok' ,user:decodedToken.userId});
  });
  console.log(req.user);
};

//Login applicant --finished

  const viewvounteers=(req,res)=>{
    vounteers.find({})
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

//view vounteers reqs
  const viewvounteersReqs=(req,res)=>{
    vounteers.find({isactive:false})
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

//view approved cordinators
const viewApprovedvounteers=(req,res)=>{
  vounteers.find({isactive:true})
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
  
//approve  vounteers reqs
const approvevounteers=(req,res)=>{
  vounteers.findByIdAndUpdate({_id:req.params.id},{isactive:true})
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

  //update vounteers by id
const editvounteersById=(req,res)=>{

console.log();
 
vounteers.findByIdAndUpdate({_id:req.params.id},{
    name:req.body.name,
    contact:req.body.contact,
    email:req.body.email,
    aadhar:req.body.aadhar
   
 
    })
.exec().then(data1=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}





  //delete vounteers by id
  const delvounteersById=(req,res)=>{

    console.log();
     
    vounteers.findByIdAndDelete({_id:req.params.id})
    .exec().then(data1=>{
      res.json({
          status:200,
          msg:"Updated successfully"
      })
    }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Updated",
          Error:err
      })
    })
    }
//View  student by ID

const viewvounteersById=(req,res)=>{
console.log(req.body.id);
  vounteers.findById({_id:(req.params.id)}).exec()
  .then(data=>{
 
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


//forgotvPawd vounteers by id
const forgotPwd=(req,res)=>{

  console.log(req.body.email);
  console.log(req.body.password);
    
  vounteers.updateOne({email:req.body.email},{
   
    password:req.body.password
    })
.exec().then(data=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
//View  my events by V id

const viewEventsByVId=(req,res)=>{
  
  stageEventAllotment.find({vid:req.params.id}).populate('eventid').exec()
  .then(data=>{
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


module.exports={vounteersRegistration,loginvounteers,viewvounteers,viewvounteersById,editvounteersById,
viewApprovedvounteers,approvevounteers,viewvounteersReqs,forgotPwd,delvounteersById,
viewEventsByVId}