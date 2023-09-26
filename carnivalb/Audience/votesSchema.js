const mongoose= require("mongoose")
const Schema=mongoose.Schema({
    count:{

        type:Number,
    default:0},
    aid:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'audiences'
    },
    eid:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'enrollments'
    }
    
})
module.exports=mongoose.model("votes",Schema)



