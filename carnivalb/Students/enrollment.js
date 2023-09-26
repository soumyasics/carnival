const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    stid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'studentdetails'
    },
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'events'
    },
    stageid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'stages'
    
    },
   
    chestNo:Number,
    votes:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model("enrollments",Schema)