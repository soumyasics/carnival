const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    stageid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'stages'
    },
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'audiences'
    },
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'events'
    },
    date:Date
    
})
module.exports=new mongoose.model("seatbookings",Schema)