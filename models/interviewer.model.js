const mongoose = require("mongoose");

const schema = mongoose.Schema;

const interviewerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    tags: {
        type: [String],
        required: false,
        unique: false,
        trim: true,
        minlength: 3
    },
    date: { type: Date, required:false},
}, {timestamps : true});

const interviewer = mongoose.model("Interviewer", interviewerSchema);

module.exports = interviewer;