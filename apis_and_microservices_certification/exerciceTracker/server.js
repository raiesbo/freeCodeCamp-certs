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

// USER SCHEMA + MODEL
const userSchema = new Schema({
  username: {
    type:String,
    required: true,
    unique: true
  }
})

const User = mongoose.model("User", userSchema);

// WORKOUT SCHEMA + MODEL
const workoutSchema = new Schema({
  username: {
    type:String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date//,
    //default: Date.now
  }
});

const Workout = mongoose.model("Workout", workoutSchema);


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

  // HANDLE MISSING DATA
  if (userId == "") return res.send('Cast to ObjectId failed for value "" at path "_id" for model "Users"');
  if (duration == "" || description == "") return res.send(`Path ${description == "" ? "`description`" : "`duration`"} is required.`);
  date = new Date(date) != "Invalid Date" ? new Date(date) : Date.now();

  // FIND USERNAME FROM ID
  User.findById(userId, (err, user) => {
    if (err) return console.log(err)
    if (user == null) return res.send("_id not found.")
    console.log("user who workedout", user)
    // CREATE TRAINING WITH PREVIOUS USERNAME
    const training = new Workout({
      username: user.username,
      description,
      duration,
      date: date
    })

    // console.log("DATES: ", date, Date(date), new Date(date).toDateString())

    training.save((err, data) => {
      if (err) return console.log(err);
      console.log("new training", data)
      res.json({
        _id: user._id,
        username: data.username,
        date: data.date.toDateString(),
        duration: data.duration,
        description: data.description
      });
    });
  })
})


// LIST USERS TRAININGS //
app.get("/api/exercise/log?", (req, res) => {
  let _id = req.query.userId;
  let dateFrom = req.query.from;
  let dateTo = req.query.to;
  let limit = req.query.limit;

  //console.log("DATOS: ", id, dateFrom, dateTo, limit)
  //console.log( new Date(dateFrom), new Date(dateTo))

  // TEST DATA
  limit = parseInt(limit);
  dateFrom = new Date(dateFrom) != "Invalid Date" ? new Date(dateFrom) : 0;
  dateTo = new Date(dateTo) != "Invalid Date" ? new Date(dateTo) : Date.now();

  // FIND USERNAME FROM ID
  User.findById(_id, (err, data) => {
    if (err) return console.log(err)
    if (data == null) return res.send("_id not found.")

    //FIND ALL TRAININGS FROM USERNAME
    Workout.find({username: data.username, date: { $lte: dateTo, $gte: dateFrom }})
      .limit(limit)
      .select({_id: 0, __v: 0, username: 0})
      .exec((err, work) => {
      if (err) return console.log(err)
      //console.log(work)
      res.json({
        _id: data._id,
        username: data.username,
        count: work.length,
        log: work.map(e => ({
            description: e.description,
            duration: e.duration,
            date: e.date.toDateString()
        }))
      })

    })

  })
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
