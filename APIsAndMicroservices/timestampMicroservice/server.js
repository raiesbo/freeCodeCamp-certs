// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//const timestamp = Date.now();

app.get("/api/timestamp/:date", (req, res) => {
  let time = req.params.date;
  let unix,utc;
  if (time.split("-").length == 3) {
    utc = new Date(time).toUTCString();
    unix = new Date(time).getTime();
  } else if (time.length >= 13) {
    unix = parseInt(time)//.getTime();
    utc = new Date(unix).toUTCString();
    console.log(utc, unix)
  }else if (time == "") {
    utc = new Date().toUTCString();
    unix = Math.floor(new Date() / 1000);
  } else {
    res.json({ error : "Invalid Date" })
  }
  res.json({unix, utc});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
