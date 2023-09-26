const mongoose= require("mongoose")
const eventSchema=mongoose.Schema({
    eventname:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    category:{type:String},
    duration:{type:Number},
eventtype:String,
    
})
module.exports=new mongoose.model("events",eventSchema)