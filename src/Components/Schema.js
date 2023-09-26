import * as yup from 'yup';


const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol



export const StudentRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    section: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    password: yup.string().min(5,"1 uppercase, 1 number, 1 symbol").max(16).matches(passwordRule,"1 uppercase, 1 number, 1 symbol").required("Required"),
})

export const CoordinatorRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    contact: yup.number().min(1000000000,"Phone number must be minimum 10 digit number").max(9999999999, "Phone number must be a 10-digit number").required("Required"),
    aadhar:yup.number().min(100000000000,"Aadhaar number must be minimum 12 digit number").max(999999999999, "Aadhaar number must be a 12-digit number").required("Required"),
    password: yup.string().min(5,"1 uppercase, 1 number, 1 symbol").max(16).matches(passwordRule,"1 uppercase, 1 number, 1 symbol").required("Required"),
})

export const AddPrgmSchema  = yup.object().shape({
    eventname:yup.string().required("Required"),
    category: yup.string().required("Required"),
    duration: yup.number().required("Required"),
    eventtype: yup.string().required("Required"),
    

})

export const forgotPasswordScheme  = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(5,"1 uppercase, 1 number, 1 symbol").max(16).matches(passwordRule,"1 uppercase, 1 number, 1 symbol").required("Required"),
})

export const AudienceRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    place: yup.string().required("Required"),
    age:yup.number().min(10,"Age must be minimum 2 digit number").max(99, "Age must be a 2-digit number").required("Required"),
    password: yup.string().min(5,"1 uppercase, 1 number, 1 symbol").max(16).matches(passwordRule,"1 uppercase, 1 number, 1 symbol").required("Required"),
})

export const VolunteerRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    contact: yup.number().min(1000000000,"Phone number must be minimum 10 digit number").max(9999999999, "Phone number must be a 10-digit number").required("Required"),
    aadhar:yup.number().min(100000000000,"Aadhaar number must be minimum 12 digit number").max(999999999999, "Aadhaar number must be a 12-digit number").required("Required"),
    password: yup.string().min(5,"1 uppercase, 1 number, 1 symbol").max(16).matches(passwordRule,"1 uppercase, 1 number, 1 symbol").required("Required"),
})