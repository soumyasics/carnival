import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "remixicon/fonts/remixicon.css";
import './App.css';
import CoordinatorLogin from './Components/CoordinatorLogin';
import Footer from './Components/Footer';
import StudentsLogin from './Components/StudentsLogin';
import Home from './Components/Home';
import AboutCall from './Components/AboutCall';
import StudentsSignup from './Components/StudentsSignup';
import CoordinatorSignup from './Components/CoordinatorSignup';
import AudienceViewProgrammes from './Components/AudienceViewProgrammes';
import AudienceResults from './Components/AudienceResults';
import AudienceSingleViewProgram from './Components/AudienceSingleViewProgram';
import AdminHome from './Components/AdminHome';
import AdminViewPrgm from './Components/AdminViewPrgm';
import AdminCoordinator from './Components/AdminCoordinator';
import AdminReultView from './Components/AdminReultView';
import AdminAddPrgm from './Components/AdminAddPrgm';
import AdminAddCoordinator from './Components/AdminAddCoordinator';
import StudentProfile from './Components/StudentProfile';
import AdminLogin from './Components/AdminLogin';
import AdminStageAndSeat from './Components/AdminStageAndSeat';
import StudentHome from './Components/StudentHome';
import StudentResult from './Components/StudentResult';
import StudentSinglePrgm from './Components/StudentSinglePrgm';
import StudentEditProf from './Components/StudentEditProf';
import AdminEditPrgm from './Components/AdminEditPrgm';
import CoordinatorForgotPswd from './Components/CoordinatorForgotPswd';
import CoordinatorHome from './Components/CoordinatorHome';
import CoordinatorProfile from './Components/CoordinatorProfile';
import CoordinatorEditProfile from './Components/CoordinatorEditProfile';
import AudienceLogin from './Components/AudienceLogin';
import AudienceSignin from './Components/AudienceSignin';
import AudienceProfile from './Components/AudienceProfile';
import AudienceEditProfile from './Components/AudienceEditProfile';
import AudienceForgotPwd from './Components/AudienceForgotPwd';
import AdminAudience from './Components/AdminAudience';
import VolunteerLogin from './Components/VolunteerLogin';
import VolunteerSignin from './Components/VolunteerSignin';
import VolenteerForgotPwd from './Components/VolenteerForgotPwd';
import VolunteerHome from './Components/VolunteerHome';
import VolunteerProfile from './Components/VolunteerProfile';
import VolunteerEditProf from './Components/VolunteerEditProf';
import AdminVolunteers from './Components/AdminVolunteers';
import AdminVolunteerReq from './Components/AdminVolunteerReq';
import AdminAllotStag from './Components/AdminAllotStag';
import AdminViewStages from './Components/AdminViewStages';
import AdminEditStage from './Components/AdminEditStage';
import CoordinatorViewStudents from './Components/CoordinatorViewStudents';
import CoordinatorViewPrograms from './Components/CoordinatorViewPrograms';
import VolunteerViewStudents from './Components/VolunteerViewStudents';
import VolunteerViewProgram from './Components/VolunteerViewProgram';
import StudentComplaint from './Components/StudentComplaint';
import StudentViewComplaints from './Components/StudentViewComplaints';
import AdminViewComplaints from './Components/AdminViewComplaints';
import CoordinatorViewComplaint from './Components/CoordinatorViewComplaint';
import CoordAddComplaintStatus from './Components/CoordAddComplaintStatus';
import AudienceHome from './Components/AudienceHome';
import CoordinatorAddBlog from './Components/CoordinatorAddBlog';
import VolunteerViewComplaints from './Components/VolunteerViewComplaints';
import VolunteerAddComplaintStatus from './Components/VolunteerAddComplaintStatus';
import AudienceViewSeatBooking from './Components/AudienceViewSeatBooking';
import AudienceAddVote from './Components/AudienceAddVote';
import AdminViewVotes from './Components/AdminViewVotes';
import AdminViewEnrollVotes from './Components/AdminViewEnrollVotes';
import CoordinatoeViewEnrollments from './Components/CoordinatoeViewEnrollments';
import CoordinatorViewVotes from './Components/CoordinatorViewVotes';
import VolunteerViewEnrollments from './Components/VolunteerViewEnrollments';
import VolunteerViewVotes from './Components/VolunteerViewVotes';
import StudentFoodCoupen from './Components/StudentFoodCoupen';
import StudentGenerateCoupen from './Components/StudentGenerateCoupen';
import AdminAddVolunteer from './Components/AdminAddVolunteer';
import CoordinatorAddScore from './Components/CoordinatorAddScore';
import VolunteerAddScore from './Components/VolunteerAddScore';
import StudentViewEnroll from './Components/StudentViewEnroll';
import StudentViewEnrollResult from './Components/StudentViewEnrollResult';
import Blog from './Components/Blog';
import BlogDetail from './Components/BlogDetail';
import CoordinatorViewBlogs from './Components/CoordinatorViewBlogs';
import CoordinatorViewSingleBlog from './Components/CoordinatorViewSingleBlog';
import AdminViewWinners from './Components/AdminViewWinners';
import StudentViewWinners from './Components/StudentViewWinners';
import AudienceNav from './Components/AudienceNav';
import AudienceViewWinners from './Components/AudienceViewWinners';
import StudentForgotPass from './Components/StudentForgotPass';

