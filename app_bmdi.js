const express = require("express");
var app = express();
const port = 3000;
const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/bmdi-timetrack");
var nameSchema = new mongoose.Schema({
    Time: String,
	eventName: String,
    timeInterval: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/track", (req, res) => {
	var parseUrl = url.parse(req.originalUrl);
	console.log(parseUrl);
	var parsedQueries = queryString.parse(parseUrl.query);
	console.log(parsedQueries);
	//console.log(req.originalUrl);
    var myData = new User(parsedQueries);
	//console.log(myData);
    myData.save()
       .then(item => {
           res.send("Get Name saved to database");
       })
       .catch(err => {
          res.status(400).send("Unable to save to database");
        });

});


app.post("/addname", (req, res) => {
	console.log(req.body)
    var myData = new User(req.body);
	console.log(myData)
    myData.save()
        .then(item => {
            res.send("Add Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});