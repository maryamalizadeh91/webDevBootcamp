var express = require("express");
var app = express();

app.get("/", function(req, res) {
   res.send("Hi there!"); 
});

app.get("/bye", function(req, res) {
    res.send("Goodbye!!");
});

app.get("/dog", function(req, res) {
    console.log("someone made a request to /dog!");
    res.send("MEOW!"); 
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to " + subreddit.toUpperCase() + " subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("Welcome to comments page!");
});

app.get("*", function(req, res) {
   res.send("You are a star!!!") 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});

