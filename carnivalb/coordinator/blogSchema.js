const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    p1: {
        type: String,
        required: true
    },
    p2: {
        type: String
    },
    p3: {
        type: String
    },
    date: Date,
    title: {
        type: String,
        required: true
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'coordinators'
    }, img: {
        type: Array
    },reviews:Array

})
module.exports = new mongoose.model("blogs", Schema)