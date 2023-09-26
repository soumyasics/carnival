const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    name: { type: String },
    section: { type: String },
    email: {
        type: String,
        unique: true,
        required: true,

        dropDups: true
    },
    password: { type: String },
    gender: {
        type: String,
        required: true
    },
    chestNo: String
})
module.exports = new mongoose.model("studentdetails", studentSchema)