function App() {

  //local
  //const url='http://localhost:4014'

  //server
  const url='http://43.204.92.123/projects/carnival/upload'

  return (
    <BrowserRouter basename='/projects/carnival' >
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<AboutCall/>} />
        <Route path='/blog' element={<Blog url={url} />} />
        <Route path='/blog_detail/:id' element={<BlogDetail url={url} />} />
        <Route path='/student_login' element={<StudentsLogin/>} />
        <Route path='/student_signup' element={<StudentsSignup/>} />
        <Route path='/student_profile' element={<StudentProfile/>} />
        <Route path='/student_edit_profile' element={<StudentEditProf/>} />
        <Route path='/student_forgot_password' element={<StudentForgotPass/>} />
        <Route path='/student_home' element={<StudentHome/>} />
        <Route path='/student_view_winners' element={<StudentViewWinners/>} />
        <Route path='/student_result' element={<StudentResult/>} />
        <Route path='/student_complaint' element={<StudentComplaint/>} />
        <Route path='/student_view_complaint' element={<StudentViewComplaints/>} />
        <Route path='/student_food_coupen' element={<StudentFoodCoupen/>} />
        <Route path='/student_view_enroll' element={<StudentViewEnroll/>} />
        <Route path='/student_generate_coupen' element={<StudentGenerateCoupen/>} />
        <Route path='/student_program_view/:id' element={<StudentSinglePrgm/>} />
        <Route path='/student_enrollment_result/:eventid' element={<StudentViewEnrollResult/>} />
        <Route path='/coordinator_login' element={<CoordinatorLogin/>} />
        <Route path='/coordinator_signup' element={<CoordinatorSignup/>} />
        <Route path='/coordinator_forgotpwd' element={<CoordinatorForgotPswd/>} />
        <Route path='/coordinator_home' element={<CoordinatorHome/>} />
        <Route path='/coordinator_view_students' element={<CoordinatorViewStudents/>} />
        <Route path='/coordinator_view_programs' element={<CoordinatorViewPrograms/>} />
        <Route path='/coordinator_view_enroll/:id/:a' element={<CoordinatoeViewEnrollments/>} />
        <Route path='/coordinator_viewVotes/:id' element={<CoordinatorViewVotes/>} />
        <Route path='/coordinator_view_complaints' element={<CoordinatorViewComplaint/>} />
        <Route path='/coordinator_add_blog' element={<CoordinatorAddBlog/>} />
        <Route path='/coordinator_addcomplaint_status/:id' element={<CoordAddComplaintStatus/>} />
        <Route path='/coordinator_profile' element={<CoordinatorProfile/>} />
        <Route path='/coordinator_edit_profile' element={<CoordinatorEditProfile/>} />
        <Route path='/coordinator_view_blogs' element={<CoordinatorViewBlogs url={url} />} />
        <Route path='/coordinator_blog_detail/:id' element={<CoordinatorViewSingleBlog url={url} />} />
        <Route path='/coordinator_addscore/:id/:eid/:sid' element={<CoordinatorAddScore/>} />
        <Route path='/audience_login' element={<AudienceLogin/>} />
        <Route path='/audience_signup' element={<AudienceSignin/>} />
        <Route path='/audience_home' element={<AudienceHome/>} />

        <Route path='/audience_view_program' element={<AudienceViewProgrammes/>} />
        <Route path='/audience_view_bookings' element={<AudienceViewSeatBooking/>} />
        <Route path='/audience_add_vote' element={<AudienceAddVote/>} />
        <Route path='/audience_view_winners' element={<AudienceViewWinners/>} />


        <Route path='/audience_result' element={<AudienceResults/>} />
        <Route path='/audience_profile' element={<AudienceProfile/>} />
        <Route path='/audience_edit_profile' element={<AudienceEditProfile/>} />
        <Route path='/audience_forgotpwd' element={<AudienceForgotPwd/>} />
        <Route path='/audience_program/:id' element={<AudienceSingleViewProgram/>} />
        <Route path='/volunteer_login' element={<VolunteerLogin/>} />
        <Route path='/volunteer_signup' element={<VolunteerSignin/>} />
        <Route path='/volunteer_forgotpwd' element={<VolenteerForgotPwd/>} />
        <Route path='/volunteer_home' element={<VolunteerHome/>} />
        <Route path='/volunteer_view_students' element={<VolunteerViewStudents/>} />
        <Route path='/volunteer_view_programs' element={<VolunteerViewProgram/>} />
        <Route path='/volunteer_view_enroll/:id/:a' element={<VolunteerViewEnrollments/>} />
        <Route path='/volunteer_viewVotes/:id' element={<VolunteerViewVotes/>} />
        <Route path='/volunteer_view_complaints' element={<VolunteerViewComplaints/>} />
        <Route path='/volunteer_addcomplaint_status/:id' element={<VolunteerAddComplaintStatus/>} />
        <Route path='/volunteer_profile' element={<VolunteerProfile/>} />
        <Route path='/volunteer_edit_profile' element={<VolunteerEditProf/>} />
        <Route path='/volunteer_addscore/:id/:eid/:sid' element={<VolunteerAddScore/>} />

        <Route path='/admin_home' element={<AdminHome/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin_view_program' element={<AdminViewPrgm/>} />
        <Route path='/admin_view_enroll/:id/:a' element={<AdminViewEnrollVotes/>} />
        <Route path='/admin_viewVotes/:id/:eid' element={<AdminViewVotes/>} />
        <Route path='/admin_coordinator' element={<AdminCoordinator/>} />
        <Route path='/admin_volunteers' element={<AdminVolunteers/>} />
        <Route path='/admin_volunteers_req' element={<AdminVolunteerReq/>} />
        <Route path='/admin_audience' element={<AdminAudience/>} />
        <Route path='/admin_result' element={<AdminReultView/>} />
        <Route path='/admin_addprograms' element={<AdminAddPrgm/>} />
        <Route path='/admin_editprograms/:id' element={<AdminEditPrgm/>} />
        <Route path='/admin_coordinator_req' element={<AdminAddCoordinator/>} />
        <Route path='/admin_viewStages' element={<AdminViewStages/>} />
        <Route path='/admin_viewComplaints' element={<AdminViewComplaints/>} />
        <Route path='/admin_editStages/:id' element={<AdminEditStage/>} />
        <Route path='/admin_stage_&_seat' element={<AdminStageAndSeat/>} />
        <Route path='/admin_allot_stage/:id' element={<AdminAllotStag/>} />
        <Route path='/admin_add_volunteer/:id/:date' element={<AdminAddVolunteer/>} />
        <Route path='/admin_view_winner' element={<AdminViewWinners/>} />
      </Routes>
      
    </div>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
