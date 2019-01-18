var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Campground.create( 
//     { name: "Granite Hill", 
//       image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_340.jpg",
//       description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
//     }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground: ");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     { name: "Salmon Greek", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_340.jpg" },
//     { name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_340.jpg" },
//     { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144592f4c27ba3e9b4_340.jpg" }
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    //campgrounds.push(newCampground);
    
    Campground.create(newCampground, function(err, newlyAdded) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    

});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//Comments Routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    }) 
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            
            Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } else {
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + foundCampground._id);
               }
            });
        }
    })    
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});
