const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        required:true,
       ref:'events',
        dropDups: true
    },
   
 
    date:{
        type:Date,
        required:true
    },
    stageid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'stages'
    },
    vid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'volunteers'
    },
    coId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coordinators'
    }
})
module.exports=new mongoose.model("eventstages",Schema)