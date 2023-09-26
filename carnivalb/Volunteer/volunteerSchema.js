const mongoose = require("mongoose")
const volunteerSchema = mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        unique: true,
        required: true,

        dropDups: true
    },
    contact: { type: String },
    aadhar: { type: Number },
    password: { type: String },
    isactive: {
        type: Boolean,
        default: false
    }
})
module.exports = new mongoose.model("volunteers", volunteerSchema)