const coordinators=require("./coordinatorSchema")
const jwt=require('jsonwebtoken')
const mongoose= require("mongoose");
const stageEventAllotment = require("../Admin/stageEventAllotment");
const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

// student registration

const coordinatorsRegistration=(req,res)=>{
   const newStudent=new coordinators({
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

// login student



const logincoordinators = (req, res) => {
  
  const { email, password } = req.body;

  coordinators.findOne({ email }).exec().then (user => {
   

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

  const viewcoordinators=(req,res)=>{
    coordinators.find({})
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

//view Cordinator reqs
  const viewcoordinatorReqs=(req,res)=>{
    coordinators.find({isactive:false})
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
const viewApprovedCordinators=(req,res)=>{
    coordinators.find({isactive:true})
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
  
//approve  Cordinator reqs
const approveCordinators=(req,res)=>{
    coordinators.findByIdAndUpdate({_id:req.params.id},{isactive:true})
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

  //update student by id
const editcoordinatorsById=(req,res)=>{

console.log();
 
coordinators.findByIdAndUpdate({_id:req.params.id},{
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




  //delete coordinators by id
  const delcoordinatorsById=(req,res)=>{

    console.log();
     
    coordinators.findByIdAndDelete({_id:req.params.id})
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

const viewcoordinatorsById=(req,res)=>{

  coordinators.findById({_id:(req.params.id)}).exec()
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


//forgotvPawd students by id
const forgotPwd=(req,res)=>{

  
    
  coordinators.findOneAndUpdate({email:req.body.email},{
   
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

//View  my events by co id

const viewEventsByCoId=(req,res)=>{
  
    stageEventAllotment.find({coId:req.params.id}).populate('eventid').exec()
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


module.exports={coordinatorsRegistration,
  logincoordinators,viewcoordinators,
  viewcoordinatorsById,editcoordinatorsById,
viewApprovedCordinators,approveCordinators,
viewcoordinatorReqs,forgotPwd,delcoordinatorsById,viewEventsByCoId}