const votesSchema = require("../Audience/votesSchema");
const enrollment = require("../Students/enrollment");
const studentSchema = require("../Students/studentSchema");
const gradeSchema = require("./gradeSchema");
const results = require("./resultSchema");

const addScoreCoordinator = async (req, res) => {
    let eventid = ''
    let studid = ''
    await enrollment.findById({ _id: req.params.id }).exec()
        .then(datasss => {
            eventid = datasss.eventid
            studid = datasss.stid
        })

    let count = 0, flag = 0
    await results.find({ enrollid: req.params.id }).exec().then(data1 => {
        if (data1.length > 0) {
            flag = 1
        }
    })
    console.log("fl", flag);
    if (flag == 0) {
        await votesSchema.count({ eid: req.params.id }).exec().then(data2 => {
            count = data2
            console.log("count", data2);
        })

        const resu = new results({
            enrollid: req.params.id,
            votes: count,
            eventid: eventid,
            studId: studid,
            coScore: req.body.score

        })
        await resu.save()
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
        results.findOneAndUpdate({ enrollid: req.params.id }, {
            coScore: req.body.score
        })
            .exec()
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
                    msg: "Data not Inserted"

                })
            })

    }



}
const addScoreVolunteer = async (req, res) => {

    let eventid = ''
    let studid = ''
    await enrollment.findById({ _id: req.params.id }).exec()
        .then(datasss => {
            eventid = datasss.eventid
            studid = datasss.stid
        })


    let count = 0, flag = 0
    await results.find({ enrollid: req.params.id }).exec().then(data1 => {
        if (data1.length > 0) {
            flag = 1
        }
    })
    console.log("fl", flag);
    if (flag == 0) {
        await votesSchema.count({ eid: req.params.id }).exec().then(data2 => {
            count = data2
            console.log("count", data2);
        })

        const resu = new results({
            enrollid: req.params.id,
            votes: count,
            eventid: eventid,
            studId: studid,
            vScore: req.body.score
        })
        await resu.save()
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
        results.findOneAndUpdate({ enrollid: req.params.id }, {
            vScore: req.body.score
        })
            .exec()
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
                    msg: "Data not Inserted"

                })
            })

    }



}

const generateScore = async (req, res) => {

    let votescore = 0, vscore = 0, cscore = 0, total = 0
    await results.findOne({ enrollid: req.params.id })
        .exec()
        .then(data => {
            console.log(data);
            votescore = (data.votes) / 2
            console.log("vs", votescore);
            cscore = ((data.coScore * 100) / 100) / 4
            console.log("cs", cscore
            );

            vscore = ((data.vScore * 100) / 100) / 4
            console.log("vss", vscore);

            total = vscore + cscore + votescore
            console.log("tot", total);

        })
        .catch(err => {
            console.log(err);
            // res.json({
            //     status: 500,
            //     msg: "Data not Inserted"

            // })
        })
    console.log(total);
    await results.findOneAndUpdate({ enrollid: req.params.id }, {
        totalScore: total
    })
        .exec()
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
                msg: "Data not Inserted"

            })
        })
}


const generateGrade = async (req, res) => {
    let ascore = 0, bscore = 0, cscore = 0
    let resul = {
        aid: null,
        bid: null,
        cid: null
    }

    await results.find({ eventid: req.params.id }).populate('enrollid')
        .exec()
        .then(data => {
            console.log(data);
            data.map(x => {
                if (x.totalScore > ascore) {
                    ascore = x.totalScore
                    resul.aid = x.enrollid.stid
                }
            })
            data.map(x => {
                if (x.totalScore > bscore && x.totalScore < ascore) {
                    bscore = x.totalScore
                    resul.bid = x.enrollid.stid
                }
            })
            data.map(x => {
                if (x.totalScore > cscore && x.totalScore < bscore) {
                    cscore = x.totalScore
                    resul.cid = x.enrollid.stid
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Inserted"

            })
        })
    console.log(resul);

    const grades = new gradeSchema({
        gradeA: resul.aid,
        eventid: req.params.id,
        gradeB: resul.bid,
        gradeC: resul.cid,

    })
    await grades.save()
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

const viewScoresByEnrollid = (req, res) => {
    results.findOne({ enrollid: req.params.id }).populate('eventid').populate('studId')
        .exec().then(data => {
            res.json({
                status: 200,
                data: data,
                msg: 'data obtained'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err.stack
            })
        })
}


const viewScoresByEventid = (req, res) => {
    results.findOne({ eventid: req.params.id }).populate('studId')
        .exec().then(data => {
            res.json({
                status: 200,
                data: data,
                msg: 'data obtained'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err.stack
            })
        })
}

const viewGradesByEventid = (req, res) => {
    gradeSchema.findOne({ eventid: req.params.id }).populate('gradeA')
        .populate('gradeB').populate('gradeC').exec().then(data => {
            res.json({
                status: 200,
                data: data,
                msg: 'data obtained'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err.stack
            })
        })
}
//view grade for stud
const viewGradesByStudid = async (req, res) => {
    flag=0
await gradeSchema.find({eventid:req.body.eventid}).exec().then(dta=>{
    if(dta.length>0){
        flag=1
    }
})
    if(flag==1){
    let datas = ''
    await gradeSchema.findOne({ gradeA: req.params.id, eventid: req.body.eventid }).exec().then(data => {
        if (data != null)
            datas = 'Grade A'
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.stack
        })
    })
    await gradeSchema.findOne({ gradeB: req.params.id, eventid: req.body.eventid }).exec().then(data => {
        if (data != null)
            datas = 'Grade B'
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.stack
        })
    })
    await gradeSchema.findOne({ gradeC: req.params.id, eventid: req.body.eventid }).exec().then(data => {
        console.log(data);
        if (data != null)
            datas = 'Grade C'
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.stack
        })
    })
    if (datas != '')
        res.json({
            status: 200,
            msg: "Data obtained",
            data: datas
        })
    else {
        res.json({
            status: 200,
            msg: "Better Luck Next Time "

        })
    }
}
else{
    res.json({
        status: 200,
        msg: "Results Not Published "

    })
}
}

