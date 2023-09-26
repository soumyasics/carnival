const express=require("express")
const blogs=require("./coordinator/blogController")
const router=express.Router()
const studentcontro=require("./Students/studentController")
const admincontro=require("./Admin/admincontroller")
const audiences=require("./Audience/audienceController")
const coordinator=require("./coordinator/coordinatorController")
const volunteer=require("./Volunteer/volunteerController")
const vote=require("./Audience/voteController")
const complaint=require("./Students/complaintContoller")
const result=require("./Result/resultController")

// student
router.post("/addstudent",studentcontro.studentRegistration)//done
router.post("/studentlogin",studentcontro.loginstudent)//done
router.post("/viewstudents",studentcontro.viewstudents)//done
router.post("/viewstudentbyid/:id",studentcontro.viewStudentById)//done
router.post("/editstudentbyid/:id",studentcontro.editStudentById)//done
router.post("/enroll",studentcontro.enroll)//done
router.post("/viewenrollmentsByEventIdforresult/:id",studentcontro.viewenrollmentsByEventIdforresult)
router.post("/viewenrollmentsByEventId/:id",studentcontro.viewenrollmentsByEventId)
router.post("/viewenrollmentsByStudentId/:id",studentcontro.viewenrollmentsByStudentId)//done
router.post("/forgotPwdStudent",studentcontro.forgotPwd)


// admin


router.post("/addevent",admincontro.addevent)//done 
router.post("/viewevents",admincontro.viewevents)//done
router.post("/vieweventsByDate",admincontro.vieweventsByDate)
router.post("/deletevent/:id",admincontro.deletevent)//done
router.post("/viewEventById/:id",admincontro.viewEventById)//done
router.post("/editevent/:id",admincontro.editevent)//done
router.post("/availableStages",admincontro.availableStages)//done-----------------------
router.post("/addStage",admincontro.addStage)//done
router.post("/deletStage/:id",admincontro.deletStage)//done
router.post("/viewAllStages",admincontro.viewAllStages)//done
router.post("/editStage/:id",admincontro.editStage)//done
router.post("/viewStageById/:id",admincontro.viewStageById)//done
router.post("/allottStageAndEvent",admincontro.allottStageAndEvent)//done
router.post("/viewStageAllotmentsByEventid/:id",admincontro.viewStageAllotmentsByEventid)//done----------------------------
router.post("/availableVolunteers",admincontro.availableVolunteers)//done
router.post("/allottVolunteerAndEvent/:id",admincontro.allottVolunteerAndEvent)//done
router.post("/allottCordinatorAndEvent/:id",admincontro.allottCordinatorAndEvent)//done

//aud2
router.post("/bookSeat",admincontro.bookSeat)//done
router.post("/viewSeatsByAudienceId/:id",admincontro.viewSeatsByAudienceId)//done


// Audience 
router.post("/audienceRegistration",audiences.audienceRegistration)//done
router.post("/loginAudience",audiences.loginAudience)//done
router.post("/viewAllaudience",audiences.viewAllaudience)//done
router.post("/viewAudienceById/:id",audiences.viewAudienceById)//done
router.post("/editAudienceById/:id",audiences.editAudienceById)//done
router.post("/deleteAudience/:id",audiences.deleteAudience)//done
router.post("/forgotPwdAudience",audiences.forgotPwd)//done


// coordinator 
router.post("/coordinatorsRegistration",coordinator.coordinatorsRegistration)//done
router.post("/logincoordinators",coordinator.logincoordinators)//done
router.post("/viewcoordinators",coordinator.viewcoordinators)
router.post("/viewcoordinatorsById/:id",coordinator.viewcoordinatorsById)//done
router.post("/editcoordinatorsById/:id",coordinator.editcoordinatorsById)//done
router.post("/delcoordinatorsById/:id",coordinator.delcoordinatorsById)//done
router.post("/viewcoordinatorReqs",coordinator.viewcoordinatorReqs)//done
router.post("/approveCordinators/:id",coordinator.approveCordinators)//done
router.post("/viewApprovedCordinators",coordinator.viewApprovedCordinators)//done
router.post("/forgotPwdCordinator",coordinator.forgotPwd)//done
router.post("/viewEventsByCoId/:id",coordinator.viewEventsByCoId)//done

// volunteer 
router.post("/vounteersRegistration",volunteer.vounteersRegistration)//done
router.post("/loginvounteers",volunteer.loginvounteers)//done
router.post("/viewvounteers",volunteer.viewvounteers)
router.post("/viewvounteersById/:id",volunteer.viewvounteersById)//done
router.post("/editvounteersById/:id",volunteer.editvounteersById)//done
router.post("/delvounteersById/:id",volunteer.delvounteersById)//done
router.post("/viewvounteersReqs",volunteer.viewvounteersReqs)//done
router.post("/approvevounteers/:id",volunteer.approvevounteers)//done
router.post("/viewApprovedvounteers",volunteer.viewApprovedvounteers)//done
router.post("/forgotPwdVolunteer",volunteer.forgotPwd)//done
router.post("/viewEventsByVId/:id",volunteer.viewEventsByVId)//done

//Voting
router.post("/addVote/:id",vote.addVote)//done
router.post("/viewVotesforAdmin",vote.viewVotesforAdmin)
router.post("/viewVotesforEid/:id",vote.viewVotesforEid)//done
router.post("/viewTodayEventsforAud/:id",vote.viewTodayEventsforAud)//done


//complaints
router.post("/addComplaint",complaint.addComplaint)//done
router.post("/viewComplaints",complaint.viewComplaints)//done
router.post("/viewComplaintsByStudid/:id",complaint.viewComplaintsByStudid)//don
router.post("/updateComplaints/:id",complaint.updateComplaints)//----------------------------------------nop
router.post("/delComplaintsById/:id",complaint.delComplaintsById)//don

//blogs
router.post("/addBlog/:id",blogs.upload.array('img'),blogs.addBlog)//don
router.post("/viewAllBlogs",blogs.viewAllBlogs)//done
router.post("/viewBlogsById/:id",blogs.viewBlogsById)//done
router.post("/viewMyBlogsByCid/:id",blogs.viewMyBlogsByCid)//done
router.post("/addReview/:id",blogs.addReview)//done
router.post("/deleteBlogsById/:id",blogs.deleteBlogsById)//done


//results
router.post("/addScoreCoordinator/:id",result.addScoreCoordinator)//done
router.post("/addScoreVolunteer/:id",result.addScoreVolunteer)//done
router.post("/generateGrade/:id",result.generateGrade)//done
router.post("/generateScore/:id",result.generateScore)//done
router.post("/viewGradesByEventid/:id",result.viewGradesByEventid)
router.post("/viewGradesByStudid/:id",result.viewGradesByStudid)
router.post("/viewAllGrades",result.viewAllGrades)//done
//router.post("/findTopScorerGirl",result.findTopScorerGirl)
router.post("/findTopScorer",result.findTopScorer)


module.exports=router