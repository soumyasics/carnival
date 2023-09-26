const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    enrollid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'enrollments',
        unique: true,
        dropDups: true
    },
    votes: { type: Number },
    coScore: { type: Number },
    vScore: { type: Number },
    totalScore: { type: Number },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'events'
    },
    studId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'studentdetails'
    },
    position: {
        type: String
    }

})
module.exports = new mongoose.model("results", Schema)