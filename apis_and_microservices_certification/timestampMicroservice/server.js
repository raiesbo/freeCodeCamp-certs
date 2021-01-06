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

app.get("/api/timestamp", (req, res) => {
  let utc = new Date().toUTCString();
  let unix = new Date().getTime();
  res.json({unix, utc})
})

app.get("/api/timestamp/:date", (req, res) => {
  let time = req.params.date;
  let unix,utc;
  if (new Date(time) != "Invalid Date") {
    utc = new Date(time).toUTCString();
    unix = new Date(time).getTime();
  } else if (new Date(parseInt(time)).toUTCString() != "Invalid Date") {
    unix = parseInt(time)//.getTime();
    utc = new Date(unix).toUTCString();
  } else {
    res.json({ error : "Invalid Date" })
  }
  res.json({unix, utc});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
