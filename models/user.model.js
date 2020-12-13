const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
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
    isAdmin : { type: Boolean, required: true, default: false},
    isInterviewer : { type: Boolean, required: true, default : false},
    tags: {
        type: [String],
        required: false,
        unique: false,
        trim: true,
        minlength: 3
    },
    date: { type: Date, required:false},
}, {timestamps : true});

const user = mongoose.model("User", userSchema);

module.exports = user;