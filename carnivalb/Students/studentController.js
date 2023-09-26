const students = require("./studentSchema")
const jwt = require('jsonwebtoken')
const enrollment = require('./enrollment')
const counter = require("./counter");
const stageEventAllotment = require("../Admin/stageEventAllotment");
const mongoose = require("mongoose")
const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

// student registration

const studentRegistration = (req, res) => {
  const newStudent = new students({
    name: req.body.name,
    section: req.body.section,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password
  })
  newStudent.save()
    .then(data => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data
      })
    })
    .catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err.stack
      })
    })
}

// login student



const loginstudent = (req, res) => {

  const { email, password } = req.body;

  students.findOne({ email }).exec().then(user => {


    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.password != password) {
      return res.status(500).json({ msg: 'incorrect pwd' });
    }


    const token = createToken(user);

    res.status(200).json({ user, token });
  })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ msg: 'Something went wrong' });

    })

};
//validate


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: 'ok', user: decodedToken.userId });
  });
  console.log(req.user);
};

//Login applicant --finished

const viewstudents = (req, res) => {
  students.find({})
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "success",
        data: data
      })

    })
    .catch(err => {
      res.json({
        status: 500,
        msg: "Data not Obtained",
        Error: err
      })
    })

}

//update student by id
const editStudentById = (req, res) => {

  console.log();



  students.findByIdAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    section: req.body.section,
    email: req.body.email


  })
    .exec().then(data1 => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      })
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}
//View  student by ID

const viewStudentById = (req, res) => {
  console.log(req.body.id);
  students.findById({ _id: (req.params.id) }).exec()
    .then(data => {
      emps = data
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data
      })

    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      })
    })

}


//forgotvPawd students by id
const forgotPwd = (req, res) => {



  students.findOneAndUpdate({ email: req.body.email }, {

    password: req.body.password
  })
    .exec().then(data => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      })
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}


// student enrollment

const enroll = async (req, res) => {
  let datas = null
  let count = 0
  let stage = ''
  
  let counts=await enrollment.countDocuments({ stid: req.body.stid })
console.log("cou",counts);
  await enrollment.find({ eventid: req.body.eventid, stid: req.body.stid }).exec().then(data3 => {
    datas = data3
    console.log(datas);
  })
  if (datas.length <= 0 ) {
    if(counts<4){
    await counter.find({}).exec().then(data1 => {
      console.log("count :", data1);
      count = data1[0].num
    })
    await counter.updateOne({}, { num: (count + 1) }).exec().then(data2 => {
      console.log("count upd");

    })
    await stageEventAllotment.find({ eventid: req.body.eventid }).exec()
      .then(dataee => {
        console.log("dat", dataee);
        stage = dataee[0].stageid
      })
    const newStudent = new enrollment({
      eventid: req.body.eventid,
      stid: req.body.stid,
      stageid: stage,
      chestNo: count
    })
    await newStudent.save()
      .then(data => {
        res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data
        })
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Inserted",
          Error: err.stack
        })
      })
    } else {
      res.json({
        status: 500,
        msg: "You have already enrolled for 4 other items !!"
  
      })
    }
  } else {
    res.json({
      status: 500,
      msg: "alredy enrolled"

    })
  }
}


//View all enrollments  by event ID

const viewenrollmentsByEventId = (req, res) => {

  enrollment.find({ eventid: req.params.id }).populate('stid').exec()
    .then(data => {

      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data
      })

    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      })
    })

}


//View all enrollments  by stud  ID

const viewenrollmentsByStudentId = (req, res) => {

  enrollment.find({ stid: req.params.id }).populate('eventid').populate('stageid').exec()
    .then(data => {

      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data
      })

    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      })
    })

}


//View  enrollments  by event ID for adding result

const viewenrollmentsByEventIdforresult = async (req, res) => {
  let date = (new Date()).getDate()
  let flag = 0;

  await stageEventAllotment.findOne({ eventid: req.params.id }).exec()

    .then(data => {
      console.log(data.date.getDate(), "date", date, "check", ((data.date.getDate() == date - 1) || (data.date.getDate() == date - 2)));
      if ((data.date.getDate() == date - 1) || (data.date.getDate() == date - 2)) {
        console.log("check", data.date.getDate() + 2);
        flag = 1
      }
      

    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      })
    })
  if (flag == 1) {
    await enrollment.find({ eventid: req.params.id }).exec().then(datas => {
      res.json({
        status: 200,
        msg: "Data obtained Successfully",
        data: datas
      })
    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      })
    })
  } else{
    
      res.json({
        status: 500,
        msg: "You can't add the result today",
        Error: err
      })
    
  }
}



module.exports = {
  studentRegistration, loginstudent, viewstudents,forgotPwd,
  viewStudentById, editStudentById, enroll, viewenrollmentsByEventId, viewenrollmentsByEventIdforresult,viewenrollmentsByStudentId
}