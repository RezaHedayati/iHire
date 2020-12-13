const mongoose = require("mongoose");

const schema = mongoose.Schema;

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    role: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    date: { type: Date, required:false},
}, {timestamps : true});

const candidate = mongoose.model("Candidate", candidateSchema);

module.exports = candidate;