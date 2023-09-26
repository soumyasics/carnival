const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    stageNo:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    sc:{type:Number}
    
})
module.exports=new mongoose.model("stages",Schema)