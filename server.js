require('dotenv').config();

const express = require("express");
const path = require("path");
const candidates = require("./routes/candidates");
const interviewers = require("./routes/interviewers");
const users = require("./routes/users");

const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.port || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Set Static Folder
app.use(express.static(path.join(__dirname, "i-hire")));
app.use(express.json());
app.use("/api", candidates);
app.use("/api", interviewers);
app.use("/api", users);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("MongoDB database connection stablished successfully");
});

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});