require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

const urlExists = require("url-exists");

// CONNECT TO THE SERVER
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const urlSchema = new Schema({
  original_url: String,
  short_url: Number
})

let NewUrl = mongoose.model("NewUrl", urlSchema)

// CREATE ONE ENTRANCES
const createUrl = (url, shortUrl, done) => {
  let newurl = new NewUrl({
    original_url: url,
    short_url: shortUrl
  })

  newurl.save((err, data) => {
    if (err) done(err)
    done(null,data)
  })
}


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// MY WORK STARTS HERE

app.use("/api/shorturl/new", bodyParser.urlencoded({extended: false}));

app.post("/api/shorturl/new", (req, res) => {
  let { url } = req.body;
  
  // checking if it does exist
  urlExists(url, (_, exists) => {
    console.log(exists)
    exists == false && res.json({ error: 'invalid url' })
  })

  // saving in mongodb
  let shorturl = Math.floor(Math.random()*100);
  createUrl(url, shorturl, console.log);

  // outputing the obj
  let short_url = 2;
  res.json({ "original_url": url, short_url: shorturl})
})


app.get("/api/shorturl/:num", (req, res) => {
  let num = req.params.num;
  console.log("num:", num)

  // Look for  the url in mongoose
  //let info = findOneByShorturl(num, console.log)
  NewUrl.findOne({ short_url: num }, (err, data) => {
    if (err) console.log(err)
    res.redirect(data["original_url"])
  })
})

// UNTIL HERE IS MY WORK

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
