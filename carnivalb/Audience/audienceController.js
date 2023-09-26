const jwt=require('jsonwebtoken')
const mongoose= require("mongoose");
const audienceSchema = require("./audienceSchema");
const votesSchema = require("./votesSchema");
const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

// student registration

const audienceRegistration=(req,res)=>{
   const newStudent=new audienceSchema({
    name:req.body.name,
    place:req.body.place,
    email:req.body.email,
    password:req.body.password,
    age:req.body.age
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



const loginAudience = (req, res) => {
  
  const { email, password } = req.body;

  audienceSchema.findOne({ email }).exec().then (user => {
   

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

  const viewAllaudience=(req,res)=>{
    audienceSchema.find({})
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
const editAudienceById=(req,res)=>{

console.log();
 
  audienceSchema.findByIdAndUpdate({_id:req.params.id},{
    name:req.body.name,
    place:req.body.place,
    email:req.body.email,
    age:req.body.age
   
 
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
//View  student by ID

const viewAudienceById=(req,res)=>{

  audienceSchema.findById({_id:(req.params.id)}).exec()
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


//forgotvPawd students by id
const forgotPwd=(req,res)=>{

  
    
  audienceSchema.findOneAndUpdate({email:req.body.email},{
   
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


const deleteAudience=(req,res)=>{
  audienceSchema.findByIdAndDelete({_id:req.params.id})
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


module.exports={audienceRegistration,loginAudience,viewAllaudience,viewAudienceById,editAudienceById,
forgotPwd,deleteAudience}