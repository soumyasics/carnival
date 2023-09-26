const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    name:{type:String},
    place:{type:String},
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    
    },
    password:{type:String},
    age:{type:Number}
})
module.exports=new mongoose.model("audiences",Schema)