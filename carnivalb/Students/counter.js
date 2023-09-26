const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    num:{
        type:Number,
    min:100}
    
})
module.exports=mongoose.model("counters",Schema)