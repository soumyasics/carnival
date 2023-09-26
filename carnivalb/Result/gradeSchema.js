const mongoose = require("mongoose")
const Schema = mongoose.Schema({

    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'events',
        unique: true,
        dropDups: true
    },
    gradeA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentdetails'
    },
    gradeB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentdetails'
    },
    gradeC: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentdetails'
    }
    
})
module.exports = new mongoose.model("grades", Schema)