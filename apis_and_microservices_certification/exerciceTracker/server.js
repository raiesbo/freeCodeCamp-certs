const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require("body-parser")
require('dotenv').config();

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// CONNECTIN TO MONGOOSE
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// SCHEMA
const userSchema = new Schema({
  username: {
    type:String,
    required: true
  },
  trainings: {
    type: Array,
    default: []
  }
})

//MODEL
const User = mongoose.model("User", userSchema);

// NEW USERS //
app.use("/api/exercise/new-user", bodyParser.urlencoded({ extended: false }));

app.post("/api/exercise/new-user", (req, res) => {
  let newUser = req.body.username

  // CHECK IF ALREADY EXISTST
  User.findOne({username: newUser}, (err, data) => {
    if (err) console.log("ERROR: ", err)
    console.log("DATA: ", data)
  })
  .then(data => {
    if (data != null) {
      // IF ALREADY EXISTS
      console.log("userName repeated")
      return res.send("Username already taken");
    } else {
      // IF DOESNT EXIST
      console.log("userName not repeated")
      let userToSave = new User({
        username: newUser
      })
      // SAVING THE USER
      userToSave.save((err, data) => {
        if(err) console.log(err)
        console.log(data)
        return res.json({"username": data.username, "_id": data._id})
      })
    }
  })
})


// LIST OF USERS //
app.get("/api/exercise/users", (req, res) => {
  User.find({})
  .select({username: 1, _id: 1})
  .exec((err, data) => {
    if (err) return console.log(err)
    console.log(data)
    return res.json(data)
  })
})


// HANDLE EXERCISES //
app.use("/api/exercise/add", bodyParser.urlencoded({ extended: true }));

app.post("/api/exercise/add", (req, res) => {
  let {userId, date, duration, description } = req.body;

  // PROOF DATA
  if (userId == "") return res.send('Cast to ObjectId failed for value "" at path "_id" for model "Users"');
  if (duration == "" || description == "") return res.send(`Path ${description == "" ? "`description`" : "`duration`"} is required.`);
  if (date == "") {
    date = new Date().toDateString();
  };

  // FIND THE USER
  User.findOneAndUpdate(
    {_id: userId},
    {"$push": { trainings: {
      date: new Date(date).toDateString(),
      description,
      duration: parseInt(duration)
      }}
    },
    {"new": true},
    (err, data) => {
    if (err) return console.log(err)
    if (data == null) return 
    console.log(data)
    res.json({
      _id: userId,
      username: data.username,
      date: new Date(date).toDateString(),
      duration: parseInt(duration),
      description
    })
  })
})


// LIST USERS TRAININGS //
app.get("/api/exercise/log/:userId/:from?/:to?/:limit?", (req, res) => {
  let id = req.params.userId;
  let dateFrom = req.params.from;
  let dateTo = req.params.to;
  let limit = req.params.limit;

  console.log( id, dateFrom, dateTo, limit)

  // TEST DATA
  //if (!limit)

  User.findById(id)
    .select({ trainings: 1 })
    .limit(limit)
    .exec((err, data) => {
    if (err) return console.log(err)
    if (data == null) return res.send("_id not found.")
    console.log(data)
    res.json(data.trainings)
  })




})







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