//view all grades 

const viewAllGrades = (req, res) => {
    gradeSchema.find({}).populate('eventid').populate('gradeA')
        .populate('gradeB').populate('gradeC')
        .exec().then(data => {
            res.json({
                status: 200,
                data: data,
                msg: 'data obtained'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err.stack
            })
        })
}


//find top scorer Female

const findTopScorerGirl =async (req, res) => {

    // Use the aggregation pipeline to group by the student and count the number of A grades
    // gradeSchema.aggregate([
    //     {
    //         $group: {
    //             _id: "$gradeA",
    //             totalA: { $sum: 1 },
    //         },
    //     },
    //     {
    //         $sort: {
    //             totalA: -1, // Sort in descending order of totalA (most A grades first)
    //         },
    //     },

    // ])
    //     .then((result) => {
    //         if (result.length > 0) {
    //             const studentWithMostAGradesId = result[0]._id;

    //             console.log("studentWithMostAGradesId", studentWithMostAGradesId);

    //             console.log("array", result);
    //         } else {
    //             console.log("No students with A grades found.");
    //         }
    //     })
    //     .catch((err) => {
    //         console.error("Error finding students with A grades:", err);
    //     });






const sortedStudents=[]
let kt=''

   await results.aggregate([
        {
          $group: {
            _id: "$studId",
            totalScore: { $sum: "$totalScore" },
          },
        },
        {
          $sort: {
            totalScore: -1, // Sorting in descending order of totalScore
          },
        },
      ]).exec((err, sortedStudentss) => {
        if (err) {
            sortedStudents=sortedStudentss
          console.error("Error while fetching sorted students:", err);
          // Handle the error here
        } else {
          console.log("Sorted Students:", sortedStudentss);

          for(let i=0;i<sortedStudentss.length;i++){
            studentSchema.findById({_id:sortedStudentss[i]._id}).exec().then(data=>{
               console.log("st",data);
               if(data.gender=="female"){
               kt=data
              
               }
           })
           if(!(kt==''))
           break
        }
          // Use the sortedStudents as needed
        }
       console.log("kt",kt);
         
      });
      








}


const findTopScorer =async (req, res) => {

const getTopScorerByGender = async (gender) => {
  try {
    const topScorer = await results.aggregate([
      {
        $lookup: {
          from: "studentdetails",
          localField: "studId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $match: {
          "student.gender": gender,
        },
      },
      {
        $group: {
          _id: "$studId",
          totalScore: { $sum: "$totalScore" },
          student: { $first: "$student" },
        },
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    return topScorer[0];
  } catch (err) {
    console.error("Error while finding top scorer:", err);
    throw err;
  }
};

(async () => {
  try {
    const topScorerFemale = await getTopScorerByGender("female");
    const topScorerMale = await getTopScorerByGender("male");

    console.log("Top Scorer Female:", topScorerFemale);
    console.log("Top Scorer Male:", topScorerMale);
    res.json({
        status:200,
        kalathilakam:topScorerFemale,
        kalaprathibha:topScorerMale
    })
  } catch (err) {
    console.error("Error:", err);
  } 
})();
}

module.exports = {
    addScoreCoordinator, addScoreVolunteer, generateScore, generateGrade,
    viewGradesByEventid, viewScoresByEnrollid, viewGradesByStudid, viewAllGrades,findTopScorer
}