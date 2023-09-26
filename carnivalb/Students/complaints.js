const mongoose= require("mongoose");
const schema=mongoose.Schema({

    studid:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'studentdetails'
    },
    date:{

            type:Date,
            required:true
    },complaint:{

        type:String,
       required:true
    },
    respfrom:{
        type:String,
        // required:true
    },
    cid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coordinators'
    },
    vid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'volunteers'
    },
    response:{
        type:String,
        // required:true
    },status:{
        type:String,
        required:true
    }
 
});
    module.exports=mongoose.model('complaints',schema)